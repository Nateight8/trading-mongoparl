import { gql } from "@apollo/client";

const accountOperations = {
  Querries: {
    getUserTradingAccounts: gql`
      query GetUserTradingAccounts {
        getUserTradingAccounts {
          accountCurrency
          accountName
          accountSize
          broker
          createdAt
          currentBalance
          id
          maxDailyDrawdown
          maxTotalDrawdown
          pnl
          roi
          updatedAt
          winrate
        }
      }
    `,
  },

  Mutations: {
    createAccount: gql`
      mutation Mutation(
        $accountName: String!
        $broker: String!
        $accountCurrency: String!
        $maxDailyDrawdown: Float!
        $maxTotalDrawdown: Float!
        $accountSize: String!
      ) {
        createTradingAccount(
          accountName: $accountName
          broker: $broker
          accountCurrency: $accountCurrency
          maxDailyDrawdown: $maxDailyDrawdown
          maxTotalDrawdown: $maxTotalDrawdown
          accountSize: $accountSize
        ) {
          success
          message
          tradingAccount {
            id
          }
        }
      }
    `,
  },

  Subscriptions: {},
};

//types
export interface TradingAccount {
  __typename: "TradingAccount";
  id: string;
  accountName: string;
  broker: string;
  accountCurrency: string;
  accountSize: string; // Note: this is a string, not a number
  currentBalance: number;
  pnl: number;
  roi: number;
  winrate: number;
  maxDailyDrawdown: number;
  maxTotalDrawdown: number;
  createdAt: string; // This is a string timestamp (e.g., "1746469645265")
  updatedAt: string; // This is a string timestamp (e.g., "1746469645265")
}

interface TradingAccounts {
  getUserTradingAccounts: TradingAccount[];
}

export type { TradingAccount, TradingAccounts };
export default accountOperations;
