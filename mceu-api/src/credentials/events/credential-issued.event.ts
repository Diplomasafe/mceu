import {Credential} from "../entities/credential.entity";

export class CredentialIssuedEvent {
    public constructor(public readonly credential: Credential) {
    }
}
