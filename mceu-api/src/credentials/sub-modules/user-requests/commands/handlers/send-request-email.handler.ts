import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendRequestEmailCommand } from '../send-request-email.command';
import { UserRequestNotificationService } from '../../services/user-request-notification.service';

@CommandHandler(SendRequestEmailCommand)
export class SendRequestEmailHandlear<T> implements ICommandHandler<SendRequestEmailCommand<T>> {
    constructor(private readonly userRequestNotificationService: UserRequestNotificationService) {}

    public async execute(command: SendRequestEmailCommand<T>): Promise<void> {
        const { requestData } = command;

        await this.userRequestNotificationService.sendRequestEmail(requestData);
    }
}
