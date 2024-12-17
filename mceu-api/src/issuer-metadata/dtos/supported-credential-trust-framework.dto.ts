import { IsNotEmpty, IsOptional } from 'class-validator';

export class SupportedCredentialTrustFrameworkDto {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public type: string;

    @IsOptional()
    public uri: string;
}
