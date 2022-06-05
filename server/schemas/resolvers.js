const { AuthenticationError } = require('apollo-server-express');
const { User, Listing } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id})
            .select('-__v -password')
            // .populate('savedBooks');
          
          return userData;
        }
        throw new AuthenticationError('Not logged in');
      },
      classified: async (parent, args, context) => {
        const listingData = await Listing.findOne({ _id: context.listing._id})
        return listingData;
      }
    },

    Mutation: {
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if(!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
      },
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      },
      addListing: async (parent, {listId, title, price, description, category, condition, media}, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { addedListing: { listId: listId, title: title, price: price, description: description, category: category, condition: condition, media: media } } },
            { new: true }
          )

          return updatedUser;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    }
  };
  
  module.exports = resolvers;