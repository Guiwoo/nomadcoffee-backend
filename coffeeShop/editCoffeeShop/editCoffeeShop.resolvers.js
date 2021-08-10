import client from "../../client";
import { protectResolver } from "../../users/utils";
import { processCategory } from "../utils";

export default {
  Mutation: {
    editCoffeeShop: protectResolver(
      async (
        _,
        { id, name, latitude, longitude, categoryItem },
        { loggedInUser }
      ) => {
        const oldShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
          },
        });
        console.log(oldShop);
        if (!oldShop) {
          return {
            ok: false,
            error: "YOu can not edit this photo",
          };
        }
        const exist = await client.coffeeShop.findFirst({
          where: { name },
          select: { name: true },
        });
        if (exist) {
          return {
            ok: false,
            error: "That name has taken Try other name",
          };
        }
        await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            name,
            latitude,
            longitude,
            categories: {
              disconnect: oldShop.categories,
              connect: processCategory(categoryItem),
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
