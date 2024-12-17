import { Credential } from '../entities/credential.entity';

export class SendRevokingEmailCommand {
    public constructor(public readonly credential: Credential) {}
}
