import { trades, tradeTargets, TradeTargetInsert } from "@/db/schema/trade-log";
import GraphqlContext from "@/types/types.utils";
import { eq, and } from "drizzle-orm";
import { GraphQLError } from "graphql";

type TradeInsert = typeof trades.$inferInsert;

export interface TradeTargetInput {
  label?: string;
  executedPrice?: number;
  riskReward?: number;
  exitSize?: number;
  moveStopTo?: number | null;
}

interface LogTradeInput {
  accountId: string;
  instrument: string;
  side: string;
  plannedEntryPrice: number;
  plannedStopLoss: number;
  plannedTakeProfit: number;
  size: number;
  executionStyle: string;
}

// Minimal CreateTradeInput for createTrade mutation (not implemented)
export interface CreateTradeInput {
  accountId: string;
  symbol: string;
  side: string;
  entryPrice: number;
  entryTimestamp: string;
  size: number;
  initialStopLoss: number;
  initialRiskAmount: number;
  initialRiskPercentage: number;
  rPerPip: number;
  setupType?: string | null;
  timeframe?: string | null;
  notes?: string | null;
  tags?: string[];
  targets?: TradeTargetInput[];
}

// Utility function to deduce the actual execution style
function deduceExecutionStyle(executionStyle: string, side: string): string {
  switch (executionStyle) {
    case "MARKET":
      return "MARKET";
    case "LIMIT":
      switch (side) {
        case "buy":
          return "BUY_LIMIT";
        case "sell":
          return "SELL_LIMIT";
        default:
          throw new GraphQLError(`Invalid side: ${side}`);
      }
    default:
      throw new GraphQLError(`Invalid executionStyle: ${executionStyle}`);
  }
}

const tradeResolvers = {
  Mutation: {
    /**
     * createTrade
     * Creates a new trade entry and associated trade targets.
     * TODO: Implement full logic and validation.
     */
    async createTrade(
      _: unknown,
      { input }: { input: CreateTradeInput },
      context: GraphqlContext
    ) {
      // Implementation will go here
      throw new GraphQLError("Not implemented yet");
    },

    /**
     * Creates a new trade plan with optional targets
     *
     * @param _ - Unused parent resolver parameter
     * @param input - Trade plan input containing account details, trade parameters, and optional targets
     * @param context - GraphQL context containing database connection and session info
     *
     * @throws {GraphQLError}
     * - When user is not authenticated
     * - When required trade plan fields are missing
     * - When targets are provided but incomplete
     * - When database operations fail
     *
     * @returns Object containing the created trade and its associated targets
     */
    async logTrade(
      _: unknown,
      { input }: { input: LogTradeInput },
      context: GraphqlContext
    ) {
      console.log("🔍 [logTrade] RESOLVER CALLED", {
        input,
        context: {
          session: context.session ? {
            id: context.session.id,
            email: context.session.email
          } : null,
          hasDb: !!context.db
        }
      });
      
      try {
        // 1. Check if user is authenticated
        const { db, session } = context;
        if (!session?.id) {
          console.error("[logTrade] Authentication failed - no session ID");
          return {
            success: false,
            message: "Authentication required",
            errorCode: "AUTH_REQUIRED",
            errorDetails: "User session not found"
          };
        }

        // 2. Validate input
        if (!input.accountId || !input.instrument || !input.side || !input.plannedEntryPrice || !input.plannedStopLoss || !input.plannedTakeProfit || !input.size) {
          console.error("[logTrade] Invalid input", { input });
          return {
            success: false,
            message: "Invalid trade input",
            errorCode: "INVALID_INPUT",
            errorDetails: "Missing required trade fields"
          };
        }

        // 3. Destructure input and deduce actual trade execution style
        const {
          accountId,
          instrument,
          side,
          plannedEntryPrice,
          plannedStopLoss,
          plannedTakeProfit,
          size,
          executionStyle,
        } = input;

        console.log("[logTrade] Processing trade with execution style", { executionStyle, side });

        let actualExecutionStyle;
        try {
          actualExecutionStyle = deduceExecutionStyle(executionStyle, side);
        } catch (error) {
          console.error("[logTrade] Invalid execution style", { error, executionStyle, side });
          return {
            success: false,
            message: "Invalid execution style",
            errorCode: "INVALID_EXECUTION_STYLE",
            errorDetails: error instanceof Error ? error.message : "Unknown error"
          };
        }

        // 4. Insert the new trade into the database
        const tradeInsert: TradeInsert = {
          userId: session.id,
          accountId,
          instrument,
          side,
          plannedEntryPrice: String(plannedEntryPrice),
          plannedStopLoss: String(plannedStopLoss),
          plannedTakeProfit: String(plannedTakeProfit),
          size: String(size),
          executionStyle: actualExecutionStyle as TradeInsert["executionStyle"],
          // If execution style is MARKET, set status to OPEN, else let DB default to PENDING
          ...(actualExecutionStyle === "MARKET" ? { status: "OPEN" } : {}),
        };

        console.log("[logTrade] Attempting to insert trade", { tradeInsert });

        try {
          console.log("[logTrade] Database operation starting", { 
            userId: session.id,
            accountId,
            instrument,
            side,
            executionStyle: actualExecutionStyle
          });

          const [createdTrade] = await db
            .insert(trades)
            .values(tradeInsert)
            .returning({ id: trades.id });

          console.log("[logTrade] Database operation completed", { 
            createdTrade,
            success: !!createdTrade
          });

          if (!createdTrade) {
            console.error("[logTrade] Trade creation failed - no trade returned");
            return {
              success: false,
              message: "Failed to create trade",
              errorCode: "DB_INSERT_FAILED",
              errorDetails: "Database returned no trade ID"
            };
          }

          console.log("[logTrade] Trade created successfully", { tradeId: createdTrade.id });
          return {
            success: true,
            message: "Trade logged successfully",
            tradeId: createdTrade.id
          };
        } catch (dbError) {
          console.error("[logTrade] Database error", { 
            error: dbError,
            errorMessage: dbError instanceof Error ? dbError.message : "Unknown error",
            errorStack: dbError instanceof Error ? dbError.stack : undefined,
            tradeInsert 
          });
          return {
            success: false,
            message: "Failed to create trade in database",
            errorCode: "DB_ERROR",
            errorDetails: dbError instanceof Error ? dbError.message : "Unknown database error"
          };
        }
      } catch (error) {
        // Log the error for debugging
        console.error("[logTrade] Unexpected error", { error });
        return {
          success: false,
          message: "Failed to log trade",
          errorCode: "UNEXPECTED_ERROR",
          errorDetails: error instanceof Error ? error.message : "Unknown error"
        };
      }
    },

    async executeTrade(
      _: unknown,
      {
        input,
      }: {
        input: {
          id: string;
          executedEntryPrice: number;
          executedStopLoss: number;
          executionNotes?: string;
        };
      },
      context: GraphqlContext
    ) {
      try {
        const { db, session } = context;
        if (!session?.id) throw new GraphQLError("Not authenticated");

        // Find the trade and ensure it belongs to the user
        const [trade] = await db
          .select()
          .from(trades)
          .where(and(eq(trades.id, input.id), eq(trades.userId, session.id)));

        if (!trade) throw new GraphQLError("Trade not found");

        // Update the trade with execution details and set status to OPEN
        const [updatedTrade] = await db
          .update(trades)
          .set({
            executedEntryPrice: String(input.executedEntryPrice),
            executedStopLoss: String(input.executedStopLoss),
            executionNotes: input.executionNotes,
            status: "OPEN",
            updatedAt: new Date(),
          })
          .where(eq(trades.id, input.id))
          .returning();

        return {
          success: true,
          message: "Trade executed and updated successfully",
          trade: updatedTrade,
        };
      } catch (error) {
        console.error("Error executing trade:", error);
        throw new GraphQLError(
          "Failed to execute trade. Please try again later."
        );
      }
    },

    async closeTrade(
      _: unknown,
      { input }: { input: { tradeId: string; exitPrice: number } },
      context: GraphqlContext
    ) {
      try {
        const { db, session } = context;
        if (!session?.id) {
          throw new GraphQLError("Not authenticated");
        }

        // Find the trade and ensure it belongs to the user
        const [trade] = await db
          .select()
          .from(trades)
          .where(and(eq(trades.id, input.tradeId), eq(trades.userId, session.id)));

        if (!trade) {
          throw new GraphQLError("Trade not found");
        }

        // Update the trade with closed status and exit price
        const [updatedTrade] = await db
          .update(trades)
          .set({
            closed: true,
            status: "CLOSED",
            exitPrice: String(input.exitPrice),
            updatedAt: new Date(),
          })
          .where(eq(trades.id, input.tradeId))
          .returning();

        return {
          success: true,
          message: "Trade closed successfully",
          trade: updatedTrade,
        };
      } catch (error) {
        console.error("Error closing trade:", error);
        throw new GraphQLError(
          "Failed to close trade. Please try again later."
        );
      }
    },
  },

  Query: {
    loggedTrades: async (
      _: unknown,
      { accountId }: { accountId: string },
      context: GraphqlContext
    ) => {
      const { db, session } = context;
      if (!session?.id) throw new GraphQLError("Not authenticated");

      // Get all trades for this account and user
      const tradesList = await db.query.trades.findMany({
        where: (trades, { eq, and }) =>
          and(eq(trades.accountId, accountId), eq(trades.userId, session.id)),
      });
      return tradesList;
    },
  },
};

export default tradeResolvers;
