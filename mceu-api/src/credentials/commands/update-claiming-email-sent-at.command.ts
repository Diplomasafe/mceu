import {Credential} from "../entities/credential.entity";

export class UpdateClaimingEmailSentAtCommand {
    public constructor(public readonly credential: Credential, public readonly sentDate: Date) {
    }
}
