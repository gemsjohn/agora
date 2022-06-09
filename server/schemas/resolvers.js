const { AuthenticationError } = require('apollo-server-express');
const { User, Listing } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id})
            .select('-__v -password')
            .populate('addedListing');
          
          return userData;
        }
        throw new AuthenticationError('Not logged in');
      },
      // users
      users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('addedListing')
      },
      // single user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('addedListing')
      },
      // listings
      listings: async () => {
        return Listing.find().sort({ createdAt: -1 });
      },
      // single listing
      listing: async (parent, { _id }) => {
        return Listing.findOne({ _id });
      },
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
      addListing: async (parent, args, context) => {
        if (context.user) {
          const listing = await Listing.create({
            ...args,
            username: context.user.username,
          });
  
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { addedListing: listing._id } },
            { new: true }
          );

          return listing;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      addToWatchlist: async (parent, { _id, title, price, description, category, condition, contact, media }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { watchlist: { _id: _id, title: title, price: price, description: description, category: category, condition: condition, contact: contact, media: media } } },
            { new: true }
          )
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
    }
  };
  
  module.exports = resolvers;