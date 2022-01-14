import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import dotenv from "dotenv";
import { JWTValidate } from "./modules/user/JWT/validate";
import { LoginResolver } from "./modules/user/Login";
import { UploadImageResolver } from "./modules/user/UploadImage";
import { ProductResolver } from "./modules/product/Product";
import { CategoryResolver } from "./modules/product/categorys/Categorys";
import { graphqlUploadExpress } from "graphql-upload";

dotenv.config();
const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      JWTValidate,
      LoginResolver,
      UploadImageResolver,
      ProductResolver,
      CategoryResolver,
    ],
  });
  const server = new ApolloServer({ schema });
  await server.start();
  const app = express();
  app.use(express.static("public"));
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise<void>((r) => app.listen({ port: 4000 }, r));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};
main();
