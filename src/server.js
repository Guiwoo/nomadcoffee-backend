require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { getUser, protectResolver } from "./users/utils";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req, res }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectResolver,
      };
    },
  });

  await server.start();
  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
