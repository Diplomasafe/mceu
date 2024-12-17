import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClaimCredentialCommand } from '../claim-credential.command';
import { UserService } from '../../../users/services/user.service';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CredentialRepository } from '../../repositories/credential.repository';
import { Credential } from '../../entities/credential.entity';
import { CredentialStatus } from '../../enums/credential-status.enum';
import { UserSavedInterface } from '../../../users/types';
import { UserDto } from '../../../users/dtos/user.dto';
import { UserRealmRoles } from '../../../shared/enums/auth/realm-roles.enum';
import { UserStatus } from '../../../users/enums/user-status.enum';
import { User } from '../../../users/entites/user.entity';
import { CredentialClaimedDto } from '../../dtos';
import { VerifiableCredentialService } from '../../sub-modules/verifiable-credentials/services';
import { VerifiableCredentialType } from '../../../shared/types/credentials/verifiable-credential.type';

@CommandHandler(ClaimCredentialCommand)
export class ClaimCredentialHandler implements ICommandHandler<ClaimCredentialCommand> {
    constructor(
        @InjectRepository(Credential) private readonly credentialRepository: CredentialRepository,
        private readonly userService: UserService,
        private readonly em: EntityManager,
        private readonly vcService: VerifiableCredentialService,
    ) {}

    public async execute(command: ClaimCredentialCommand): Promise<CredentialClaimedDto> {
        const { credentialId, claimData, userId } = command;

        const credential = await this.credentialRepository.findOneOrFail({
            id: credentialId,
            hash: claimData.hash,
            status: CredentialStatus.UNCLAIMED,
        });

        let newUser: UserSavedInterface | null = null;

        const learner: User | null = await this.userService.getLearnerUserByEmail(credential.learnerMail);

        if (userId === null && learner === null) {
            newUser = await this.createLearner(credential);
        }

        const existingLearner =
            userId === null && learner !== null ? learner : await this.userService.getUserByKeycloakId(userId);

        const user: User = newUser !== null ? newUser.user : existingLearner;

        credential.setOwner(user);
        credential.status = CredentialStatus.CLAIMED;

        // Issue verifiable credential
        credential.vcToken = await this.vcService.issueVerifiableCredential(
            VerifiableCredentialType.VERIFIABLE_ATTESTATION,
            credential,
        );

        await this.em.persistAndFlush(credential);

        if (newUser !== null) {
            return {
                credentialId: credential.id,
                learnerEmail: newUser.user.email,
                learnerTemporaryPassword: newUser.temporaryPassword,
            };
        }

        return {
            credentialId: credential.id,
        };
    }

    private async createLearner(credential: Credential): Promise<UserSavedInterface> {
        const newUser: UserDto = {
            name: credential.learnerName,
            email: credential.learnerMail,
            role: UserRealmRoles.LEARNER,
            status: UserStatus.ACTIVE,
        };

        return await this.userService.saveUser(newUser);
    }
}
