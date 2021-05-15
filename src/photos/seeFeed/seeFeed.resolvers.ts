import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver(async (_, __, { client, loggedInUser }) => {
      const photo = await client.photo.findMany({
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            { userId: loggedInUser.id },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
      console.log(loggedInUser);

      console.log(photo);
      return photo;
    }),
  },
};

export default resolvers;
