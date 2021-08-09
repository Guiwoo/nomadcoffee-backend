import client from "../client";

export default {
  User: {
    totalFollowers: ({ username }) =>
      client.user.count({ where: { followings: { some: { username } } } }),
    totalFollowings: ({ username }) =>
      client.user.count({ where: { followers: { some: { username } } } }),
  },
};
