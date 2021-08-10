import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { page }) =>
      await client.coffeeShop.findMany({ skip: (page - 1) * 3, take: 3 }),
  },
};
