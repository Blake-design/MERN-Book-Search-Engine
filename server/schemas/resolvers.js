const { UserInputError } = require("apollo-server-errors");
const { User, Book } = require("../models");

const resolvers = {
  Query: {
    books: async () => {
      return await Book.find({});
    },
    users: async () => {
      return await User.find({}).populate("books");
    },
  },
  mutations: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Username / Password is incorrect");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Username / Password is incorrect");
      }

      const token = signToken(user);
      return { user, token };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(User);

      return { user, token };
    },
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please log in");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
