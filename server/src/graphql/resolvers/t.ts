import { eq } from "drizzle-orm";
import { tradingAccounts, trades as tradesTable } from "@/db/schema";

import GraphqlContext from "@/types/types.utils";
import { GraphQLError } from "graphql";
import {
  generateChartData,
  generateCumulativeChartData,
} from "@/utils/enhaced-utiils";

type Account = typeof tradingAccounts.$inferSelect;
type Trade = typeof tradesTable.$inferSelect;

/**
 * Helper function to normalize trade data from DB and calculate projectedOutcome
 * This ensures all numeric fields are proper numbers and optional fields are handled correctly
 */
function normalizeTrade(t: Trade) {
  // Convert string values to numbers
  const plannedEntryPrice = Number(t.plannedEntryPrice);
  const plannedStopLoss = Number(t.plannedStopLoss);
  const plannedTakeProfit = Number(t.plannedTakeProfit);
  const executedEntryPrice = t.executedEntryPrice
    ? Number(t.executedEntryPrice)
    : undefined;
  const exitPrice = t.exitPrice ? Number(t.exitPrice) : undefined;

  // Calculate projectedOutcome for closed trades if not already set
  let projectedOutcome = undefined;

  // Only calculate for closed trades with exit price
  if (
    t.closed === "true" &&
    exitPrice !== undefined &&
    executedEntryPrice !== undefined
  ) {
    // For a BUY trade:
    // - If exit price is closer to take profit than stop loss, consider it a TP
    // - Otherwise, consider it a SL
    // For a SELL trade, the logic is reversed
    if (t.side.toLowerCase() === "buy") {
      // Calculate distances to TP and SL as percentages of the range
      const totalRange = Math.abs(plannedTakeProfit - plannedStopLoss);
      const distanceToTP = Math.abs(exitPrice - plannedTakeProfit);
      const distanceToSL = Math.abs(exitPrice - plannedStopLoss);

      // If closer to TP than SL, mark as TP
      projectedOutcome = distanceToTP < distanceToSL ? "TP" : "SL";
    } else {
      // For SELL trades, reverse the logic
      const totalRange = Math.abs(plannedTakeProfit - plannedStopLoss);
      const distanceToTP = Math.abs(exitPrice - plannedTakeProfit);
      const distanceToSL = Math.abs(exitPrice - plannedStopLoss);

      // If closer to TP than SL, mark as TP
      projectedOutcome = distanceToTP < distanceToSL ? "TP" : "SL";
    }
  }

  return {
    ...t,
    plannedEntryPrice,
    plannedStopLoss,
    plannedTakeProfit,
    executedEntryPrice,
    executedStopLoss: t.executedStopLoss
      ? Number(t.executedStopLoss)
      : undefined,
    exitPrice,
    size: Number(t.size),
    executionNotes: t.executionNotes ?? undefined,
    setupType: t.setupType ?? undefined,
    timeframe: t.timeframe ?? undefined,
    notes: t.notes ?? undefined,
    tags: Array.isArray(t.tags) ? t.tags : undefined,
    projectedOutcome, // Use our calculated value
    closed: t.closed ?? undefined,
    x: t.createdAt instanceof Date ? t.createdAt.toISOString() : t.createdAt,
    updatedAt:
      t.updatedAt instanceof Date ? t.updatedAt.toISOString() : t.updatedAt,
  };
}

const tradeDataResolvers = {
  Query: {
    /**
     * userTradeData
     * Fetches the portfolio overview and all trading accounts for the logged-in user.
     * - Aggregates stats for the overview (currentBalance, roi, pnl, winrate)
     * - Returns all trading accounts for the user
     * - Includes chart data aggregation
     */
    async userTradeData(_: unknown, _args: unknown, context: GraphqlContext) {
      const { db, session } = context;
      // Ensure the user is authenticated to protect user data and prevent unauthorized access
      if (!session?.id) throw new GraphQLError("Not authenticated");

      // Fetch all trading accounts for the user
      const accounts: Account[] = await db.query.tradingAccounts.findMany({
        where: eq(tradingAccounts.userId, session.id),
      });

      // Fetch all trades for the user
      const trades: Trade[] = await db.query.trades.findMany({
        where: eq(tradesTable.userId, session.id),
      });

      // Normalize trade data for calculations
      const normalizedTrades = trades.map(normalizeTrade);

      // Generate chart data points
      const chartDataPoints = generateChartData(normalizedTrades);

      // Generate cumulative chart data for the portfolio overview
      const cumulativeChartData = generateCumulativeChartData(chartDataPoints);

      // Portfolio overview stats
      const overview = {
        currentBalance: accounts.reduce(
          (sum, acc) => sum + (Number(acc.currentBalance) || 0),
          0
        ),
        roi: accounts.length
          ? accounts.reduce((sum, acc) => sum + (Number(acc.roi) || 0), 0) /
            accounts.length
          : 0,
        pnl: accounts.reduce((sum, acc) => sum + (Number(acc.pnl) || 0), 0),
        winrate: accounts.length
          ? accounts.reduce((sum, acc) => sum + (Number(acc.winrate) || 0), 0) /
            accounts.length
          : 0,
        // For the frontend, we can choose to use either the individual points or cumulative data
        chartData: chartDataPoints,
        // You can also add this field if you want to expose cumulative data to the frontend
        // cumulativeChartData: cumulativeChartData,
      };

      // Accounts with chart data
      const accountsWithChart = accounts.map((acc) => {
        // Filter trades for this specific account
        const accountTrades = normalizedTrades.filter(
          (t) => t.accountId === acc.id
        );

        // Generate chart data specifically for this account
        const accountChartData = generateChartData(accountTrades);

        return {
          ...acc,
          chartData: accountChartData,
        };
      });

      // Return the overview and all user accounts in the expected structure
      return {
        overview,
        accounts: accountsWithChart,
      };
    },
  },
};

export default tradeDataResolvers;