import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ClaimCredentialDto {
    @ApiProperty({ example: '49adaa4fab89b6a823e24f35f89c89a3' })
    @IsNotEmpty()
    public hash: string;
}
