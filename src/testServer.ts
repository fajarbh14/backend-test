import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";
import { createServer, Server } from "http";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import { Database } from "./core/config/database";

export const createApolloServer = async (): Promise<{
  app: Application;
  httpServer: Server;
  apolloServer: ApolloServer;
}> => {
  const app = express();
  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    csrfPrevention: true,
    cache: "bounded",
    introspection: true,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  return { app, httpServer, apolloServer };
};

export const startServer = async () => {
  await Database.initialize();

  const { app, httpServer, apolloServer } = await createApolloServer();
  const PORT = process.env.PORT || 4000;
  const url = `http://localhost:${PORT}${apolloServer.graphqlPath}`;

  return new Promise((resolve, reject) => {
    httpServer.listen(PORT, () => {
      resolve({ app, httpServer, apolloServer, url });
    });
  });
};
