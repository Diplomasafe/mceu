
export const DATABASE_CONFIG_KEY = 'database';
export interface DatabaseConfigInterface {
    dbName: string;
    host: string;
    port: number;
    user: string;
    password: string;
    charset: string;
    collate: string;
}
