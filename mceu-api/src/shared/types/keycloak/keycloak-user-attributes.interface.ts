import {IsNotEmpty, IsOptional, IsUUID} from "class-validator";

export interface KeycloakUserAttributesInterface {
    mceu_id: string;

    locale?: string[];
}
