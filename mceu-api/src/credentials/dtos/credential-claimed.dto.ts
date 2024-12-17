import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CredentialClaimedDto {
    @ApiProperty()
    public credentialId: string;

    @ApiPropertyOptional()
    public learnerEmail?: string;

    @ApiPropertyOptional()
    public learnerTemporaryPassword?: string;
}
