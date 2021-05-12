import client from "../client";

export default {
  User: {
    totalFollowings: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),

    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
      }),

    isMe: ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const existUser = await client.user.count({
        where: {
          username: loggedInUser.username,
          followings: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(existUser);
    },

    photos: ({ id }) =>
      client.user
        .findUnique({
          where: {
            id,
          },
        })
        .Photo(),
  },
};
