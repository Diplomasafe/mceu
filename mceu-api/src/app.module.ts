import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { app, database, ebsi, keycloak, logger, mail, vetProvider } from './config';
import { UsersModule } from './users/users.module';
import { HealthCheckModule } from './shared/health-check/health-check.module';
import { TerminusModule } from '@nestjs/terminus';
import { KeycloakModule } from './keycloak/keycloak.module';
import { HttpModule } from '@nestjs/axios';
import { VetProviderModule } from './vet-provider/vet-provider.module';
import { CredentialsModule } from './credentials/credentials.module';
import { IssuerMetadataModule } from './issuer-metadata/issuer-metadata.module';

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            load: [app, database, keycloak, vetProvider, mail, logger, ebsi],
        }),
        SharedModule,
        KeycloakModule,
        HealthCheckModule,
        TerminusModule,
        UsersModule,
        VetProviderModule,
        CredentialsModule,
        IssuerMetadataModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
