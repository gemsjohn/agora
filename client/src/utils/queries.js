import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            addedListing {
                _id
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

export const GET_USERS = gql`
    {
        users {
            _id
            username
            email
            addedListing {
                _id
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

export const GET_LISTINGS = gql`
    {
        listings {
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