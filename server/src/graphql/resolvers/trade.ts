import { trades, tradeTargets, TradeTargetInsert } from "@/db/schema/trade-log";
import GraphqlContext from "@/types/types.utils";
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
      const { db, session } = context;
      if (!session?.id) throw new GraphQLError("Not authenticated");

      try {
        // Validate core trade plan fields that are required for any trade
        if (
          !input.symbol ||
          !input.side ||
          !input.plannedEntryPrice ||
          !input.initialStopLoss ||
          !input.initialTakeProfit ||
          !input.size
        ) {
          throw new GraphQLError("Missing required trade plan fields");
        }

        // Determine execution style, defaulting to 'market' if not provided or invalid
        const allowedExecutionStyles = [
          "market",
          "buy_limit",
          "sell_limit",
          "buy_stop",
          "sell_stop",
        ];
        let executionStyle = (input.executionStyle || "market").toLowerCase();
        if (!allowedExecutionStyles.includes(executionStyle)) {
          executionStyle = "market";
        }

        // Create the base trade plan record
        // This establishes the foundation for any targets that may be added
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
            executionStyle: executionStyle as
              | "market"
              | "buy_limit"
              | "sell_limit"
              | "buy_stop"
              | "sell_stop", // Validated enum value
            remainingSize: String(input.size), // Initially, remaining size equals total size
            currentStopLoss: String(input.initialStopLoss), // Initial stop loss becomes current
          })
          .returning();

        // Handle optional trade targets
        // If targets are provided, each must be complete with all required fields
        const targets: (typeof tradeTargets.$inferSelect)[] = [];
        if (input.targets?.length) {
          const createdTargets = await Promise.all(
            input.targets.map(async (target) => {
              // Ensure all required target fields are provided
              if (
                !target.label ||
                target.executedPrice === undefined ||
                target.riskReward === undefined ||
                target.exitSize === undefined
              ) {
                throw new GraphQLError("Incomplete target fields provided");
              }

              // Create the target record with proper type casting for numeric values
              const [createdTarget] = await db
                .insert(tradeTargets)
                .values({
                  tradeId: trade.id,
                  label: target.label,
                  executedPrice: String(target.executedPrice),
                  riskReward: String(target.riskReward),
                  exitSize: String(target.exitSize),
                  moveStopTo:
                    target.moveStopTo !== undefined &&
                    target.moveStopTo !== null
                      ? String(target.moveStopTo)
                      : undefined,
                } as TradeTargetInsert)
                .returning();

              return createdTarget;
            })
          );
          targets.push(...createdTargets);
        }

        // Return the complete trade plan with any associated targets
        return {
          ...trade,
          targets,
        };
      } catch (error) {
        // Preserve custom GraphQL errors for validation failures
        if (error instanceof GraphQLError) {
          throw error;
        }

        // Log unexpected errors for debugging while keeping user message generic
        console.error("Trade plan creation failed:", error);

        throw new GraphQLError(
          "Failed to create trade plan. Please try again later."
        );
      }
    },
  },
};

export default tradeResolvers;
