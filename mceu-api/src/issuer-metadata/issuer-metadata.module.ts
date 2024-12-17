import { Module } from '@nestjs/common';
import { IssuerMetadataController } from './http/issuer-metadata.controller';
import { CredentialIssuerMetadataBuilderService } from './services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    APP_CONFIG_KEY,
    AppConfigInterface,
    EBSI_CONFIG_KEY,
    EbsiConfigInterface,
    KEYCLOAK_CONFIG_KEY,
    KeycloakConfigInterface,
} from '../shared/types';

@Module({
    imports: [ConfigModule],
    controllers: [IssuerMetadataController],
    providers: [
        {
            provide: KEYCLOAK_CONFIG_KEY,
            inject: [ConfigService],
            useFactory: (configService: ConfigService): KeycloakConfigInterface =>
                configService.get<KeycloakConfigInterface>(KEYCLOAK_CONFIG_KEY),
        },
        {
            provide: APP_CONFIG_KEY,
            inject: [ConfigService],
            useFactory: (configService: ConfigService): AppConfigInterface =>
                configService.get<AppConfigInterface>(APP_CONFIG_KEY),
        },
        {
            provide: EBSI_CONFIG_KEY,
            inject: [ConfigService],
            useFactory: (configService: ConfigService): EbsiConfigInterface =>
                configService.get<EbsiConfigInterface>(EBSI_CONFIG_KEY),
        },
        CredentialIssuerMetadataBuilderService,
    ],
})
export class IssuerMetadataModule {}
