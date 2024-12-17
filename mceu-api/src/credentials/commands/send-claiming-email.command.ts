import { Credential } from '../entities/credential.entity';

export class SendClaimingEmailCommand {
    public constructor(public readonly credential: Credential) {}
}
