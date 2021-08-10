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
  },
  Category: {
    coffeeShops: ({ id }) =>
      client.category.findMany({
        where: {
          coffeeShops: {
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
