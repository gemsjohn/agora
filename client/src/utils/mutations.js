import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LISTING = gql`
  mutation Mutation(
    $title: String
    $price: String
    $description: String
    $category: String
    $condition: String
    $contact: String
    $media: [String]
  ) {
    addListing(
      title: $title
      price: $price
      description: $description
      category: $category
      condition: $condition
      contact: $contact
      media: $media
    ) {
      _id
      title
      price
      description
      category
      condition
      contact
      media
    }
  }
`;
