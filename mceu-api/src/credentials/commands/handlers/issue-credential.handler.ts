import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IssueCredentialCommand } from '../issue-credential.command';
import { Credential } from '../../entities/credential.entity';
import { EntityManager } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { VET_PROVIDER_CONFIG_KEY, VetProviderConfigInterface } from 'src/shared/types';
import * as crypto from 'crypto-js';

@CommandHandler(IssueCredentialCommand)
export class IssueCredentialHandler implements ICommandHandler<IssueCredentialCommand> {
    public constructor(
        private configService: ConfigService,
        private readonly em: EntityManager,
    ) {}

    public async execute(command: IssueCredentialCommand): Promise<Credential> {
        const { issueCredentialDto } = command;
        const vetProvider = this.configService.get<VetProviderConfigInterface>(VET_PROVIDER_CONFIG_KEY);

        // Map the DTO to an entity
        const credential = new Credential();

        credential.issuerName = vetProvider.name;
        credential.learnerName = issueCredentialDto.learnerName;
        credential.learnerMail = issueCredentialDto.learnerMail;
        credential.title = issueCredentialDto.title;
        credential.issueDate = issueCredentialDto.issueDate;
        credential.country = issueCredentialDto.country;
        credential.criteria = issueCredentialDto.criteria;
        credential.credits = issueCredentialDto.credits;
        credential.level = issueCredentialDto.level;
        credential.assessmentType = issueCredentialDto.assessmentType;
        credential.participationForm = issueCredentialDto.participationForm;
        credential.verifiedBy = issueCredentialDto.verifiedBy;
        credential.hash = crypto.MD5(`${new Date()}-${credential.id}`).toString();

        // Save the credential
        await this.em.persistAndFlush(credential);

        return credential;
    }
}
