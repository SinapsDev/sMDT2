import {GraphQLObjectType, GraphQLID, GraphQLString} from 'graphql';

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        error: { type:  GraphQLString}
    })
})