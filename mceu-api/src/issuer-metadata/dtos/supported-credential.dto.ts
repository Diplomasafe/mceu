import { IsNotEmpty, IsOptional } from 'class-validator';
import { SupportedCredentialTrustFrameworkDto } from './supported-credential-trust-framework.dto';
import { DisplayDto } from './display.dto';

export class SupportedCredentialDto {
    @IsNotEmpty()
    public format: string;

    @IsNotEmpty()
    public types: string[];

    @IsOptional()
    public trust_framework: SupportedCredentialTrustFrameworkDto;

    @IsOptional()
    public display: DisplayDto;
}
