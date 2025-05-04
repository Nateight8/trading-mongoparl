import { gql } from "graphql-tag";

export const riskSettingsTypeDefs = gql`
  type RiskSettings {
    id: ID!
    userId: ID!
    maxRiskPerTrade: Float!
    maxOpenTrades: Int!
    maxDailyLoss: Float!
    maxWeeklyLoss: Float!
    createdAt: String!
    updatedAt: String!
  }

  type RiskSettingsResponse {
    success: Boolean!
    message: String
    riskSettings: RiskSettings
  }

  type Query {
    getRiskSettings(id: ID!): RiskSettings
    getUserRiskSettings(userId: ID!): [RiskSettings!]!
  }

  type Mutation {
    createRiskSettings(
      userId: ID!
      maxRiskPerTrade: Float!
      maxOpenTrades: Int!
      maxDailyLoss: Float!
      maxWeeklyLoss: Float!
    ): RiskSettingsResponse

    updateRiskSettings(
      id: ID!
      maxRiskPerTrade: Float
      maxOpenTrades: Int
      maxDailyLoss: Float
      maxWeeklyLoss: Float
    ): RiskSettingsResponse

    deleteRiskSettings(id: ID!): Boolean!
  }
`;
