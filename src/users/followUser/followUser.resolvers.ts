import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const user = await client.user.findUnique({
          where: { username },
        });

        if (!user) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            followings: {
              connect: {
                username,
              },
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

export default resolvers;
