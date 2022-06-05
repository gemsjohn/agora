import { gql } from '@apollo/client';

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
    mutation Mutation($listId: ID, $title: String, $price: String, $description: String, $category: String, $condition: String, $media: [String]) {
        addListing(listId: $listId, title: $title, price: $price, description: $description, category: $category, condition: $condition, media: $media) {
            _id
            username
            email
            addedListing {
                listId
                title
                price
                description
                category
                condition
                media
            }
        }
        }
`;

// REMOVE_BOOK