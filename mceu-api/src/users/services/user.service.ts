import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../entites/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { KeycloakUserService } from './keycloak-user.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserDto } from '../dtos/user.dto';
import { KeycloakUserCreatedInterface, UserSavedInterface } from '../types';
import { UserRealmRoles } from '../../shared/enums/auth/realm-roles.enum';
import { UserKeysService } from './user-keys.service';
import { EncryptionService } from '../../shared/services/encryption.service';

@Injectable()
export class UserService {
    private didResolverModule: any;

    constructor(
        @InjectRepository(User) private readonly userRepository: UserRepository,
        private readonly keycloakUserService: KeycloakUserService,
        private readonly userKeysService: UserKeysService,
        private readonly encryptionService: EncryptionService,
        private readonly em: EntityManager,
    ) {}

    /**
     * Get user by id
     *
     * @param keycloakUserId
     */
    public async getUserByKeycloakId(keycloakUserId: string): Promise<User> {
        return await this.userRepository.findOne({ keycloakId: keycloakUserId });
    }

    /**
     * Get learner user by email
     *
     * @param userEmail
     */
    public async getLearnerUserByEmail(userEmail: string): Promise<User | null> {
        return await this.userRepository.findOne({
            email: userEmail,
            role: UserRealmRoles.LEARNER,
        });
    }

    /**
     * Get learner user by email
     *
     * @param userEmail
     */
    public async getUserByEmail(userEmail: string): Promise<User | null> {
        return await this.userRepository.findOne({
            email: userEmail,
        });
    }

    /**
     *  Save user and create Keycloak user if needed
     *
     * @param userDto
     */
    public async saveUser(userDto: UserDto): Promise<UserSavedInterface> {
        const user: User = await this.findOrCreateUser(userDto.id);
        const isNewUser = userDto.id === null || typeof userDto.id === 'undefined';

        let keysData =
            isNewUser && userDto.role === UserRealmRoles.LEARNER ? await this.userKeysService.generateKeys() : null;

        const keycloakUserData: KeycloakUserCreatedInterface = await this.saveKeycloakUser(userDto, user);

        user.name = userDto.name;
        user.email = userDto.email;
        user.role = userDto.role;
        user.status = userDto.status;

        if (isNewUser) {
            user.keycloakId = keycloakUserData.keycloakUserId;
        }
        // if  user is new and his role is leaner we save ebsi did  and encrypted key pair
        if (isNewUser && keysData !== null && userDto.role === UserRealmRoles.LEARNER) {
            user.ebsiDid = keysData.did;
            user.ebsiDidKey = this.encryptionService.encrypt(JSON.stringify(keysData.jwkKeys));
        }

        await this.em.persistAndFlush(user);

        if (typeof keycloakUserData.randomPassword !== 'undefined') {
            return {
                user,
                temporaryPassword: keycloakUserData.randomPassword,
            };
        }

        return { user };
    }

    /**
     * Create new User or retrieve existing by id
     *
     * @param id
     * @private
     */
    private async findOrCreateUser(id: string | null = null): Promise<User> {
        if (id === null) {
            return new User();
        }

        return await this.userRepository.findOneOrFail(id);
    }

    /**
     * Save keycloak user
     *
     * @param userDto
     * @param user
     * @private
     */
    private async saveKeycloakUser(userDto: UserDto, user: User): Promise<KeycloakUserCreatedInterface> {
        if (userDto.id === null || typeof userDto.id === 'undefined') {
            return await this.keycloakUserService.createKeycloakUser(userDto, user);
        }

        return await this.keycloakUserService.updateKeycloakUser(userDto, user);
    }
}
