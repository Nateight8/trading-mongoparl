import { gql } from "graphql-tag";

export const tradingAccountTypeDefs = gql`
  type TradingAccount {
    id: ID!
    userId: ID!
    accountName: String!
    broker: String!
    accountCurrency: String!
    maxDailyDrawdown: Float!
    maxTotalDrawdown: Float!
    accountSize: String!
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
    getUserTradingAccounts(userId: ID!): [TradingAccount!]!
  }

  type Mutation {
    createTradingAccount(
      userId: ID!
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
