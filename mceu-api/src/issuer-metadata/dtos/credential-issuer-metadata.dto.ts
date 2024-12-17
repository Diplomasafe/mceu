import { IsNotEmpty, IsOptional } from 'class-validator';
import { DisplayDto } from './display.dto';
import { SupportedCredentialDto } from './supported-credential.dto';

export class CredentialIssuerMetadataDto {
    @IsOptional()
    public authorization_server: string;

    @IsNotEmpty()
    public credential_issuer: string;

    @IsNotEmpty()
    public credential_endpoint: string;

    @IsNotEmpty()
    public deferred_credential_endpoint: string;

    @IsOptional()
    public display: DisplayDto;

    @IsNotEmpty()
    public credentials_supported: SupportedCredentialDto[];
}
