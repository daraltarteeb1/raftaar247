import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  bigint,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Per-user marketplace wallet: listing credits, referral code, founding status */
export const wallets = mysqlTable("wallets", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .unique(),
  freeCredits: int("freeCredits").notNull().default(5),
  paidCredits: int("paidCredits").notNull().default(0),
  referralCode: varchar("referralCode", { length: 32 }).notNull().unique(),
  foundingNumber: int("foundingNumber"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Wallet = typeof wallets.$inferSelect;

/** Vehicle listings created by users */
export const listings = mysqlTable("listings", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: int("year").notNull(),
  priceAed: int("priceAed").notNull(),
  city: varchar("city", { length: 100 }),
  status: mysqlEnum("status", ["active", "paused", "deleted"])
    .default("active")
    .notNull(),
  creditType: mysqlEnum("creditType", ["free", "paid"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Listing = typeof listings.$inferSelect;

/** Payment orders (Stripe Checkout) */
export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  product: varchar("product", { length: 100 }).notNull(),
  amountAed: int("amountAed").notNull(),
  currency: varchar("currency", { length: 8 }).notNull().default("AED"),
  status: mysqlEnum("status", ["pending", "paid", "failed"])
    .default("pending")
    .notNull(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  paidAt: timestamp("paidAt"),
});

export type Order = typeof orders.$inferSelect;

// TODO: Add your tables here. See docs/Database.md for schema examples and patterns.
//
// Example:
// export const posts = mysqlTable("posts", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   content: text("content"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });
//
// Note: FK columns referencing a serial() PK must use:
//   bigint("columnName", { mode: "number", unsigned: true }).notNull()
