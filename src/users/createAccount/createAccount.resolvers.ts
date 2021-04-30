import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          throw new Error("This username/email is already taken");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return the user
        const user = await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });
        if (user) {
          return {
            ok: true,
          };
        }
      } catch (e) {
        return e;
      }
    },
  },
};

export default resolvers;
