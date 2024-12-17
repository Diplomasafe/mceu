import { Credential } from '../entities/credential.entity';

export class CredentialRevokedEvent {
    public constructor(
        public readonly credential: Credential,
        public readonly sentDate: Date,
    ) {}
}
