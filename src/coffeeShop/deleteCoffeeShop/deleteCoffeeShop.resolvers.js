import client from "../../client";
import { protectResolver } from "../../users/utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectResolver(async (_, { id }, { loggedInUser }) => {
      const coffeeShop = client.coffeeShop.findUnique({ where: { id } });
      if (!coffeeShop) {
        return {
          ok: false,
          error: "Coffee Shop not found!",
        };
      }
      await client.coffeeShop.delete({
        where: { id },
      });
      return {
        ok: true,
      };
    }),
  },
};
