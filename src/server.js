require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser, protectResolver } from "./users/utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

server.listen(PORT).then(() => {
  console.log(`🚀  Server ready at ${PORT}`);
});