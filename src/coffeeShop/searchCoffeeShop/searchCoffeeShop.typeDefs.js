import { gql } from "apollo-server-core";

export default gql`
  type TheResult {
    CoffeeShop: [CoffeeShop]!
    error: String
  }
  type Query {
    searchCoffeeShop(keyword: String!, page: Int!): TheResult!
  }
`;
