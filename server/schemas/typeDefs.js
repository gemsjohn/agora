// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`  
  type User {
    _id: ID
    username: String
    email: String
    addedListing: [Listing]
  }

  type Listing {
    _id: ID
    title: String
    price: String
    description: String
    category: String
    condition: String
    media: [String]
  }

  type Auth {
    token: ID!
    user: User
    
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    listings: [Listing]
    listing(_id: ID!): Listing
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addListing(title: String, price: String, description: String, category: String, condition: String, media: [String] ): Listing
    removeListing(_id: ID!): Listing
  }
  
`;

// export the typeDefs
module.exports = typeDefs;