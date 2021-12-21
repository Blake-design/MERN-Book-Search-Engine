const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    bookID: String
    authors: String
    description: String
    image: String
    link: String
    title: String
  }

  type Query {
    books: [Book]
  }
`;

module.exports = typeDefs;
