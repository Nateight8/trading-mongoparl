import { trades, tradeTargets, TradeTargetInsert } from "@/db/schema/trade-log";
import GraphqlContext from "@/types/types.utils";
import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";

export interface TradeTargetInput {
  label?: string;
  executedPrice?: number;
  riskReward?: number;
  exitSize?: number;
  moveStopTo?: number | null;
}

export interface TradePlanInput {
  accountId: string;
  symbol: string;
  side: string;
  plannedEntryPrice: number;
  initialStopLoss: number;
  initialTakeProfit: number;
  size: number;
  setupType?: string | null;
  timeframe?: string | null;
  notes?: string | null;
  tags?: string[];
  targets?: TradeTargetInput[];
  executionStyle?: string;
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
    async createTradePlan(
      _: unknown,
      { input }: { input: TradePlanInput },
      context: GraphqlContext
    ) {
      console.log("createTradePlan called with input:", input);
      const { db, session } = context;
      if (!session?.id) throw new GraphQLError("Not authenticated");

      try {
        const [trade] = await db
          .insert(trades)
          .values({
            userId: session.id,
            accountId: input.accountId,
            symbol: input.symbol,
            side: input.side,
            plannedEntryPrice: String(input.plannedEntryPrice),
            initialStopLoss: String(input.initialStopLoss),
            initialTakeProfit: String(input.initialTakeProfit),
            size: String(input.size),
            setupType: input.setupType,
            timeframe: input.timeframe,
            notes: input.notes,
            tags: input.tags,
            status: "planned", // Initial status for all trade plans
            executionStyle: "market", // Validated enum value
            remainingSize: String(input.size), // Initially, remaining size equals total size
            currentStopLoss: String(input.initialStopLoss), // Initial stop loss becomes current
          })
          .returning();
      } catch (error) {
        console.error("Error inserting trade plan:", error);
        // Preserve custom GraphQL errors for validation failures
        if (error instanceof GraphQLError) {
          throw error;
        }
        // Log unexpected errors for debugging while keeping user message generic
        throw new GraphQLError(
          "Failed to create trade plan. Please try again later."
        );
      }
      // Validate core trade plan fields that are required for any trade

      return {
        success: true,
        message: "Trade plan created successfully!",
      };
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
