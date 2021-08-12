import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Can't find user!",
        };
      }
      const aFollowers = await client.user
        .findUnique({
          where: { username },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      const totalFollowers = await client.user.count({
        where: { followings: { some: { username } } },
      });
      return {
        ok: true,
        afollowers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
