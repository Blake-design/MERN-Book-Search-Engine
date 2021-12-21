import { gql } from "@apollo/client";

export const QUERY_BOOKS = gql`
  query books {
    books {
      name
    }
  }
`;
