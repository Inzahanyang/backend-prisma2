import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowings: async (_, { username, lastId }, { client }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }

      const followings = await client.user
        .findUnique({ where: { username } })
        .followings({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        followings,
      };
    },
  },
};

export default resolvers;
