import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type UpdateUserResponse {
    success: Boolean!
    message: String
    user: User
  }

  """
  User type with minimal fields needed for conversation creation
  """
  type User {
    id: ID!
    name: String
    displayName: String
    bio: String
    email: String
    emailVerified: String
    image: String
    location: String
    address: String
    phoneVerified: Boolean
    onboardingCompleted: Boolean
    banner: String
    username: String
    createdAt: String
    updatedAt: String
    participantId: String
  }

  type GetLoggedInUserReturn {
    status: Int
    user: User
  }

  type GetAllUsersResponse {
    status: Int
    users: [User!]!
  }

  type LoggedInUserResponse {
    user: User
  }

  type PortfolioOverview {
    currentBalance: Float!
    roi: Float!
    pnl: Float!
    winrate: Float!
    chartData: [ChartPoint!]!
  }

  type ChartPoint {
    month: String!
    actual: Float!
    projected: Float!
  }

  type UserTradeData {
    overview: PortfolioOverview!
    accounts: [TradingAccount!]!
  }

  type Query {
    getLoggedInUser: GetLoggedInUserReturn
    getAllUsers: GetAllUsersResponse
    checkUsernameAvailability(username: String!): Boolean!
    userTradeData: UserTradeData!
  }

  type Mutation {
    updateUser(
      name: String
      email: String
      displayName: String
      bio: String
      image: String
      location: String
      address: String
      phoneVerified: Boolean
      onboardingCompleted: Boolean
      banner: String
    ): UpdateUserResponse

    updateUsername(username: String!): UpdateUserResponse

    deleteUser: Boolean!

    onboardUser(input: OnboardUserInput!): OnboardUserResponse!
  }

  input OnboardUserInput {
    accountName: String!
    broker: String!
    accountCurrency: String!
    maxDailyDrawdown: Float!
    maxTotalDrawdown: Float!
    accountSize: String!
    riskPerTrade: Float!
    maxDailyRisk: Float!
    tradingStyle: String!
    riskRewardRatio: String!
    timeZone: String!
    maxOpenTrades: Int!
    tradingSessions: [String!]!
    planNote: String
  }

  type OnboardUserResponse {
    success: Boolean!
    message: String
  }
`;

export interface UserProfileInput {
  name: string | null;
  email: string | null;
  image: string | null;
  location: string | null;
  address: string | null;
  phoneVerified: boolean | null;
  onboardingCompleted: boolean | null;
  banner: string | null;
  bio: string | null;
  displayName: string | null;
}
