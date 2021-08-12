import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { page }) =>
      client.coffeeShop.findMany({ skip: (page - 1) * 3, take: 3 }),
  },
};
