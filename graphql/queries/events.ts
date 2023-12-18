import { gql } from "@apollo/client";

export const GET_SELF_EVENTS = gql`
    query getEvents($id: String!) {
        getUserEvents(userId: $id) {
            title
            location {
                type
                coordinates
            }
            image
            description
            createdAt
        }
    }
`