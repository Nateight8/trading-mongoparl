import { eq } from "drizzle-orm";
import { tradingAccounts, trades as tradesTable } from "@/db/schema";
import { generateChartData } from "@/utils/chart.utils";
import GraphqlContext from "@/types/types.utils";
import { GraphQLError } from "graphql";

type Account = typeof tradingAccounts.$inferSelect;
type Trade = typeof tradesTable.$inferSelect;

const tradeDataResolvers = {
  Query: {
    /**
     * userTradeData
     * Fetches the portfolio overview and all trading accounts for the logged-in user.
     * - Aggregates stats for the overview (currentBalance, roi, pnl, winrate)
     * - Returns all trading accounts for the user
     * - Placeholder for chartData aggregation
     */
    async userTradeData(_: unknown, _args: unknown, context: GraphqlContext) {
      const { db, session } = context;
      // Ensure the user is authenticated to protect user data and prevent unauthorized access
      if (!session?.id) throw new GraphQLError("Not authenticated");

      // Fetch all trading accounts for the user
      // We need all accounts to compute portfolio-level stats and to show per-account analytics
      const accounts: Account[] = await db.query.tradingAccounts.findMany({
        where: eq(tradingAccounts.userId, session.id),
      });

      // Fetch all trades for the user
      // We need all trades to compute accurate chart data and performance metrics
      const trades: Trade[] = await db.query.trades.findMany({
        where: eq(tradesTable.userId, session.id),
      });

      // Portfolio overview stats
      // These aggregate the user's entire portfolio for a high-level dashboard view
      // - currentBalance: sum of all account balances (shows total capital)
      // - roi: average ROI across all accounts (shows overall return)
      // - pnl: sum of all account PnL (shows total profit/loss)
      // - winrate: average winrate across all accounts (shows consistency)
      // - chartData: aggregated chart data for the whole portfolio (for visualizing growth, PnL, etc.)
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
        chartData: generateChartData(
          trades.map((t) => ({
            ...t,
            plannedEntryPrice: Number(t.plannedEntryPrice),
            plannedStopLoss: Number(t.plannedStopLoss),
            plannedTakeProfit: Number(t.plannedTakeProfit),
            executedEntryPrice: t.executedEntryPrice
              ? Number(t.executedEntryPrice)
              : undefined,
            executedStopLoss: t.executedStopLoss
              ? Number(t.executedStopLoss)
              : undefined,
            exitPrice: t.exitPrice ? Number(t.exitPrice) : undefined,
            size: Number(t.size),
            executionNotes: t.executionNotes ?? undefined,
            setupType: t.setupType ?? undefined,
            timeframe: t.timeframe ?? undefined,
            notes: t.notes ?? undefined,
            tags: Array.isArray(t.tags) ? t.tags : undefined,
            projectedOutcome: (t as any).projectedOutcome ?? undefined,
            closed: t.closed ?? undefined,
            x:
              t.createdAt instanceof Date
                ? t.createdAt.toISOString()
                : t.createdAt,
            updatedAt:
              t.updatedAt instanceof Date
                ? t.updatedAt.toISOString()
                : t.updatedAt,
          }))
        ), // Aggregated chart data for portfolio (shows overall performance over time)
      };

      // Accounts with chart data
      // For each account, attach its own chart data so users can drill down into individual account performance
      const accountsWithChart = accounts.map((acc) => ({
        ...acc,
        chartData: generateChartData(
          trades
            .filter((t) => t.accountId === acc.id)
            .map((t) => ({
              ...t,
              plannedEntryPrice: Number(t.plannedEntryPrice),
              plannedStopLoss: Number(t.plannedStopLoss),
              plannedTakeProfit: Number(t.plannedTakeProfit),
              executedEntryPrice: t.executedEntryPrice
                ? Number(t.executedEntryPrice)
                : undefined,
              executedStopLoss: t.executedStopLoss
                ? Number(t.executedStopLoss)
                : undefined,
              exitPrice: t.exitPrice ? Number(t.exitPrice) : undefined,
              size: Number(t.size),
              executionNotes: t.executionNotes ?? undefined,
              setupType: t.setupType ?? undefined,
              timeframe: t.timeframe ?? undefined,
              notes: t.notes ?? undefined,
              tags: Array.isArray(t.tags) ? t.tags : undefined,
              projectedOutcome: (t as any).projectedOutcome ?? undefined,
              closed: t.closed ?? undefined,
              x:
                t.createdAt instanceof Date
                  ? t.createdAt.toISOString()
                  : t.createdAt,
              updatedAt:
                t.updatedAt instanceof Date
                  ? t.updatedAt.toISOString()
                  : t.updatedAt,
            }))
        ),
      }));

      // Return the overview and all user accounts in the expected structure
      // This structure powers the frontend dashboard and analytics
      return {
        overview,
        accounts: accountsWithChart,
      };
    },
  },
};

export default tradeDataResolvers;
