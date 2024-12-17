import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUUID, Validate } from 'class-validator';
import { UserRealmRoles } from '../../shared/enums/auth/realm-roles.enum';
import { UserStatus } from '../enums/user-status.enum';
import { UserEmailExistsConstraint } from '../constraints';

export class UserDto {
    @IsOptional()
    @IsUUID()
    public id?: string = null;

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    public name: string;

    @ApiProperty({ example: 'john-doe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    @Validate(UserEmailExistsConstraint)
    public email: string;

    @ApiProperty({ example: UserRealmRoles.PROVIDER })
    @IsNotEmpty()
    @IsEnum(UserRealmRoles)
    public role: UserRealmRoles;

    @ApiProperty({ example: UserStatus.ACTIVE })
    @IsNotEmpty()
    @IsEnum(UserStatus)
    public status: UserStatus;

    @IsOptional()
    public temporaryPassword?: string;
}
