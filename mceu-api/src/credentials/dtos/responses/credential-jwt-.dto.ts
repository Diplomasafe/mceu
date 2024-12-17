import { ApiProperty } from '@nestjs/swagger';

export class CredentialJwtDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    vcToken: string | null;
}
