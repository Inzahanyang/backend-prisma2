require("dotenv").config();
import * as express from "express";
import * as logger from "morgan";
import * as http from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        client,
      };
    } else {
      return {
        loggedInUser: ctx.connection.context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async (params: any) => {
      if (!params.token) {
        throw new Error("You can not listen");
      }
      const loggedInUser = await getUser(params.token);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(logger("dev"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
