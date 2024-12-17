import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendRevokingEmailCommand } from '../send-revoking-email.command';
import { CredentialNotificationService } from '../../services';

@CommandHandler(SendRevokingEmailCommand)
export class SendRevokingEmailHandler implements ICommandHandler<SendRevokingEmailCommand> {
    constructor(private readonly credentialNotificationService: CredentialNotificationService) {}

    public async execute(command: SendRevokingEmailCommand): Promise<void> {
        const { credential } = command;
        await this.credentialNotificationService.sendRevokingEmail(credential);
    }
}
