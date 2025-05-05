import {
  pgTable,
  serial,
  varchar,
  real,
  integer,
  timestamp,
  text,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const tradingAccounts = pgTable("trading_accounts", {
  id: varchar("id", { length: 32 }).primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id), // Foreign key to users table

  accountName: varchar("account_name", { length: 100 }).notNull(),
  broker: varchar("broker", { length: 100 }).notNull(),
  accountCurrency: varchar("account_currency", { length: 10 }).notNull(),
  maxDailyDrawdown: real("max_daily_drawdown").notNull(),
  maxTotalDrawdown: real("max_total_drawdown").notNull(),
  accountSize: varchar("account_size", { length: 50 }).notNull(),

  currentBalance: real("current_balance").notNull().default(0),
  pnl: real("pnl").notNull().default(0),
  roi: real("roi").notNull().default(0),
  winrate: real("winrate").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
