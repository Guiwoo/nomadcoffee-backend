import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protectResolver } from "../utils";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { username, email, password: brandNew, name, location },
        { loggedInUser, protectResolver }
      ) => {
        let hashedPassword = null;
        const updated = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            location,
            ...(hashedPassword && { password: hashedPassword }),
          },
        });
        if (updated.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Can not update your porfile!",
          };
        }
      }
    ),
  },
};
