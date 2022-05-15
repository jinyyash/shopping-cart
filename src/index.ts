import express from "express";
import { graphqlHTTP } from "express-graphql";
import { createConnection } from "typeorm";
import { Users } from "./db/Entities/User";
import { schema } from "./function/user";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "shoppingplanner",
    username: "jinadi",
    password: "",
    logging: true,
    synchronize: true,
    entities: [Users],
  });
  const app = express();
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  app.listen(3002, () => {
    console.log("server running");
  });
};

main().catch((err) => {
  console.log(err);
});
