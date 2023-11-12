import { gql } from '@apollo/client';

export const GET_SELF = gql`
    query {
        me {
            username
            displayName
            email
            biography
            avatar
            createdAt
            events
            _id
        }
    }
`