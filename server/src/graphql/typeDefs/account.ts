import { gql } from "graphql-tag";

export const tradingAccountTypeDefs = gql`
  type TradingAccount {
    id: ID!
    accountName: String!
    broker: String!
    accountCurrency: String!
    maxDailyDrawdown: Float!
    maxTotalDrawdown: Float!
    accountSize: String!
    currentBalance: Float!
    pnl: Float!
    roi: Float!
    winrate: Float!
    createdAt: String!
    updatedAt: String!
  }

  type TradingAccountResponse {
    success: Boolean!
    message: String
    tradingAccount: TradingAccount
  }

  type Query {
    getTradingAccount(id: ID!): TradingAccount
    getUserTradingAccounts: [TradingAccount!]!
  }

  type Mutation {
    createTradingAccount(
      accountName: String!
      broker: String!
      accountCurrency: String!
      maxDailyDrawdown: Float!
      maxTotalDrawdown: Float!
      accountSize: String!
    ): TradingAccountResponse

    updateTradingAccount(
      id: ID!
      accountName: String
      broker: String
      accountCurrency: String
      maxDailyDrawdown: Float
      maxTotalDrawdown: Float
      accountSize: String
    ): TradingAccountResponse

    deleteTradingAccount(id: ID!): Boolean!
  }
`;
