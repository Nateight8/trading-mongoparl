import { eq } from "drizzle-orm";
import { tradingAccounts } from "@/db/schema";
import GraphqlContext from "@/types/types.utils";
import { GraphQLError } from "graphql";

const tradeDataResolvers = {
  Query: {
    /**
     * userTradeData
     * Fetches the portfolio overview and all trading accounts for the logged-in user.
     * - Aggregates stats for the overview (currentBalance, roi, pnl, winrate)
     * - Returns all trading accounts for the user
     * - Placeholder for chartData aggregation
     */
    async userTradeData(_: any, _args: any, context: GraphqlContext) {
      const { db, session } = context;
      // Ensure the user is authenticated
      if (!session?.id) throw new GraphQLError("Not authenticated");

      // Fetch all trading accounts belonging to the logged-in user
      const accounts = await db.query.tradingAccounts.findMany({
        where: eq(tradingAccounts.userId, session.id),
      });

      // Aggregate portfolio overview stats
      // - currentBalance: sum of all account balances
      // - roi: average ROI across all accounts (0 if none)
      // - pnl: sum of all account PnL
      // - winrate: average winrate across all accounts (0 if none)
      // - chartData: placeholder for aggregated chart data (to be implemented)
      const overview = {
        currentBalance: accounts.reduce(
          (sum, acc) => sum + (acc.currentBalance || 0),
          0
        ),

        roi: accounts.length
          ? accounts.reduce((sum, acc) => sum + (acc.roi || 0), 0) /
            accounts.length
          : 0,

        pnl: accounts.reduce((sum, acc) => sum + (acc.pnl || 0), 0),

        winrate: accounts.length
          ? accounts.reduce((sum, acc) => sum + (acc.winrate || 0), 0) /
            accounts.length
          : 0,

        chartData: [], // TODO: Implement chart aggregation logic for portfolio
      };

      // Return the overview and all user accounts in the expected structure
      return {
        overview,
        accounts,
      };
    },
  },
};

export default tradeDataResolvers;
