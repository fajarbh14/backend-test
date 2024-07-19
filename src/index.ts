import { ApolloServer, ExpressContext } from "apollo-server-express";
import express from "express";
import { createServer, Server } from "http";
import typeDefs from "./schema";
import { Database } from "./core/config/database";
import Resolvers from "./resolvers";
import "reflect-metadata";

class App {
  private app: express.Application;
  private server: Server;
  private database: any;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.database = Database.initialize();
  }

  private async connection() {
    this.database;
  }

  private async middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async apolloServer() {
    return new ApolloServer({
      typeDefs,
      resolvers: Resolvers,
      context: (req) => ({ req }),
      csrfPrevention: true,
      cache: "bounded",
      introspection: true,
    });
  }

  private async run() {
    const apollo: ApolloServer<ExpressContext> = await this.apolloServer();
    await apollo.start();
    apollo.applyMiddleware({ app: this.app, path: "/graphql" });
    this.server.listen(4000, () => {
      console.log(
        `Server is running on http://localhost:4000${apollo.graphqlPath}`,
      );
    });
  }

  public async main(): Promise<void> {
    this.connection();
    await this.middleware();
    await this.run();
  }
}

(async function () {
  await new App().main();
})();
