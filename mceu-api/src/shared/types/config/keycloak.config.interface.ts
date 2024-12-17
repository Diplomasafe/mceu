
export const KEYCLOAK_CONFIG_KEY = 'keycloak';
export interface KeycloakConfigInterface {
    authUrl: string;
    realm: string;
    clientId: string;
    clientSecret: string;
    publicKey: string;
}
