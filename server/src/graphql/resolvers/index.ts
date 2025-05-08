import merge from "lodash.merge";
import userResolvers from "./user.js";
import { conversationResolvers } from "./conversation.js";
import { participantsResolvers } from "./participants.js";
import onboardUserResolver from "./onboard-user.js";
import accountResolvers from "./account.js";
import tradeDataResolvers from "./t.js";
import tradeResolvers from "./trade.js";

// import listenersResolvers from "./listeners.js";

const resolvers = merge(
  {},
  userResolvers,
  conversationResolvers,
  participantsResolvers,
  onboardUserResolver,
  accountResolvers,
  tradeDataResolvers,
  tradeResolvers
);

export default resolvers;
