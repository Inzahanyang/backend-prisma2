import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: (_, { keyword }, { client }) =>
      client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
      }),
  },
};

export default resolvers;
