import { gql } from "@apollo/client";

const tradeOperations = {
  Querries: {
    userTrades: gql`
      query UserTrades($accountId: ID!) {
        userTrades(accountId: $accountId) {
          accountId
          createdAt
          currentStopLoss
          executionStyle
          id
          initialStopLoss
          initialTakeProfit
          notes
          plannedEntryPrice
          remainingSize
          setupType
          side
          size
          status
          symbol
          updatedAt
          userId
        }
      }
    `,
  },

  Mutations: {
    createTradePlan: gql`
      mutation CreateTradePlan($input: TradePlanInput!) {
        createTradePlan(input: $input) {
          message
          success
        }
      }
    `,
  },

  Subscriptions: {},
};

export default tradeOperations;
