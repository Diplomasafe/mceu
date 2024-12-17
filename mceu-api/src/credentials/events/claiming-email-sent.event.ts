import {Credential} from "../entities/credential.entity";

export class ClaimingEmailSentEvent {
    public constructor(public readonly credential: Credential, public readonly sentDate: Date) {
    }
}
