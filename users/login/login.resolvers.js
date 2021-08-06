import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findBreakingChanges } from "graphql";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findFirst({
          where: { username },
        });
        if (!user) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
          return {
            ok: false,
            error: "Password Incorrect.",
          };
        }
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "Can not login try it later !",
        };
      }
    },
  },
};
