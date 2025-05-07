import { gql } from "@apollo/client";

const tradeOperations = {
  Querries: {
    loggedTrades: gql`
      query LoggedTrades($accountId: ID!) {
        loggedTrades(accountId: $accountId) {
          instrument
          plannedStopLoss
          plannedTakeProfit
          plannedEntryPrice
          notes
          setupType
          side
          size
          status
          tags
          timeframe
          updatedAt
          userId
          id
          executionStyle
          createdAt
          accountId
        }
      }
    `,
  },

  Mutations: {
    logTrade: gql`
      mutation LogTrade($input: LogTradeInput!) {
        logTrade(input: $input) {
          success
          message
        }
      }
    `,
  },

  Subscriptions: {},
};

export default tradeOperations;
