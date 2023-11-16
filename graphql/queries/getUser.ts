import { gql } from "@apollo/client";

export const GET_SELF = gql`
    query {
        me {
            _id
            displayName
            username
            email
            biography
            avatar
            createdAt
            events
            posts
            friendsReq {
                status
                user
            }
            friendList
            badges {
                type
                enabled
                focused
                value
            }
            level
        }
    }
`;
