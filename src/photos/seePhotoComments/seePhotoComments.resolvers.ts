import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: (_, { id }, { client }) =>
      client.photo
        .findUnique({
          where: {
            id,
          },
        })
        .comments(),
  },
};

export default resolvers;
