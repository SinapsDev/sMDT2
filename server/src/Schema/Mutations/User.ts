import { GraphQLString } from "graphql";
import { Users } from "../../Entities/Users";
import { UserInterface } from "../../interfaces/UserInterface";
import { UserType } from "../TypeDefs/User";
import * as bcrypt from 'bcrypt';
import { checkBasicForm } from "../../Middlewares/checkBasicForm";
import { MyContext } from "src/interfaces/MyContext";

export const CREATE_USER = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
    },
    async resolve(parent: any, args: UserInterface, { req }: MyContext) {
        const {username, password, first_name, last_name} = args
        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await Users.findOne({where: {username}})
        const invalidError = checkBasicForm(args)

        if (invalidError) {
            return invalidError
        }

        if (existingUser) {
            return {
                error: 'User Already existing'
            }
        }
        
        const registeredUser = await Users.insert({username, password: hashedPassword, first_name, last_name})
        req.session.userid = registeredUser.generatedMaps[0].id
        return {type: 'success', username, first_name, last_name}
    }
}

export const LOGIN_USER = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent: any, args: UserInterface, {req}: MyContext) {
        const {username, password} = args
        const user = await Users.findOne({where: {username}})
        if (!user){
            return {
                error: 'Username does not exist.'
            }
        } else {
            const validPass = await bcrypt.compare(password, user.password)
            if (validPass) {
                user.password = ''
                req.session.userid = user.id
                return user
            } else {
                return {
                    error: 'Wrong password.'
                }
            }
        }
    }
} 

export const LOGGED_USER = {
    type: UserType,
    args: {},
    async resolve(parent: any, args:any, {req}: MyContext) {
        if (req.session.userid) {
            const user = await Users.findOne({ where: {id: req.session.userid}})
            return user
        }

        return null
    }
}