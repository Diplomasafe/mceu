import {ClaimCredentialDto} from "../dtos";

export class ClaimCredentialCommand {
    public constructor(public readonly credentialId: string, public readonly claimData: ClaimCredentialDto, public readonly userId: string = null) {
    }
}
