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

    executeTrade: gql`
      mutation ExecuteTrade($input: ExecuteTradeInput!) {
        executeTrade(input: $input) {
          success
          message
        }
      }
    `,
    
    closeTrade: gql`

      mutation CloseTrade($input: ClosedTradeInput) {
  closeTrade(input: $input) {
    message
    success
  }
}

    `,

   

  },

  Subscriptions: {},
};

// TODO: Update this interface to match the backend schema as it evolves.
export interface TradeProps {
  // Example fields, update as needed
  id?: string;
  instrument?: string;
  plannedEntryPrice?: number;
  plannedStopLoss?: number;
  plannedTakeProfit?: number;
  size?: number;
  executionStyle?: string;
  status?: "OPEN" | "CLOSED" | "PENDING";
  // Add more fields as required
}

export default tradeOperations;
