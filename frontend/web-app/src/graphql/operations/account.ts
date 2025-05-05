import { gql } from "@apollo/client";

const accountOperations = {
  Querries: {
    userTradData: gql`
      query UserTradeData {
        userTradeData {
          overview {
            currentBalance
            pnl
            roi
            winrate
          }
          accounts {
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
export interface PortfolioOverview {
  __typename: "PortfolioOverview";
  currentBalance: number;
  pnl: number;
  roi: number;
  winrate: number;
}

export interface TradingAccount {
  __typename: "TradingAccount";
  id: string;
  accountName: string;
  broker: string;
  accountCurrency: string;
  accountSize: string;
  currentBalance: number;
  pnl: number;
  roi: number;
  winrate: number;
  maxDailyDrawdown: number;
  maxTotalDrawdown: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserTradeData {
  __typename: "UserTradeData";
  overview: PortfolioOverview;
  accounts: TradingAccount[];
}

export default accountOperations;
