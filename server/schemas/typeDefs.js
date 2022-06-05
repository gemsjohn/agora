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
    listId: ID
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
    classified: Listing
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addListing(listId: ID, title: String, price: String, description: String, category: String, condition: String, media: [String] ): User
  }
  
`;

// export the typeDefs
module.exports = typeDefs;