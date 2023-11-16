import { gql } from "@apollo/client";

export const REQUEST_AUTHENTICATION = gql`
    query requestLogin($email: String!) {
        requestLogin(email: $email)
    }
`;