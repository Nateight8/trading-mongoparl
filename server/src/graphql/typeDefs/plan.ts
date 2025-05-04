import { gql } from "graphql-tag";

export const planTypeDefs = gql`
  type Plan {
    id: ID!
    userId: ID!
    planName: String!
    description: String
    startDate: String!
    endDate: String
    createdAt: String!
    updatedAt: String!
  }

  type PlanResponse {
    success: Boolean!
    message: String
    plan: Plan
  }

  type Query {
    getPlan(id: ID!): Plan
    getUserPlans(userId: ID!): [Plan!]!
  }

  type Mutation {
    createPlan(
      userId: ID!
      planName: String!
      description: String
      startDate: String!
      endDate: String
    ): PlanResponse

    updatePlan(
      id: ID!
      planName: String
      description: String
      startDate: String
      endDate: String
    ): PlanResponse

    deletePlan(id: ID!): Boolean!
  }
`;
