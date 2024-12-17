import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SendClaimingEmailCommand } from '../send-claiming-email.command';
import { CredentialNotificationService } from '../../services';
import { ClaimingEmailSentEvent } from '../../events';

@CommandHandler(SendClaimingEmailCommand)
export class SendClaimingEmailHandler implements ICommandHandler<SendClaimingEmailCommand> {
    constructor(
        private readonly credentialNotificationService: CredentialNotificationService,
        private readonly eventBus: EventBus,
    ) {}

    public async execute(command: SendClaimingEmailCommand): Promise<void> {
        const { credential } = command;
        await this.credentialNotificationService.sendSendClaimingEmail(credential);

        this.eventBus.publish(new ClaimingEmailSentEvent(credential, new Date()));
    }
}
