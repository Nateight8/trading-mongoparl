import { gql } from "graphql-tag";

export const tradeLogTypeDefs = gql`
  # --- Core Trade Types ---

  """
  Trade type representing a complete trade entry
  Contains all planned and actual trade details, risk metrics, and outcomes
  """
  type Trade {
    """
    Unique identifier for the trade
    """
    id: ID!
    """
    ID of the user who placed the trade
    """
    userId: ID!
    """
    ID of the trading account used
    """
    accountId: ID!
    """
    Trading symbol/instrument
    """
    symbol: String!
    """
    Trade direction (BUY/SELL)
    """
    side: String!
    """
    Entry price of the trade
    """
    entryPrice: Float!
    """
    Timestamp when trade was entered
    """
    entryTimestamp: String!
    """
    Initial position size
    """
    size: Float!
    """
    Initial stop loss price
    """
    initialStopLoss: Float!
    """
    Initial risk amount in account currency
    """
    initialRiskAmount: Float!
    """
    Initial risk as percentage of account
    """
    initialRiskPercentage: Float!
    """
    Risk per pip calculation
    """
    rPerPip: Float!
    """
    Current trade status
    """
    status: String!
    """
    Remaining position size after partial exits
    """
    remainingSize: Float!
    """
    Current stop loss price (may be different from initial)
    """
    currentStopLoss: Float!
    """
    Type of trading setup used
    """
    setupType: String
    """
    Timeframe of the trade
    """
    timeframe: String
    """
    Additional notes about the trade
    """
    notes: String
    """
    Custom tags for categorizing trades
    """
    tags: [String!]
    """
    Planned take profit targets
    """
    targets: [TradeTarget!]!
    """
    Actual trade outcomes/exits
    """
    outcomes: [TradeOutcome!]!
    """
    Possible trade scenarios
    """
    scenarios: [TradeScenario!]!
    """
    Timestamp when trade was created
    """
    createdAt: String!
    """
    Timestamp of last trade update
    """
    updatedAt: String!
  }

  """
  Trade target type for planning exit points
  """
  type TradeTarget {
    """
    Unique identifier for the target
    """
    id: ID!
    """
    ID of the trade this target belongs to
    """
    tradeId: ID!
    """
    Label/name of the target
    """
    label: String!
    """
    Target price level
    """
    price: Float!
    """
    Risk-reward ratio at this target
    """
    riskReward: Float!
    """
    Planned exit size at this target
    """
    exitSize: Float!
    """
    Optional stop loss adjustment after hitting target
    """
    moveStopTo: Float
    """
    Timestamp when target was created
    """
    createdAt: String!
  }

  """
  Trade outcome type for recording actual exits
  """
  type TradeOutcome {
    """
    Unique identifier for the outcome
    """
    id: ID!
    """
    ID of the trade this outcome belongs to
    """
    tradeId: ID!
    """
    Type of outcome (target hit, stop loss, etc.)
    """
    outcomeType: String!
    """
    Actual exit price
    """
    exitPrice: Float!
    """
    Size of position closed
    """
    exitSize: Float!
    """
    Timestamp of the exit
    """
    exitTimestamp: String!
    """
    Profit/loss from this exit
    """
    pnl: Float!
    """
    Achieved risk-reward ratio
    """
    riskReward: Float!
    """
    ID of the target if exit was at a planned target
    """
    targetId: ID
    """
    Additional notes about the exit
    """
    notes: String
    """
    Timestamp when outcome was recorded
    """
    createdAt: String!
  }

  """
  Exit step type for modeling trade scenarios
  """
  type ExitStep {
    targetId: ID
    price: Float!
    size: Float!
    remainingSize: Float!
    newStopLoss: Float
  }

  """
  Trade scenario type for modeling possible outcomes
  """
  type TradeScenario {
    id: ID!
    tradeId: ID!
    name: String!
    description: String!
    # Reserved for future use as setupRating
    probability: Float
    exitSequence: [ExitStep!]!
    finalPnl: Float!
    finalRiskReward: Float!
    finalAccountBalance: Float!
    createdAt: String!
  }

  # --- Input Types ---

  input TradeTargetInput {
    label: String!
    price: Float!
    riskReward: Float!
    exitSize: Float!
    moveStopTo: Float
  }

  input TradeInput {
    accountId: ID!
    symbol: String!
    side: String!
    entryPrice: Float!
    entryTimestamp: String!
    size: Float!
    initialStopLoss: Float!
    initialRiskAmount: Float!
    initialRiskPercentage: Float!
    rPerPip: Float!
    setupType: String
    timeframe: String
    notes: String
    tags: [String!]
    targets: [TradeTargetInput!]!
  }

  input TradeOutcomeInput {
    tradeId: ID!
    outcomeType: String!
    exitPrice: Float!
    exitSize: Float!
    exitTimestamp: String!
    pnl: Float!
    riskReward: Float!
    targetId: ID
    notes: String
  }

  # --- Response Types ---

  type TradeResponse {
    success: Boolean!
    message: String
    trade: Trade
  }

  # --- Queries ---

  type Query {
    trade(id: ID!): Trade
    userTrades(userId: ID!, filter: TradeFilterInput): [Trade!]!
    getTradesByAccount(accountId: ID!): [Trade!]!
    tradeScenarios(tradeId: ID!): [TradeScenario!]!
    accountAnalytics(accountId: ID!, timeframe: String!): AccountAnalytics!
  }

  input TradeFilterInput {
    status: String
    symbol: String
    dateFrom: String
    dateTo: String
  }

  type AccountAnalytics {
    winRate: Float!
    averageRiskReward: Float!
    profitFactor: Float!
    totalTrades: Int!
    profitableTrades: Int!
    losingTrades: Int!
    largestWin: Float!
    largestLoss: Float!
    averageWin: Float!
    averageLoss: Float!
    equityCurve: [EquityPoint!]!
  }

  type EquityPoint {
    timestamp: String!
    balance: Float!
  }

  type Mutation {
    createTrade(input: TradeInput!): TradeResponse!
    recordTradeOutcome(input: TradeOutcomeInput!): TradeOutcome!
    addTradeTarget(tradeId: ID!, input: TradeTargetInput!): TradeTarget!
    updateTradeStopLoss(tradeId: ID!, newStopLoss: Float!): Trade!
  }
`;
