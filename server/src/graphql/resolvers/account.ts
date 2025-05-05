import { eq } from "drizzle-orm";
import { tradingAccounts } from "@/db/schema";
import GraphqlContext from "@/types/types.utils";
import { GraphQLError } from "graphql";
import { Snowflake } from "@theinternetfolks/snowflake";

const accountResolvers = {
  Query: {
    /**
     * Fetch a single trading account by its ID
     */
    async getTradingAccount(
      _: any,
      { id }: { id: string },
      context: GraphqlContext
    ) {
      const { db } = context;

      // Find the account with the given ID
      const account = await db.query.tradingAccounts.findFirst({
        where: eq(tradingAccounts.id, id),
      });

      if (!account) throw new GraphQLError("Account not found");
      return account;
    },

    /**
     * Fetch all trading accounts for the logged-in user
     */
    async getUserTradingAccounts(_: any, _args: any, context: GraphqlContext) {
      const { db, session } = context;
      if (!session?.id) throw new GraphQLError("Not authenticated");
      try {
        const accounts = await db.query.tradingAccounts.findMany({
          where: eq(tradingAccounts.userId, session.id),
        });
        return Array.isArray(accounts) ? accounts : [];
      } catch (e) {
        // Optionally log the error
        return [];
      }
    },
  },

  Mutation: {
    /**
     * Create a new trading account for the logged-in user
     */
    async createTradingAccount(
      _: any,
      args: {
        accountName: string;
        broker: string;
        accountCurrency: string;
        maxDailyDrawdown: number;
        maxTotalDrawdown: number;
        accountSize: string;
      },
      context: GraphqlContext
    ) {
      const { db, session } = context;
      if (!session?.id) throw new GraphQLError("Not authenticated");
      const startingBalance = Number(args.accountSize);
      // Generate prefixed Snowflake ID
      const prefix = args.accountName
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 4)
        .toLowerCase();
      const snowflake = Snowflake.generate();
      const uniqueId = `${prefix}${snowflake}`;
      // Insert the new account into the database
      const inserted = await db
        .insert(tradingAccounts)
        .values({
          id: uniqueId,
          userId: session.id,
          accountName: args.accountName,
          broker: args.broker,
          accountCurrency: args.accountCurrency,
          maxDailyDrawdown: args.maxDailyDrawdown,
          maxTotalDrawdown: args.maxTotalDrawdown,
          accountSize: args.accountSize,
          currentBalance: startingBalance,
          pnl: 0,
          roi: 0,
          winrate: 0,
        })
        .returning();

      return {
        success: true,
        message: "Account created successfully!",
        tradingAccount: inserted[0],
      };
    },

    /**
     * Update an existing trading account by ID
     */
    async updateTradingAccount(
      _: any,
      args: {
        id: string;
        accountName?: string;
        broker?: string;
        accountCurrency?: string;
        maxDailyDrawdown?: number;
        maxTotalDrawdown?: number;
        accountSize?: string;
      },
      context: GraphqlContext
    ) {
      const { db } = context;
      // Separate id from the fields to update
      const { id, ...updateFields } = args;
      // Update the account in the database
      const updated = await db
        .update(tradingAccounts)
        .set(updateFields)
        .where(eq(tradingAccounts.id, id))
        .returning();

      if (!updated[0])
        throw new GraphQLError("Account not found or not updated");

      return {
        success: true,
        message: "Account updated successfully!",
        tradingAccount: updated[0],
      };
    },

    /**
     * Delete a trading account by ID
     */

    async deleteTradingAccount(
      _: any,
      { id }: { id: string },
      context: GraphqlContext
    ) {
      const { db } = context;
      // Delete the account from the database
      const deleted = await db
        .delete(tradingAccounts)
        .where(eq(tradingAccounts.id, id))
        .returning();
      if (!deleted[0])
        throw new GraphQLError("Account not found or not deleted");
      return true;
    },
  },
};

export default accountResolvers;
