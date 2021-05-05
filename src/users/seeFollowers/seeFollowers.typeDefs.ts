import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPage: Int
  }
  type Query {
    seeFollowers(username: String!, page: Int): SeeFollowersResult!
  }
`;
