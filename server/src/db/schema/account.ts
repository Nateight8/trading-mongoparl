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

export const tradingAccounts = pgTable(
  "trading_accounts",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id), // Foreign key to users table

    accountName: varchar("account_name", { length: 100 }).notNull(),
    broker: varchar("broker", { length: 100 }).notNull(),
    accountCurrency: varchar("account_currency", { length: 10 }).notNull(),
    maxDailyDrawdown: real("max_daily_drawdown").notNull(),
    maxTotalDrawdown: real("max_total_drawdown").notNull(),
    accountSize: varchar("account_size", { length: 50 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdUnique: uniqueIndex("trading_accounts_user_id_unique").on(
      table.userId
    ),
  })
);
