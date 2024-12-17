import { AuthenticatedUserInterface } from "../../shared/types";

export class GetLearnerCredentialQuery {
    public constructor(
        public readonly credentialId: string,
        public readonly authUser: AuthenticatedUserInterface,
    ) {}
}
