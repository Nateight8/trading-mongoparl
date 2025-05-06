import { gql } from "graphql-tag";

export const tradingAccountTypeDefs = gql`
  """
  Trading Account type representing a user's trading account
  Contains account details, performance metrics, and risk parameters
  """
  type TradingAccount {
    """
    Unique identifier for the trading account
    """
    id: ID!
    """
    Name/label of the trading account
    """
    accountName: String!
    """
    Broker or trading platform name
    """
    broker: String!
    """
    Base currency of the trading account
    """
    accountCurrency: String!
    """
    Maximum allowed daily drawdown percentage
    """
    maxDailyDrawdown: Float!
    """
    Maximum allowed total drawdown percentage
    """
    maxTotalDrawdown: Float!
    """
    Initial account size/balance
    """
    accountSize: String!
    """
    Current account balance
    """
    currentBalance: Float!
    """
    Total profit and loss
    """
    pnl: Float!
    """
    Return on investment percentage
    """
    roi: Float!
    """
    Win rate percentage
    """
    winrate: Float!
    """
    Timestamp when account was created
    """
    createdAt: String!
    """
    Timestamp of last account update
    """
    updatedAt: String!
  }

  """
  Response type for trading account operations
  Contains success status, optional message, and account data
  """
  type TradingAccountResponse {
    success: Boolean!
    message: String
    tradingAccount: TradingAccount
  }

  """
  Available queries for trading account operations
  """
  type Query {
    """
    Get a trading account by its ID
    """
    getTradingAccount(id: ID!): TradingAccount
  }

  """
  Available mutations for trading account operations
  """
  type Mutation {
    """
    Create a new trading account
    Requires essential account details and risk parameters
    """
    createTradingAccount(
      """
      Name/label for the trading account
      """
      accountName: String!
      """
      Broker or trading platform name
      """
      broker: String!
      """
      Base currency of the trading account
      """
      accountCurrency: String!
      """
      Maximum allowed daily drawdown percentage
      """
      maxDailyDrawdown: Float!
      """
      Maximum allowed total drawdown percentage
      """
      maxTotalDrawdown: Float!
      """
      Initial account size/balance
      """
      accountSize: String!
    ): TradingAccountResponse

    """
    Update an existing trading account
    All fields are optional and only provided fields will be updated
    """
    updateTradingAccount(
      """
      ID of the account to update
      """
      id: ID!
      """
      New name/label for the trading account
      """
      accountName: String
      """
      New broker or trading platform name
      """
      broker: String
      """
      New base currency of the trading account
      """
      accountCurrency: String
      """
      New maximum allowed daily drawdown percentage
      """
      maxDailyDrawdown: Float
      """
      New maximum allowed total drawdown percentage
      """
      maxTotalDrawdown: Float
      """
      New account size/balance
      """
      accountSize: String
    ): TradingAccountResponse

    """
    Delete a trading account by its ID
    """
    deleteTradingAccount(id: ID!): Boolean!
  }
`;
