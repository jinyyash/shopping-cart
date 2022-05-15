import { GraphQLString, GraphQLID } from "graphql";
import { Users } from "../../../db/Entities/User";
import { UserType } from "../../../typeDef";
import { MessageType } from "../../../typeDef/messageType";

export const CREATE_USER = {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
      const { name, username, password } = args;
      await Users.insert({ name, username, password });
      return args;
    },
  };
  
  export const UPDATE_PASSWORD = {
    type: MessageType,
    args: {
      username: { type: GraphQLString },
      oldPassword: { type: GraphQLString },
      newPassword: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
      const { username, oldPassword, newPassword } = args;
      const user = await Users.findOne({ where:username });
  
      if (!user) {
        throw new Error("USERNAME DOESNT EXIST");
      }
      const userPassword = user?.password;
  
      if (oldPassword === userPassword) {
        await Users.update({ username: username }, { password: newPassword });
  
        return { successful: true, message: "PASSWORD UPDATED" };
      } else {
        throw new Error("PASSWORDS DO NOT MATCH!");
      }
    },
  };
  
  export const DELETE_USER = {
    type: MessageType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
      const id = args.id;
      await Users.delete(id);
  
      return { successful: true, message: "DELETE WORKED" };
    },
  };
