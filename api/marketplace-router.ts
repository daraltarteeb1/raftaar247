import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, authedQuery } from "./middleware";
import {
  ensureWallet,
  getUserListings,
  createListing,
  setListingStatus,
  createOrder,
  attachStripeSession,
  findOrderBySession,
  markOrderPaid,
  addPaidCredits,
  getUserOrders,
} from "./queries/marketplace";
import {
  stripeConfigured,
  createCheckoutSession,
  retrieveCheckoutSession,
} from "./stripe";

const LISTING_PRICE_AED = 100;

export const marketplaceRouter = createRouter({
  /** Dashboard snapshot: wallet, listings, orders */
  dashboard: authedQuery.query(async ({ ctx }) => {
    const wallet = await ensureWallet(ctx.user.id);
    const [userListings, userOrders] = await Promise.all([
      getUserListings(ctx.user.id),
      getUserOrders(ctx.user.id),
    ]);
    return {
      wallet,
      listings: userListings,
      orders: userOrders,
      listingPriceAed: LISTING_PRICE_AED,
      stripeReady: stripeConfigured(),
    };
  }),

  /** Create a listing — consumes a free credit first, then paid credits */
  createListing: authedQuery
    .input(
      z.object({
        title: z.string().min(3).max(255),
        make: z.string().min(1).max(100),
        model: z.string().min(1).max(100),
        year: z.number().int().min(1950).max(new Date().getFullYear() + 1),
        priceAed: z.number().int().min(0).max(100_000_000),
        city: z.string().max(100).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await createListing(ctx.user.id, input);
      if (result.paymentRequired) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "NO_CREDITS",
        });
      }
      return result.listing;
    }),

  setListingStatus: authedQuery
    .input(
      z.object({
        listingId: z.number().int().positive(),
        status: z.enum(["active", "paused", "deleted"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await setListingStatus(ctx.user.id, input.listingId, input.status);
      return { ok: true };
    }),

  /** Start Stripe Checkout for one paid listing credit (AED 100) */
  buyListingCredit: authedQuery.mutation(async ({ ctx }) => {
    if (!stripeConfigured()) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "STRIPE_NOT_CONFIGURED",
      });
    }
    const order = await createOrder(
      ctx.user.id,
      "listing-credit",
      LISTING_PRICE_AED,
    );
    const origin = new URL(ctx.req.url).origin;
    const session = await createCheckoutSession({
      amountAed: LISTING_PRICE_AED,
      productName: "Raftaar247 — Listing Credit (15 days)",
      orderId: order.id,
      successUrl: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/dashboard?canceled=1`,
      customerEmail: ctx.user.email,
    });
    await attachStripeSession(order.id, session.id);
    return { checkoutUrl: session.url };
  }),

  /** Called after Stripe redirects back — verifies and grants the credit */
  confirmPayment: authedQuery
    .input(z.object({ sessionId: z.string().min(8).max(255) }))
    .mutation(async ({ ctx, input }) => {
      if (!stripeConfigured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "STRIPE_NOT_CONFIGURED",
        });
      }
      const order = await findOrderBySession(input.sessionId);
      if (!order || order.userId !== ctx.user.id) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }
      if (order.status === "paid") return { ok: true, already: true };

      const session = await retrieveCheckoutSession(input.sessionId);
      if (session.payment_status === "paid") {
        await markOrderPaid(order.id);
        await addPaidCredits(ctx.user.id, 1);
        return { ok: true, already: false };
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Payment not completed",
      });
    }),
});
