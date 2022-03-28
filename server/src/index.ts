import 'dotenv/config';
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { schema } from './Schema';
import { Users } from './Entities/Users';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';


const main = async () => {
    
    await createConnection({
        type: 'mysql',
        database: 'mdt',
        username: 'root',
        logging: true,
        synchronize: false,
        entities: [Users]
    })

    const app = express()

    const mysqlStore = require('express-mysql-session')(session);

    const options ={
        connectionLimit: 10,
        user: 'root',
        database: 'mdt',
        host: 'localhost',
        createDatabaseTable: true
        
    }
     
    const  sessionStore = new mysqlStore(options);

    let now = new Date()
    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        name: 'userid',
        secret: typeof process.env.SESSION_SECRET === 'string' ? process.env.SESSION_SECRET : '',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: new Date(now.getTime() + 24*60*60*1000)
        }
    }))
    app.use("/graphql", graphqlHTTP((req, res) => ({
        schema,
        graphiql: true,
        context: {req, res},
    })))

    app.listen(process.env.PORT, () => {
        console.log(`API running on port ${process.env.PORT}`)
    })
}

main().catch((err) => {
    console.log(err)
})