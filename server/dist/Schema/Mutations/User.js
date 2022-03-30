"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGGED_USER = exports.LOGIN_USER = exports.CREATE_USER = void 0;
const graphql_1 = require("graphql");
const Users_1 = require("../../Entities/Users");
const User_1 = require("../TypeDefs/User");
const bcrypt = __importStar(require("bcrypt"));
const checkBasicForm_1 = require("../../Middlewares/checkBasicForm");
exports.CREATE_USER = {
    type: User_1.UserType,
    args: {
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, first_name, last_name } = args;
            const hashedPassword = yield bcrypt.hash(password, 10);
            const existingUser = yield Users_1.Users.findOne({ where: { username } });
            const invalidError = (0, checkBasicForm_1.checkBasicForm)(args);
            if (invalidError) {
                return invalidError;
            }
            if (existingUser) {
                return {
                    error: "User Already existing",
                };
            }
            const registeredUser = yield Users_1.Users.insert({
                username,
                password: hashedPassword,
                first_name,
                last_name,
            });
            req.session.userid = registeredUser.generatedMaps[0].id;
            return { type: "success", username, first_name, last_name };
        });
    },
};
exports.LOGIN_USER = {
    type: User_1.UserType,
    args: {
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = args;
            const user = yield Users_1.Users.findOne({ where: { username } });
            if (!user) {
                return {
                    error: "Username does not exist.",
                };
            }
            else {
                const validPass = yield bcrypt.compare(password, user.password);
                if (validPass) {
                    user.password = "";
                    req.session.userid = user.id;
                    return user;
                }
                else {
                    return {
                        error: "Wrong password.",
                    };
                }
            }
        });
    },
};
exports.LOGGED_USER = {
    type: User_1.UserType,
    args: {},
    resolve(parent, args, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userid) {
                const user = yield Users_1.Users.findOne({ where: { id: req.session.userid } });
                return user;
            }
            return null;
        });
    },
};
//# sourceMappingURL=User.js.map