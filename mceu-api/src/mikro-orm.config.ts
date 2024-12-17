import {Options, ReflectMetadataProvider} from '@mikro-orm/core';
import {MikroOrmModuleOptions} from '@mikro-orm/nestjs/typings';

import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {Migrator} from "@mikro-orm/migrations";

const options: Options = {
    host: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    charset: process.env.DATABASE_CHARSET,
    collate: process.env.DATABASE_COLLATE,
    driver: PostgreSqlDriver,
    metadataProvider: ReflectMetadataProvider,
    extensions: [Migrator],
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    migrations: {
        tableName: 'migrations', // migrations table name
        path: './migrations/', // path to folder with migration files
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
        transactional: true, // run each migration inside transaction
        disableForeignKeys: false, // try to disable foreign_key_checks (or equivalent)
        allOrNothing: true, // run all migrations in current batch in master transaction
        emit: 'ts', // migration generation mode
    },
};

export default options;