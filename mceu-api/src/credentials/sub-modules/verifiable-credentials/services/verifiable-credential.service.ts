import { Injectable, OnModuleInit } from '@nestjs/common';
import { BuildVerifiableCredentialService } from './build-verifiable-credential.service';
import { VerifiableCredentialType } from '../../../../shared/types/credentials/verifiable-credential.type';
import { Credential } from '../../../entities/credential.entity';

@Injectable()
export class VerifiableCredentialService implements OnModuleInit {
    private vcModule: any;

    constructor(private readonly builderService: BuildVerifiableCredentialService) {}

    async onModuleInit(): Promise<void> {
        this.vcModule = await import('@cef-ebsi/verifiable-credential');
    }

    public async issueVerifiableCredential(type: VerifiableCredentialType, credential: Credential): Promise<string> {
        const { issuer, payload, options } = await this.builderService.buildVerifiableCredentialData(type, credential);

        return await this.vcModule.createVerifiableCredentialJwt(payload, issuer, options);
    }
}
