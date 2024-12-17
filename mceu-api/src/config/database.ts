import {DATABASE_CONFIG_KEY, DatabaseConfigInterface} from "../shared/types";

export default (): { database: DatabaseConfigInterface } => ({
    [DATABASE_CONFIG_KEY]: {
        dbName: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        collate: process.env.DATABASE_COLLATE,
        charset: process.env.DATABASE_CHARSET,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT),
        host: process.env.DATABASE_HOST,
    },
});