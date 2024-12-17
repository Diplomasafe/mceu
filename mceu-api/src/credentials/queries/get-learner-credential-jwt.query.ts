import { AuthenticatedUserInterface } from "../../shared/types";

export class GetLearnerCredentialJwtQuery {
    public constructor(
        public readonly credentialId: string,
        public readonly authUser: AuthenticatedUserInterface,
    ) {}
}
