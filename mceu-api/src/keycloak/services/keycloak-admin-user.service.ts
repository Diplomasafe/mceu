import {Injectable} from '@nestjs/common';
import {firstValueFrom} from "rxjs";
import {KeycloakAdminAuthService} from "./keycloak-admin-auth.service";
import {HttpService} from "@nestjs/axios";
import {KEYCLOAK_CONFIG_KEY, KeycloakConfigInterface} from "../../shared/types";
import {ConfigService} from "@nestjs/config";
import {KeycloakUserInterface, KeycloakUserRoleInterface} from "../../shared/types/keycloak";

@Injectable()
export class KeycloakAdminUserService {

    constructor(
        private readonly configService: ConfigService,
        private readonly keycloakAdminAuthService: KeycloakAdminAuthService,
        private readonly httpService: HttpService,
    ) {
    }

    /**
     *  Create user in keycloak
     *
     * @param userData
     */
    public async createUser(userData: KeycloakUserInterface): Promise<void> {
        const {authUrl, realm} = this.getConfigData();
        await firstValueFrom(
            this.httpService.post(`${authUrl}/admin/realms/${realm}/users`,
                userData,
                {
                    headers: await this.generateHeaders(),
                })
        );

    }

    /**
     *  Create user in keycloak
     *
     * @param keycloakUserId
     * @param userUpdateData
     */
    public async updateUser(keycloakUserId: string, userUpdateData: KeycloakUserInterface): Promise<void> {
        const {authUrl, realm} = this.getConfigData();
        await firstValueFrom(
            this.httpService.put(`${authUrl}/admin/realms/${realm}/users/${keycloakUserId}`,
                userUpdateData,
                {
                    headers: await this.generateHeaders(),
                })
        );

    }

    /**
     *  Get user id by id
     *
     * @param keycloakUserId
     */
    public async getUserById(keycloakUserId: string): Promise<string | null> {
        const {authUrl, realm} = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/users/${keycloakUserId}`,
                {
                    headers: await this.generateHeaders(),
                })
        );

        return response.data;
    }

    /**
     *  Get user id by  user email
     *
     * @param email
     */
    public async getUserIdByEmail(email: string): Promise<string | null> {
        const {authUrl, realm} = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/users`,
                {
                    params: {
                        email
                    },
                    headers: await this.generateHeaders(),
                })
        );

        return response.data[0].id ?? null;
    }

    /**
     * Get user r available realm roles
     *
     * @param keycloakUserId
     */
    public async getUserAvailableRoles(keycloakUserId: string): Promise<KeycloakUserRoleInterface[]> {
        const {authUrl, realm} = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/users/${keycloakUserId}/role-mappings/realm/available`,
                {
                    headers: await this.generateHeaders(),
                })
        );

        return response.data;
    }

    public async getUserRealmRoles(keycloakUserId: string): Promise<KeycloakUserRoleInterface[]> {
        const {authUrl, realm} = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/users/${keycloakUserId}/role-mappings/realm`,
                {
                    headers: await this.generateHeaders(),
                })
        );

        return response.data;
    }

    public async assignRealmRoleToUser(keycloakUserId: string, realmRoleToAssign: KeycloakUserRoleInterface): Promise<void> {
        const {authUrl, realm} = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.post(`${authUrl}/admin/realms/${realm}/users/${keycloakUserId}/role-mappings/realm`,
                [realmRoleToAssign],
                {
                    headers: await this.generateHeaders(),
                })
        );
    }

    public async deleteRealmRoleToUser(keycloakUserId: string, roleToDelete: KeycloakUserRoleInterface): Promise<void> {
        const {authUrl, realm} = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.delete(`${authUrl}/admin/realms/${realm}/users/${keycloakUserId}/role-mappings/realm`,
                {
                    data: [roleToDelete],
                    headers: await this.generateHeaders(),
                })
        );
    }

    /**
     * Get realm roles list
     */
    public async getAllRealmRoles(): Promise<KeycloakUserRoleInterface[]> {
        const {authUrl, realm} = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/roles`,
                {
                    headers: await this.generateHeaders(),
                })
        );

        return response.data;
    }

    /**
     *  Extract config data
     *
     * @private
     */
    private getConfigData() {
        return this.configService.get<KeycloakConfigInterface>(
            KEYCLOAK_CONFIG_KEY
        );

    }

    /**
     * Generate headers
     *
     * @private
     */
    private async generateHeaders() {
        const token = await this.keycloakAdminAuthService.getAdminToken();

        return {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }
}
