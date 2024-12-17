import { Module } from '@nestjs/common';
import { CredentialsController } from './http/credentials.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Credential } from './entities/credential.entity';
import { ConfigModule } from '@nestjs/config';
import { createMikroOrmRepositoryProviders } from '@mikro-orm/nestjs/mikro-orm.providers';
import {
    ClaimCredentialCommand,
    ClaimCredentialHandler,
    IssueCredentialCommand,
    IssueCredentialHandler,
    RevokeCredentialCommand,
    SendClaimingEmailCommand,
    SendClaimingEmailHandler,
    SendRevokingEmailCommand,
    SendRevokingEmailHandler,
    UpdateClaimingEmailSentAtCommand,
    UpdateClaimingEmailSentAtHandler,
} from './commands';
import {
    GetClaimCredentialDetailsHandler,
    GetClaimCredentialDetailsQuery,
    GetEmployerCredentialHandler,
    GetEmployerCredentialQuery,
    GetIssuerCredentialHandler,
    GetIssuerCredentialListHandler,
    GetIssuerCredentialListQuery,
    GetIssuerCredentialQuery,
    GetLearnerCredentialHandler,
    GetLearnerCredentialJwtQuery,
    GetLearnerCredentialListHandler,
    GetLearnerCredentialListQuery,
    GetLearnerCredentialQuery,
} from './queries';

import { CredentialSaga } from './sagas/credential.saga';
import { CredentialNotificationService } from './services';
import { PublicCredentialsController } from './http/public-credentials.controller';
import { VerifiableCredentialsModule } from './sub-modules/verifiable-credentials/verifiable-credentials.module';
import { RevokeCredentialHandler } from './commands/handlers/revoke-credential.handler';
import { LearnerCredentialsController } from './http/learner-credentials.controller';
import { IsLearnerEmailConstraint } from './constraints';
import { UserRequestsModule } from './sub-modules/user-requests/user-requests.module';
import { GetLearnerCredentialJwtHandler } from './queries/handlers/get-learner-credential-jwt.handler';

@Module({
    controllers: [PublicCredentialsController, LearnerCredentialsController, CredentialsController],
    imports: [
        CqrsModule,
        ConfigModule,
        MikroOrmModule.forFeature({
            entities: [Credential],
        }),
        VerifiableCredentialsModule,
        UserRequestsModule,
    ],
    providers: [
        ...createMikroOrmRepositoryProviders([Credential]),
        IssueCredentialCommand,
        IssueCredentialHandler,
        SendClaimingEmailCommand,
        SendClaimingEmailHandler,
        SendRevokingEmailCommand,
        SendRevokingEmailHandler,
        UpdateClaimingEmailSentAtCommand,
        UpdateClaimingEmailSentAtHandler,
        GetIssuerCredentialQuery,
        GetIssuerCredentialListQuery,
        GetIssuerCredentialHandler,
        GetIssuerCredentialListHandler,
        GetClaimCredentialDetailsQuery,
        GetClaimCredentialDetailsHandler,
        GetLearnerCredentialQuery,
        GetLearnerCredentialHandler,
        GetLearnerCredentialListQuery,
        GetLearnerCredentialListHandler,
        GetLearnerCredentialJwtQuery,
        GetLearnerCredentialJwtHandler,
        ClaimCredentialCommand,
        ClaimCredentialHandler,
        RevokeCredentialCommand,
        RevokeCredentialHandler,
        GetEmployerCredentialQuery,
        GetEmployerCredentialHandler,
        CredentialSaga,
        CredentialNotificationService,
        IsLearnerEmailConstraint,
    ],
    exports: [],
})
export class CredentialsModule {}
