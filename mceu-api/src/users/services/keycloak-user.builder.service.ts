import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entites/user.entity';
import { UserStatus } from '../enums/user-status.enum';
import { KeycloakUserInterface } from '../../shared/types/keycloak';

@Injectable()
export class KeycloakUserBuilderService {
    /**
     * Build create keycloak user data
     *
     * @param userDto
     * @param user
     * @param randomPassword
     * @private
     */
    public buildCreateUserData(userDto: UserDto, user: User, randomPassword: string): KeycloakUserInterface {
        return {
            firstName: userDto.name,
            email: userDto.email,
            enabled: userDto.status === UserStatus.ACTIVE,
            emailVerified: true,
            attributes: {
                mceu_id: user.id,
            },
            credentials: [
                {
                    type: 'password',
                    value: randomPassword,
                    temporary: true,
                },
            ],
        };
    }

    /**
     * Build keycloak update user data
     *
     * @param userDto
     */
    public buildUpdateUserData(userDto: UserDto): KeycloakUserInterface {
        return {
            firstName: userDto.name,
            email: userDto.email,
            enabled: userDto.status === UserStatus.ACTIVE,
        };
    }
}
