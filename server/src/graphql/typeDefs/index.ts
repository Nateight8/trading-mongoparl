// Define the GraphQL schema

import { userTypeDefs } from "./user.js";
import { conversationTypeDefs } from "./conversation.js";
import { tradingAccountTypeDefs } from "./tradingAccount.js";
import { planTypeDefs } from "./plan.js";
import { riskSettingsTypeDefs } from "./riskSettings.js";

const typeDefs = [
  userTypeDefs,
  conversationTypeDefs,
  tradingAccountTypeDefs,
  planTypeDefs,
  riskSettingsTypeDefs,
];

export default typeDefs;
