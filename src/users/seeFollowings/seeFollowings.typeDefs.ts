import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowingsResults {
    ok: Boolean!
    error: String
    followings: [User]
  }

  type Query {
    seeFollowings(username: String!, lastId: Int): SeeFollowingsResults!
  }
`;
