import client from "../../client";
import { protectResolver } from "../../users/utils";
import { processCategory } from "../utils";

export default {
  Mutation: {
    createCoffeeShop: protectResolver(
      async (
        _,
        { name, longitude, latitude, categoryItem },
        { loggedInUser }
      ) => {
        try {
          let categoriesObj = [];
          const existCheck = await client.coffeeShop.findFirst({
            where: { name },
            select: { name: true },
          });
          if (existCheck) {
            return {
              error: "That name has taken!",
            };
          }
          if (categoryItem) {
            categoriesObj = processCategory(categoryItem);
          }
          const ok = await client.coffeeShop.create({
            data: {
              name,
              longitude,
              latitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(categoriesObj.length > 0 && {
                categories: {
                  connectOrCreate: categoriesObj,
                },
              }),
            },
          });
          return {
            ok: true,
          };
        } catch {
          return {
            ok: false,
            error: "Can't make Coffee Shop!",
          };
        }
      }
    ),
  },
};
