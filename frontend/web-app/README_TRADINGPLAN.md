# 🧭 Trading Plan (MVP)

The trading plan helps users outline the core strategy and context for their trades. In the MVP, we keep it minimal and focused.

---

## 🗂️ Fields

| Field       | Type      | Description                                                          |
| ----------- | --------- | -------------------------------------------------------------------- |
| `userId`    | UUID      | Links the trading plan to a specific user                            |
| `note`      | Text      | Freeform text for strategy, entry/exit criteria, mindset notes, etc. |
| `session`   | Enum      | Trading session preference (e.g., London, New York, Asian)           |
| `isDefault` | Boolean   | Indicates if this is the default plan for journaling/trade tracking  |
| `createdAt` | Timestamp | Auto-generated when the plan is created                              |
| `updatedAt` | Timestamp | Auto-updated whenever the plan is modified                           |

---

## 🔧 Sample Schema (Drizzle)

```ts
import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const tradingPlans = pgTable("trading_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  note: text("note"),
  session: varchar("session", { length: 50 }),
  isDefault: boolean("is_default").default(false),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
```

<!-- {
  "accountId": "abc123",
  "plannedEntryPrice": 1.2345,
  "plannedStopLoss": 1.2000,
  "plannedTakeProfit": 1.3000,
  "size": 1000,
  "setupType": "Breakout",
  "timeframe": "H1",
  "notes": "My plan for this trade",
  "tags": ["trend", "breakout"],
  "targets": [
    {
      "label": "TP1",
      "executedPrice": 1.2500,
      "riskReward": 2,
      "exitSize": 500,
      "moveStopTo": 1.2200
    }
  ],
  "executionStyle": "BUY_LIMIT"
} -->
