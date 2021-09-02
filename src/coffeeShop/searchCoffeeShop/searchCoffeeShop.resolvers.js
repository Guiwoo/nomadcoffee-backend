import client from "../../client";

export default {
  Query: {
    searchCoffeeShop: async (_, { keyword, page }) => {
      const theShop = await client.coffeeShop.findMany({
        where: {
          name: {
            contains: keyword.toLowerCase(),
          },
        },
        take: 4,
        skip: (page - 1) * 4,
      });
      const theCategory = await client.category.findMany({
        where: {
          name: {
            contains: keyword.toLowerCase(),
          },
        },
        take: 4,
        skip: (page - 1) * 4,
      });
      if (theShop.length === 0 && theCategory.length === 0) {
        return {
          CoffeeShop: theShop,
          type: "None",
          error: "Can't find anythings !",
        };
      }
      if (theShop.length > 0) {
        return {
          CoffeeShop: theShop,
          type: "shop",
        };
      } else {
        return {
          Category: theCategory,
          type: "category",
        };
      }
    },
  },
};
