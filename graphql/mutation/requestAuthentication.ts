import { gql } from "@apollo/client";

export const VALIDATE_AUTHENTICATION = gql`
    mutation validateOtp($code: String!, $email: String!, $username: String!, $setting: SettingInput!) {
        validateOtp(code: $code, email: $email, username: $username, setting: $setting) {
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

export const REFRESH_TOKEN = gql`
    mutation refreshToken {
        refreshToken {
            accessToken
            refreshToken
        }
    }
`