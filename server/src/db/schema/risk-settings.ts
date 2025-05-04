// drizzle/schema/riskSettings.ts
import {
  pgTable,
  uuid,
  numeric,
  integer,
  timestamp,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const riskSettings = pgTable("risk_settings", {
  userId: text("user_id")
    .references(() => users.id)
    .notNull()
    .primaryKey(),

  accountBalance: numeric("account_balance", {
    precision: 12,
    scale: 2,
  }).notNull(), // e.g. 10000.00
  riskPerTrade: numeric("risk_per_trade", { precision: 5, scale: 2 }).notNull(), // e.g. 1.00 (%)
  maxDailyRisk: numeric("max_daily_risk", { precision: 5, scale: 2 }).notNull(), // e.g. 3.00 (%)
  maxOpenTrades: integer("max_open_trades").notNull(), // e.g. 3
  riskRewardRatio: numeric("risk_reward_ratio", {
    precision: 5,
    scale: 2,
  }).notNull(), // e.g. 2.00

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
