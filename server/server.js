/// import express server
const express = require("express");

///// import Apollo server
const { ApolloServer } = require("apollo-server-express");

/// assign middleware for Auth
const { authMiddleware } = require("./utils/auth");

/// import typdefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

// variable to configure database connection
const db = require("./config/connection");

// import path to be use in routing file paths
const path = require("path");

//// wrap the server in async as per new version this will start up the server
async function startApolloServer() {
  ///this tell what port it will operate on
  const PORT = process.env.PORT || 3001;

  ///this set the APP to run using Express
  const app = express();

  /// this creates a Apollo Server with
  const server = new ApolloServer({
    ////typeDefs  define the query DB structures
    typeDefs,

    //// resolvers explain how to run methods called on DB
    resolvers,

    //// context with allow us to use JSON web tokens
    context: authMiddleware,
  });

  ///   once connected
  await server.start();

  //// apply  the middleware to express
  server.applyMiddleware({ app });
  ///// ?????
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  ///// ?????

  ////// if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port :${PORT}!`);
      console.log(
        `Use GraphQl at https://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}
startApolloServer();
