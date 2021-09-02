import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    categories: ({ id }) =>
      client.category.findMany({
        where: {
          coffeeShops: {
            some: {
              id,
            },
          },
        },
      }),
    photos: ({ id }, { page }) =>
      client.coffeeShop
        .findUnique({ where: { id } })
        .CoffeeShopPhoto({ tkae: 3, skip: (page - 1) * 3 }),
  },
  Category: {
    coffeeShops: ({ id }) =>
      client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
    totalShops: ({ name }) => {
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              name,
            },
          },
        },
      });
    },
  },
};
