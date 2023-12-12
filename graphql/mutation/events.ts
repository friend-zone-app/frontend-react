import { gql } from "@apollo/client"

export const CREATE_EVENT = gql`
    mutation createEvent($Event: CreateEventInput!) {
        createEvent(createEvent: $Event) {
            title
            author
            _id
            description
            location {
              coordinates
            }
            createdAt
            inviters {
              status
              inviteTo
              createdAt
            }
            type
            privacy {
              whoCanSee
              whoCanJoin
            }
            image
        }
    }
`