import {KEYCLOAK_CONFIG_KEY, KeycloakConfigInterface} from "../shared/types";

export default (): { keycloak: KeycloakConfigInterface} =>({
    [KEYCLOAK_CONFIG_KEY]: {
        authUrl: process.env.KEYCLOAK_URL,
        realm: process.env.KEYCLOAK_REALM,
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
        publicKey: process.env.KEYCLOAK_REALM_PUBLIC_KEY,
    }
});