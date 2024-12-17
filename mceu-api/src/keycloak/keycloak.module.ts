import {Global, Module, Provider} from '@nestjs/common';
import {
    AuthGuard,
    KeycloakConnectModule,
    PolicyEnforcementMode,
    ResourceGuard,
    RoleGuard,
    TokenValidation
} from "nest-keycloak-connect";

import {ConfigModule, ConfigService} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {KEYCLOAK_CONFIG_KEY, KeycloakConfigInterface} from "../shared/types";
import {KeycloakAdminAuthService} from './services/keycloak-admin-auth.service';
import {HttpModule} from "@nestjs/axios";
import {KeycloakAdminUserService} from './services/keycloak-admin-user.service';

const sharedProviders: Provider[] = [

    KeycloakAdminUserService
];

const providers: Provider[] = [
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },
    {
        provide: APP_GUARD,
        useClass: ResourceGuard,
    },
    {
        provide: APP_GUARD,
        useClass: RoleGuard,
    },
];

@Global()
@Module({
    imports: [
        HttpModule,
        ConfigModule,
        KeycloakConnectModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): any => {
                const keycloakConfig: KeycloakConfigInterface = config.get<KeycloakConfigInterface>(KEYCLOAK_CONFIG_KEY);
                return {
                    authServerUrl: keycloakConfig.authUrl,
                    realm: keycloakConfig.realm,
                    clientId: keycloakConfig.clientId,
                    secret: keycloakConfig.clientSecret,
                    realmPublicKey: keycloakConfig.publicKey,
                    policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
                    tokenValidation: TokenValidation.ONLINE,

                };
            }
        })
    ],
    providers: [...providers, ...sharedProviders, KeycloakAdminAuthService],
    exports: [...sharedProviders]
})
export class KeycloakModule {
}
