import { Module } from '@nestjs/common';
import { UserRequestsController } from './http/user-requests.controller';
import { UserRequestsSaga } from './sagas/user-requests.saga';
import { RequestsFactory } from './factories/requests.factory';
import {
    SendRequestEmailCommand,
    SendRequestEmailHandlear,
    UserRequestsCommand,
    UserRequestsHandler,
} from './commands';
import { IssuanceRequestsService } from './services/requests';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRequestNotificationService } from './services/user-request-notification.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [UserRequestsController],
    imports: [CqrsModule, ConfigModule],
    providers: [
        UserRequestsSaga,
        UserRequestsCommand,
        UserRequestsHandler,
        SendRequestEmailCommand,
        SendRequestEmailHandlear,
        UserRequestNotificationService,
        IssuanceRequestsService,
        {
            provide: RequestsFactory,
            useFactory: (issuanceRequestsService: IssuanceRequestsService) =>
                new RequestsFactory([issuanceRequestsService]),
            inject: [IssuanceRequestsService],
        },
    ],
    exports: [],
})
export class UserRequestsModule {}
