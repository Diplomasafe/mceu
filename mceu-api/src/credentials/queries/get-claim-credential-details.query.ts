import { AuthenticatedUserInterface } from '../../shared/types';

export class GetClaimCredentialDetailsQuery {
    constructor(
        public readonly credentialId: string,
        public readonly credentialHash: string,
        public readonly authUser: AuthenticatedUserInterface | null,
    ) {

    }
}
