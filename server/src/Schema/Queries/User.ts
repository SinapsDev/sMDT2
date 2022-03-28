import { GraphQLList } from "graphql";
import { UserInterface } from "src/interfaces/UserInterface";
import { Users } from "../../Entities/Users";
import { UserType } from "../TypeDefs/User";

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve(): Promise<UserInterface[]> {
        return Users.find({})
    }    
}