/**
 * Minimal Stripe Checkout client (server-side only).
 * The secret key comes from the STRIPE_SECRET_KEY environment variable —
 * it is never exposed to the browser.
 */

const STRIPE_API = "https://api.stripe.com/v1";

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

async function stripeFetch(path: string, init?: RequestInit) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_NOT_CONFIGURED");
  const res = await fetch(`${STRIPE_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...(init?.headers ?? {}),
    },
  });
  const body = (await res.json()) as Record<string, unknown> & {
    error?: { message?: string };
  };
  if (!res.ok) {
    throw new Error(body.error?.message ?? `Stripe error ${res.status}`);
  }
  return body;
}

/** Create a Checkout Session for a fixed AED amount. Returns the hosted URL. */
export async function createCheckoutSession(params: {
  amountAed: number;
  productName: string;
  orderId: number;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string | null;
}) {
  const body = new URLSearchParams({
    mode: "payment",
    "payment_method_types[0]": "card",
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "aed",
    "line_items[0][price_data][unit_amount]": String(
      Math.round(params.amountAed * 100),
    ),
    "line_items[0][price_data][product_data][name]": params.productName,
    "metadata[orderId]": String(params.orderId),
  });
  if (params.customerEmail) body.set("customer_email", params.customerEmail);

  const session = await stripeFetch("/checkout/sessions", {
    method: "POST",
    body: body.toString(),
  });
  return session as unknown as { id: string; url: string };
}

/** Retrieve a Checkout Session to verify payment status. */
export async function retrieveCheckoutSession(sessionId: string) {
  const session = await stripeFetch(
    `/checkout/sessions/${encodeURIComponent(sessionId)}`,
  );
  return session as unknown as {
    id: string;
    payment_status: string;
    status: string;
    metadata?: { orderId?: string };
  };
}
