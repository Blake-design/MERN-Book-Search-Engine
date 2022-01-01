const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    _id: ID
    bookID: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }
  type User {
    _id: ID
    username: String
    email: string
    bookCount: Int
    savedBooks: [Book]
  }
  type Query {
    me: USER
  }
  type Auth {
    token: ID!
    user: User
  }
  type mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookID: String!
      authors: [String]!
      description: String!
      image: String!
      link: String!
      title: String!
    ): User
    removeBook(BookId: String!): User
  }
`;

module.exports = typeDefs;
