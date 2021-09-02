import { gql } from "apollo-server-core";

export default gql`
  type TheResult {
    CoffeeShop: [CoffeeShop]
    Category: [Category]
    type: String!
    error: String
  }
  type Query {
    searchCoffeeShop(keyword: String!, page: Int!): TheResult!
  }
`;
