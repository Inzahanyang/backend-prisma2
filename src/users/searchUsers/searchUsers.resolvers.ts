import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }, { client }) =>
      client.user.findMany({
        where: { username: { startsWith: keyword.toLowerCase() } },
      }),
  },
};

export default resolvers;
