import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      file: Upload!
      longitude: String!
      categoryItem: String
    ): MutationResult!
  }
`;
