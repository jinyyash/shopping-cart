import { GraphQLList } from "graphql";
import { Users } from "../../../db/Entities/User";
import { UserType } from "../../../typeDef";

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve() {
      return Users.find();
    },
  };