import { gql } from "@apollo/client";

export const REQUEST_AUTHENTICATION = gql`
    query requestLogin($email: String!) {
        requestLogin(email: $email)
    }
`;

export const VALIDATE_AUTHENTICATION = gql`
    query validateOtp($code: String!, $email: String!, $username: String!) {
        validateOtp(code: $code, email: $email, username: $username) {
            user {
                username
                displayName
                email
                biography
                avatar
                createdAt
                events
                _id
            }
            token {
                accessToken
                refreshToken
            }
        }
    }
`;
