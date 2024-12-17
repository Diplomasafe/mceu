import {KeycloakUserAttributesInterface} from "./keycloak-user-attributes.interface";
import {KeycloakUserCredentialsInterface} from "./keycloak-user-credentials.interface";

export interface KeycloakUserInterface {

    firstName: string;
    email: string;
    enabled: boolean
    emailVerified?: boolean
    attributes?: KeycloakUserAttributesInterface;
    credentials?: KeycloakUserCredentialsInterface[];
}
