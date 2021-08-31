import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { page }) =>
      client.coffeeShop.findMany({
        skip: page,
        take: 2,
        orderBy: {
          id: "desc",
        },
      }),
  },
};
