import client from "../../client";

export default {
  Query: {
    searchUser: async (_, { keyword, page }) => {
      const theUsers = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      });
      if (theUsers.length === 0) {
        return {
          User: theUsers,
          error: "Can't find any user !",
        };
      }
      return {
        User: theUsers,
      };
    },
  },
};
