import { Global, Module, Provider } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    APP_CONFIG_KEY,
    AppConfigInterface,
    DATABASE_CONFIG_KEY,
    DatabaseConfigInterface,
    MAIL_CONFIG_KEY,
    MailConfigInterface,
} from './types';
import { ENVIRONMENT_PRODUCTION } from '../constants';
import mikroConfig from '../mikro-orm.config';
import { PaginationBuilderService } from './services/pagination.builder.service';
import { MailModule } from './mail/mail.module';
import { EMAIL_TEMPLATE_PATH } from './mail/constants';
import { LoggerModule } from './logger/logger.module';
import { EncryptionService } from './services/encryption.service';

const sharedProviders: Provider[] = [
    PaginationBuilderService,
    {
        provide: EMAIL_TEMPLATE_PATH,
        inject: [ConfigService],
        useFactory: (config: ConfigService): string => config.get<MailConfigInterface>(MAIL_CONFIG_KEY).template.dir,
    },
    EncryptionService,
];

@Global()
@Module({
    imports: [
        ConfigModule,
        MikroOrmModule.forRootAsync({
            providers: [],
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): any => {
                const dbConfig: DatabaseConfigInterface = config.get<DatabaseConfigInterface>(DATABASE_CONFIG_KEY);
                const appConfig: AppConfigInterface = config.get<AppConfigInterface>(APP_CONFIG_KEY);

                return {
                    ...mikroConfig, // Spread the base config
                    host: dbConfig.host || mikroConfig.host,
                    dbName: dbConfig.dbName || mikroConfig.dbName,
                    user: dbConfig.user || mikroConfig.user,
                    password: dbConfig.password || mikroConfig.password,
                    port: dbConfig.port || mikroConfig.port,
                    charset: dbConfig.charset || mikroConfig.charset,
                    collate: dbConfig.collate || mikroConfig.collate,
                    debug: appConfig.environment !== ENVIRONMENT_PRODUCTION,
                    discovery: {
                        requireEntitiesArray: false,
                    },
                    entities: mikroConfig.entities, // Use the existing entity setup
                };
            },
        }),
        MailModule,
        LoggerModule,
    ],
    providers: [...sharedProviders],
    exports: [...sharedProviders],
})
export class SharedModule {}
