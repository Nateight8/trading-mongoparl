// Define the GraphQL schema

import { userTypeDefs } from "./user.js";
import { conversationTypeDefs } from "./conversation.js";
import { tradingAccountTypeDefs } from "./account.js";
import { planTypeDefs } from "./plan.js";
import { riskSettingsTypeDefs } from "./riskSettings.js";
import { tradeTypeDefs } from "./trade.js";
const typeDefs = [
  userTypeDefs,
  conversationTypeDefs,
  tradingAccountTypeDefs,
  planTypeDefs,
  riskSettingsTypeDefs,
  tradeTypeDefs,
];

export default typeDefs;
