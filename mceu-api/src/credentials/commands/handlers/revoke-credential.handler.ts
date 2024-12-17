import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CredentialRepository } from '../../repositories/credential.repository';
import { Credential } from '../../entities/credential.entity';
import { CredentialStatus } from '../../enums/credential-status.enum';
import { RevokeCredentialCommand } from '../revoke-credential.command';

@CommandHandler(RevokeCredentialCommand)
export class RevokeCredentialHandler implements ICommandHandler<RevokeCredentialCommand> {
    constructor(
        @InjectRepository(Credential) private readonly credentialRepository: CredentialRepository,
        private readonly em: EntityManager,
    ) {}

    public async execute(command: RevokeCredentialCommand): Promise<Credential> {
        const { credentialId } = command;

        const credential = await this.credentialRepository.findOneOrFail({
            id: credentialId,
            status: { $ne: CredentialStatus.REVOKED },
        });

        credential.status = CredentialStatus.REVOKED;

        await this.em.persistAndFlush(credential);

        return credential;
    }
}
