import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    file: String!
    latitude: String!
    longitude: String!
    user: User!
    categories(page: Int): [Category]
    photos(page: Int): [CoffeeShopPhoto]
  }
  type Category {
    id: Int!
    name: String!
    slug: String
    totalShops: Int!
    coffeeShops: [CoffeeShop]
  }
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: [CoffeeShop]
  }
`;
