import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password, name, location }) => {
      try {
        const theUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (theUser) {
          return {
            error: "That username or Email has taken!",
          };
        }
        const purePassword = await bcrypt.hash(password, 5);
        const user = await client.user.create({
          data: {
            username,
            password: purePassword,
            email,
            name,
            location,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: `Can not create Account ${e}`,
        };
      }
    },
  },
};
