import { trades, tradeTargets, TradeTargetInsert } from "@/db/schema/trade-log";
import GraphqlContext from "@/types/types.utils";
import { eq } from "drizzle-orm";
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
      try {
        // 1. Check if user is authenticated
        const { db, session } = context;
        if (!session?.id) throw new GraphQLError("Not authenticated");

        // 2. Destructure input and deduce actual trade execution style
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

        const actualExecutionStyle = deduceExecutionStyle(executionStyle, side);

        // 3. Insert the new trade into the database
        // Only required fields are included; add more if needed
        // Use the correct type for the insert object to avoid linter errors
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
        const [createdTrade] = await db
          .insert(trades)
          .values(tradeInsert)
          .returning({ id: trades.id });

        // 4. Return a success message and the created trade's id
        return {
          success: true,
          message: "Trade logged successfully",
          tradeId: createdTrade.id,
        };
      } catch (error) {
        // Log the error for debugging
        console.error("Error logging trade:", error);
        throw new GraphQLError("Failed to log trade. Please try again later.");
      }
    },
  },

  Query: {
    userTrades: async (
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
