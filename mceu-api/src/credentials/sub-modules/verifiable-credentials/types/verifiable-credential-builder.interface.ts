import { Credential } from '../../../entities/credential.entity';
import { VerifiableCredentialType } from '../../../../shared/types/credentials/verifiable-credential.type';

export interface VerifiableCredentialBuilderInterface {
    builderType(type: VerifiableCredentialType): boolean;
    build<T>(credential: Credential): Promise<{ issuer: any; payload: T; options: any }>;
}
