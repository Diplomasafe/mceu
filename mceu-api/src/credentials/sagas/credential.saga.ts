import { Inject, Injectable, Logger } from '@nestjs/common';
import { LOGGER } from '../../constants';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ClaimingEmailSentEvent, CredentialIssuedEvent, CredentialRevokedEvent } from '../events/';
import { SendClaimingEmailCommand, UpdateClaimingEmailSentAtCommand, SendRevokingEmailCommand } from '../commands';
import { CredentialStatus } from '../enums/credential-status.enum';

@Injectable()
export class CredentialSaga {
    public constructor(@Inject(LOGGER) private readonly logger: Logger) {}

    @Saga()
    public credentialIssued = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CredentialIssuedEvent),
            tap(({ credential }) =>
                this.logger.debug(
                    `New credential issued for ${credential.learnerName} with email ${credential.learnerMail}`,
                ),
            ),
            filter(({ credential }) => credential.status === CredentialStatus.UNCLAIMED),
            filter(({ credential }) => credential.claimMailSentAt === null),
            map(({ credential }) => new SendClaimingEmailCommand(credential)),
        );
    };

    @Saga()
    public claimingEmailSent = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(ClaimingEmailSentEvent),
            tap(({ credential, sentDate }) =>
                this.logger.debug(
                    `Claiming email for credential ${credential.id} is sent at ${sentDate.toISOString()}`,
                ),
            ),
            filter(({ credential }) => credential.claimMailSentAt === null),
            map(({ credential, sentDate }) => new UpdateClaimingEmailSentAtCommand(credential, sentDate)),
        );
    };

    @Saga()
    public credentialRevoked = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CredentialRevokedEvent),
            filter(({ credential }) => credential.status === CredentialStatus.REVOKED),
            tap(({ credential, sentDate }) =>
                this.logger.debug(
                    `Revoking email for credential ${credential.id} is sent at ${sentDate.toISOString()}`,
                ),
            ),
            map(({ credential }) => new SendRevokingEmailCommand(credential)),
        );
    };
}
