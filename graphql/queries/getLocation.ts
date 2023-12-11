import { gql } from "@apollo/client";

export const GET_LOCATION_BY_ADDRESS = gql`
    query getLocation($address: String!) {
        getLocationDataByAddress(address: $address) {
            name
            point {
              coordinates
            }
            address {
              postalCode
              addressLine
            }
            entityType
            matchCodes
            confidence
            geocodePoint {
              type
              coordinates
              calculationMethod
              usageTypes
            }
        }
    }
`

export const GET_LOCATION_BY_POINT = gql`
query getLocation($lat: String!, $long: String!) {
  getLocationDataByPoint(lat: $lat, long: $long) {
      name
      point {
        coordinates
      }
      address {
        postalCode
        addressLine
      }
      entityType
      matchCodes
      confidence
      geocodePoint {
        type
        coordinates
        calculationMethod
        usageTypes
      }
  }
}
`