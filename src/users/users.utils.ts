import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const verifyToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifyToken) {
      const user = await client.user.findUnique({
        where: { id: verifyToken["id"] },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please login to perform this action",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
