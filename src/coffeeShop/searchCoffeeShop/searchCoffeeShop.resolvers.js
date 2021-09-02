import client from "../../client";

export default {
  Query: {
    searchCoffeeShop: async (_, { keyword, page }) => {
      const theShop = await client.coffeeShop.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
        take: 4,
        skip: (page - 1) * 4,
      });
      const theCategory = await client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              name: {
                contains: keyword,
              },
            },
          },
        },
        take: 4,
        skip: (page - 1) * 4,
      });
      if (theShop.length === 0 && theCategory.length === 0) {
        return {
          CoffeeShop: [...theShop, ...theCategory],
          error: "Can not find anythins!",
        };
      }
      return {
        CoffeeShop: [...theShop, ...theCategory],
      };
    },
  },
};
