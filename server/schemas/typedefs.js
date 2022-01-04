////// These define the query structure to the DB

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    _id: ID
    bookID: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String
  }
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  input SavedBook {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
  }
  type Query {
    me: User
  }
  type Auth {
    token: ID!
    user: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: SavedBook!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
