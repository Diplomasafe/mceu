import { Injectable } from '@nestjs/common';
import { VerifiableCredentialType } from '../../../../shared/types/credentials/verifiable-credential.type';
import { Credential } from '../../../entities/credential.entity';
import { VerifiableCredentialBuilderInterface } from '../types';

@Injectable()
export class BuildVerifiableCredentialService {
    constructor(private readonly builders: VerifiableCredentialBuilderInterface[]) {}

    public async buildVerifiableCredentialData(type: VerifiableCredentialType, credential: Credential) {
        const builderService = this.builders.find((builder) => builder.builderType(type));

        if (!builderService) {
            throw new Error('Unknown builder type');
        }

        return await builderService.build<any>(credential);
    }
}
