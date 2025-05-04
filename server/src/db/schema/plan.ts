import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

export const tradingPlans = pgTable(
  "trading_plans",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),

    instruments: text("instruments").notNull(),
    note: text("note"),
    session: varchar("session", { length: 50 }),
    isDefault: boolean("is_default").default(false),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdUnique: uniqueIndex("trading_plans_user_id_unique").on(table.userId),
  })
);
