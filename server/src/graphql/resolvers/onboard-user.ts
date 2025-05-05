import GraphqlContext from "@/types/types.utils";
import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import {
  users,
  tradingAccounts,
  riskSettings,
  tradingPlans,
} from "@/db/schema";
import { Snowflake } from "@theinternetfolks/snowflake";

export interface OnboardUserInput {
  accountName: string;
  broker: string;
  accountCurrency: string;
  maxDailyDrawdown: number;
  maxTotalDrawdown: number;
  accountSize: string;
  riskPerTrade: number;
  maxDailyRisk: number;
  tradingStyle: string;
  riskRewardRatio: string;
  timeZone: string;
  maxOpenTrades: number;
  tradingSessions: string[];
  planNote?: string;
}

// Helper to parse ratio string like '1:7' to a number (e.g., 7)
function parseRatio(ratio: string): number {
  const [a, b] = ratio.split(":").map(Number);
  if (!a || !b) throw new Error("Invalid ratio format");
  return b / a;
}

const onboardUserResolver = {
  Query: {},

  Mutation: {
    onboardUser: async (
      _: any,
      { input }: { input: OnboardUserInput },
      context: GraphqlContext
    ) => {
      const { db, session } = context;

      if (!session?.id) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      // Upsert trading account
      const prefix = input.accountName
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 4)
        .toLowerCase();
      const snowflake = Snowflake.generate();
      const uniqueId = `${prefix}${snowflake}`;
      await db.insert(tradingAccounts).values({
        id: uniqueId,
        userId: session.id,
        accountName: input.accountName,
        broker: input.broker,
        accountCurrency: input.accountCurrency,
        maxDailyDrawdown: input.maxDailyDrawdown,
        maxTotalDrawdown: input.maxTotalDrawdown,
        accountSize: input.accountSize,
        currentBalance: Number(input.accountSize),
      });

      // Upsert risk settings
      await db
        .insert(riskSettings)
        .values({
          userId: session.id,
          accountBalance: String(input.accountSize),
          riskPerTrade: String(input.riskPerTrade),
          maxDailyRisk: String(input.maxDailyRisk),
          maxOpenTrades: input.maxOpenTrades,
          riskRewardRatio: String(parseRatio(input.riskRewardRatio)),
        })
        .onConflictDoUpdate({
          target: [riskSettings.userId],
          set: {
            accountBalance: String(input.accountSize),
            riskPerTrade: String(input.riskPerTrade),
            maxDailyRisk: String(input.maxDailyRisk),
            maxOpenTrades: input.maxOpenTrades,
            riskRewardRatio: String(parseRatio(input.riskRewardRatio)),
          },
        });

      // Upsert trading plan
      await db
        .insert(tradingPlans)
        .values({
          userId: session.id,
          instruments: input.tradingStyle,
          note: input.planNote,
          session: input.tradingSessions.join(", "),
          isDefault: true,
        })
        .onConflictDoUpdate({
          target: [tradingPlans.userId],
          set: {
            instruments: input.tradingStyle,
            note: input.planNote,
            session: input.tradingSessions.join(", "),
            isDefault: true,
          },
        });

      // Mark user as onboarded
      await db
        .update(users)
        .set({ onboardingCompleted: true })
        .where(eq(users.id, session.id));

      return {
        success: true,
        message: "User onboarded successfully!",
      };
    },
  },
};
export default onboardUserResolver;
