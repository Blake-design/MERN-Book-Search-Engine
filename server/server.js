const express = require("express");
const { ApolloServer } = require("appolo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typesDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port :${PORT}!`);
    console.log(
      `Use GraphQl at https://localhost:${PORT}${server.graphqlPath}`
    );
  });
});
