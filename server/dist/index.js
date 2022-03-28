"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Schema_1 = require("./Schema");
const Users_1 = require("./Entities/Users");
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
        type: 'mysql',
        database: 'mdt',
        username: 'root',
        logging: true,
        synchronize: false,
        entities: [Users_1.Users]
    });
    const app = (0, express_1.default)();
    const mysqlStore = require('express-mysql-session')(express_session_1.default);
    const options = {
        connectionLimit: 10,
        user: 'root',
        database: 'mdt',
        host: 'localhost',
        createDatabaseTable: true
    };
    const sessionStore = new mysqlStore(options);
    let now = new Date();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, express_session_1.default)({
        name: 'userid',
        secret: typeof process.env.SESSION_SECRET === 'string' ? process.env.SESSION_SECRET : '',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: new Date(now.getTime() + 24 * 60 * 60 * 1000)
        }
    }));
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)((req, res) => ({
        schema: Schema_1.schema,
        graphiql: true,
        context: { req, res },
    })));
    app.listen(process.env.PORT, () => {
        console.log(`API running on port ${process.env.PORT}`);
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map