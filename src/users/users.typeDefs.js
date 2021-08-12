import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    name: String!
    location: String!
    avatarURL: String
    githubUsername: String
    followings: [User]
    followers: [User]
    totalFollowers: Int!
    totalFollowings: Int!
    coffeeShops: [CoffeeShop]
  }
`;
