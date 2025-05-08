import {
  pgTable,
  uuid,
  text,
  varchar,
  decimal,
  timestamp,
  jsonb,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { tradingAccounts } from "./account";

/**
 * Trade Entry Table
 *
 * Represents the main trade entry record that captures all essential information
 * about a trade from planning stage through execution and management.
 *
 * The trade lifecycle flows from: planned -> entered -> partial_exit -> closed
 * Trades can also be canceled before entry or stopped out completely.
 *
 * Status values:
 * - planned: Trade is planned but not yet executed
 * - entered: Trade is active with full position
 * - partial_exit: Trade is active with partial position closed
 * - closed: Trade is completely closed
 * - canceled: Trade was planned but never executed
 * - stopped: Trade was stopped out at stop loss
 */

// Define enum for execution style
export const executionStyleEnum = pgEnum("execution_style", [
  "MARKET",
  "LIMIT",
  "BUY_LIMIT",
  "SELL_LIMIT",
  "BUY_STOP",
  "SELL_STOP",
]);

export const tradeStatusEnum = pgEnum("trade_status", [
  "PENDING",
  "OPEN",
  "CLOSED",
  "CANCELLED",
]);

export const trades = pgTable("trades", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id),

  accountId: text("account_id")
    .notNull()
    .references(() => tradingAccounts.id),

  plannedEntryPrice: decimal("planned_entry_price", {
    precision: 20,
    scale: 8,
  }).notNull(),

  plannedStopLoss: decimal("planned_stop_loss", {
    precision: 20,
    scale: 8,
  }).notNull(),

  plannedTakeProfit: decimal("planned_take_profit", {
    precision: 20,
    scale: 8,
  }).notNull(),

  // --- Execution fields ---
  executedEntryPrice: decimal("executed_entry_price", {
    precision: 20,
    scale: 8,
  }),

  executedStopLoss: decimal("executed_stop_loss", { precision: 20, scale: 8 }),

  executionNotes: text("execution_notes"),

  size: decimal("size", { precision: 20, scale: 8 }).notNull(),
  setupType: varchar("setup_type", { length: 50 }),
  timeframe: varchar("timeframe", { length: 10 }),
  notes: text("notes"),
  tags: jsonb("tags"),
  executionStyle: executionStyleEnum("execution_style").notNull(),
  status: tradeStatusEnum("status").notNull().default("PENDING"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  instrument: varchar("instrument", { length: 20 }).notNull(),
  side: varchar("side", { length: 10 }).notNull(),
});

/**
 * Trade Targets Table
 *
 * Stores planned take-profit targets for trades. Each trade can have multiple targets
 * for scaling out of positions. Targets include price levels, position sizes to exit,
 * and optional stop loss adjustments after target is hit.
 */
export const tradeTargets = pgTable("trade_targets", {
  id: uuid("id").primaryKey().defaultRandom(),
  tradeId: uuid("trade_id")
    .notNull()
    .references(() => trades.id),
  label: varchar("label", { length: 50 }).notNull(),
  executedPrice: decimal("executed_price", {
    precision: 20,
    scale: 8,
  }).notNull(),
  riskReward: decimal("risk_reward", { precision: 10, scale: 4 }).notNull(),
  exitSize: decimal("exit_size", { precision: 20, scale: 8 }).notNull(),
  moveStopTo: decimal("move_stop_to", { precision: 20, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Trade Outcomes Table
 *
 * Records actual trade exits, whether partial or full. Each row represents
 * a single exit event with its price, size, and performance metrics.
 * Multiple outcomes can exist for a single trade when scaling out.
 */
export const tradeOutcomes = pgTable("trade_outcomes", {
  id: uuid("id").primaryKey().defaultRandom(),
  tradeId: uuid("trade_id")
    .notNull()
    .references(() => trades.id),
  outcomeType: varchar("outcome_type", { length: 20 }).notNull(),
  exitPrice: decimal("exit_price", { precision: 20, scale: 8 }).notNull(),
  exitSize: decimal("exit_size", { precision: 20, scale: 8 }).notNull(),
  exitTimestamp: timestamp("exit_timestamp").notNull(),
  pnl: decimal("pnl", { precision: 20, scale: 8 }).notNull(),
  riskReward: decimal("risk_reward", { precision: 10, scale: 4 }).notNull(),
  targetId: uuid("target_id").references(() => tradeTargets.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Trade Scenarios Table
 *
 * Allows modeling of potential trade outcomes before execution.
 * Each scenario represents a possible sequence of exits with projected results.
 * Helps in pre-trade analysis and risk/reward assessment.
 *
 * Note: The probability field is currently commented out and may be repurposed
 * in future versions as a setup-rating field to rate the quality of trade setups.
 */
export const tradeScenarios = pgTable("trade_scenarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  tradeId: uuid("trade_id")
    .notNull()
    .references(() => trades.id),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  //   probability: decimal("probability", { precision: 5, scale: 2 }),
  exitSequence: jsonb("exit_sequence").notNull(),
  finalPnl: decimal("final_pnl", { precision: 20, scale: 8 }).notNull(),
  finalRiskReward: decimal("final_risk_reward", {
    precision: 10,
    scale: 4,
  }).notNull(),
  finalAccountBalance: decimal("final_account_balance", {
    precision: 20,
    scale: 8,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TradeTargetInsert = typeof tradeTargets.$inferInsert;
