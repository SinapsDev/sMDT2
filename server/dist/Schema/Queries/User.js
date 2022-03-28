"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_USERS = void 0;
const graphql_1 = require("graphql");
const Users_1 = require("../../Entities/Users");
const User_1 = require("../TypeDefs/User");
exports.GET_ALL_USERS = {
    type: new graphql_1.GraphQLList(User_1.UserType),
    resolve() {
        return Users_1.Users.find({});
    }
};
//# sourceMappingURL=User.js.map