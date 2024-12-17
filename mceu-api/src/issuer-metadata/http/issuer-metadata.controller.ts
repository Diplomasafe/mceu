import { Controller, Get, Req } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { CredentialIssuerMetadataBuilderService } from '../services';

@Controller('.well-known')
export class IssuerMetadataController {
    constructor(private readonly issuerMetadataBuilder: CredentialIssuerMetadataBuilderService) {}

    @Get('openid-credential-issuer')
    @Public()
    public async get() {
        return this.issuerMetadataBuilder.buildMetadata();
    }
}
