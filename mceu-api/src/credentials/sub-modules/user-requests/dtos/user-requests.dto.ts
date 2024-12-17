import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { UserRequestsServiceType } from '../types';

export class UserRequestsDto {
    @ApiProperty({ example: 'issuance' })
    @IsNotEmpty()
    public type: UserRequestsServiceType;

    @ApiProperty({ example: 'name' })
    @IsNotEmptyObject()
    public data: object;
}
