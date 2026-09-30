import { and, desc, eq, isNotNull, count } from "drizzle-orm";
import * as schema from "@db/schema";
import { getDb } from "./connection";

const FOUNDING_LIMIT = 1000;

function genReferralCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `RFT-${s}`;
}

/** Get or create the user's wallet. First 1,000 wallets get a founding number. */
export async function ensureWallet(userId: number) {
  const existing = await getDb()
    .select()
    .from(schema.wallets)
    .where(eq(schema.wallets.userId, userId))
    .limit(1);
  if (existing.length > 0) return existing[0];

  const [{ value: foundingCount }] = await getDb()
    .select({ value: count() })
    .from(schema.wallets)
    .where(isNotNull(schema.wallets.foundingNumber));

  const foundingNumber =
    foundingCount < FOUNDING_LIMIT ? foundingCount + 1 : null;

  await getDb()
    .insert(schema.wallets)
    .values({ userId, referralCode: genReferralCode(), foundingNumber });

  const rows = await getDb()
    .select()
    .from(schema.wallets)
    .where(eq(schema.wallets.userId, userId))
    .limit(1);
  return rows[0];
}

export async function getWallet(userId: number) {
  const rows = await getDb()
    .select()
    .from(schema.wallets)
    .where(eq(schema.wallets.userId, userId))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function getUserListings(userId: number) {
  return getDb()
    .select()
    .from(schema.listings)
    .where(eq(schema.listings.userId, userId))
    .orderBy(desc(schema.listings.createdAt));
}

export async function createListing(
  userId: number,
  data: {
    title: string;
    make: string;
    model: string;
    year: number;
    priceAed: number;
    city?: string;
  },
) {
  const wallet = await ensureWallet(userId);
  if (!wallet) throw new Error("Wallet unavailable");

  let creditType: "free" | "paid";
  if (wallet.freeCredits > 0) {
    creditType = "free";
    await getDb()
      .update(schema.wallets)
      .set({ freeCredits: wallet.freeCredits - 1 })
      .where(eq(schema.wallets.id, wallet.id));
  } else if (wallet.paidCredits > 0) {
    creditType = "paid";
    await getDb()
      .update(schema.wallets)
      .set({ paidCredits: wallet.paidCredits - 1 })
      .where(eq(schema.wallets.id, wallet.id));
  } else {
    return { paymentRequired: true as const, listing: null };
  }

  await getDb().insert(schema.listings).values({ userId, ...data, creditType });
  const created = await getDb()
    .select()
    .from(schema.listings)
    .where(eq(schema.listings.userId, userId))
    .orderBy(desc(schema.listings.id))
    .limit(1);
  return { paymentRequired: false as const, listing: created[0] };
}

export async function setListingStatus(
  userId: number,
  listingId: number,
  status: "active" | "paused" | "deleted",
) {
  await getDb()
    .update(schema.listings)
    .set({ status })
    .where(
      and(eq(schema.listings.id, listingId), eq(schema.listings.userId, userId)),
    );
}

export async function createOrder(
  userId: number,
  product: string,
  amountAed: number,
) {
  await getDb().insert(schema.orders).values({ userId, product, amountAed });
  const rows = await getDb()
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.userId, userId))
    .orderBy(desc(schema.orders.id))
    .limit(1);
  return rows[0];
}

export async function attachStripeSession(orderId: number, sessionId: string) {
  await getDb()
    .update(schema.orders)
    .set({ stripeSessionId: sessionId })
    .where(eq(schema.orders.id, orderId));
}

export async function findOrderBySession(sessionId: string) {
  const rows = await getDb()
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.stripeSessionId, sessionId))
    .limit(1);
  return rows.at(0) ?? null;
}

export async function markOrderPaid(orderId: number) {
  await getDb()
    .update(schema.orders)
    .set({ status: "paid", paidAt: new Date() })
    .where(eq(schema.orders.id, orderId));
}

export async function addPaidCredits(userId: number, amount: number) {
  const wallet = await ensureWallet(userId);
  if (!wallet) return;
  await getDb()
    .update(schema.wallets)
    .set({ paidCredits: wallet.paidCredits + amount })
    .where(eq(schema.wallets.id, wallet.id));
}

export async function getUserOrders(userId: number) {
  return getDb()
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.userId, userId))
    .orderBy(desc(schema.orders.createdAt));
}
