import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
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
      const followings = await client.user
        .findUnique({
          where: { username },
        })
        .followings({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: ture,
      };
    },
  },
};
