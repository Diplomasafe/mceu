import { Inject, Injectable, Logger } from '@nestjs/common';
import { LOGGER } from '../../../../constants';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { UserRequestEvent } from '../events';
import { map, tap } from 'rxjs/operators';
import { SendRequestEmailCommand } from '../commands/send-request-email.command';

@Injectable()
export class UserRequestsSaga {
    public constructor(@Inject(LOGGER) private readonly logger: Logger) {}

    @Saga()
    public UserRequests = <T>(events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserRequestEvent<T>),
            tap(({ requestData: { type } }) =>
                this.logger.debug(`${type} request email is sent at ${new Date().toISOString()}}`),
            ),
            map((event) => new SendRequestEmailCommand(event.requestData)),
        );
    };
}
