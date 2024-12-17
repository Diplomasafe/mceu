import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entites/user.entity';
import { generateSecurePassword } from '../helpers';

import { KeycloakAdminUserService } from '../../keycloak/services/keycloak-admin-user.service';
import { KeycloakUserCreatedInterface } from '../types/';
import { KeycloakUserBuilderService } from './keycloak-user.builder.service';
import { KeycloakUserInterface, KeycloakUserRoleInterface } from '../../shared/types/keycloak';
import { UserRealmRoles } from '../../shared/enums/auth/realm-roles.enum';

@Injectable()
export class KeycloakUserService {
    public constructor(
        private readonly keycloakAdminUserService: KeycloakAdminUserService,
        private readonly keycloakUserBuilderService: KeycloakUserBuilderService,
    ) {}

    /**
     * Create new user in keycloak
     * @param userDto
     * @param user
     */
    public async createKeycloakUser(userDto: UserDto, user: User): Promise<KeycloakUserCreatedInterface> {
        const randomPassword = generateSecurePassword();

        const userData: KeycloakUserInterface = this.keycloakUserBuilderService.buildCreateUserData(
            userDto,
            user,
            randomPassword,
        );

        await this.keycloakAdminUserService.createUser(userData);

        const keycloakUserId = await this.keycloakAdminUserService.getUserIdByEmail(userDto.email);
        const realmRole: KeycloakUserRoleInterface = await this.getKeycloakAvailableRealmRole(
            keycloakUserId,
            userDto.role,
        );

        await this.keycloakAdminUserService.assignRealmRoleToUser(keycloakUserId, realmRole);

        return {
            keycloakUserId,
            randomPassword,
        };
    }

    /**
     * Update keycloak user data
     *
     * @param userDto
     * @param user
     */
    public async updateKeycloakUser(userDto: UserDto, user: User): Promise<KeycloakUserCreatedInterface> {
        //get user current and new role
        const keycloakAllRoles = await this.keycloakAdminUserService.getAllRealmRoles();
        const keycloakUserRoles = await this.keycloakAdminUserService.getUserRealmRoles(user.keycloakId);
        const currentRole = keycloakUserRoles.find((role) =>
            Object.values(UserRealmRoles).includes(role.name as UserRealmRoles),
        );

        //update user role
        if (currentRole.name !== userDto.role) {
            const roleToAssign = keycloakAllRoles.find((role) => role.name === userDto.role);
            const roleToRemove = keycloakAllRoles.find((role) => role.name === currentRole.name);

            await this.keycloakAdminUserService.assignRealmRoleToUser(user.keycloakId, roleToAssign);
            await this.keycloakAdminUserService.deleteRealmRoleToUser(user.keycloakId, roleToRemove);
        }

        //update user data
        const userData: KeycloakUserInterface = this.keycloakUserBuilderService.buildUpdateUserData(userDto);
        await this.keycloakAdminUserService.updateUser(user.keycloakId, userData);

        return { keycloakUserId: user.keycloakId };
    }

    /**
     * Get Keycloak user role
     *
     * @param keycloakUserId
     * @param userRole
     * @private
     */
    private async getKeycloakAvailableRealmRole(keycloakUserId: string, userRole: string) {
        const userAvailableRoles: KeycloakUserRoleInterface[] =
            await this.keycloakAdminUserService.getUserAvailableRoles(keycloakUserId);

        return userAvailableRoles.find((role) => role.name === userRole);
    }
}
