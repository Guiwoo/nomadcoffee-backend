import { gql } from "apollo-server-core";

export default gql`
  type SearchResult {
    User: [User]!
    error: String
  }
  type Query {
    searchUser(keyword: String!, page: Int!): SearchResult!
  }
`;
