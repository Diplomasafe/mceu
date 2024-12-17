import { Inject, Injectable, Logger } from '@nestjs/common';
import { EMAIL_TEMPLATE_PATH } from '../../../../shared/mail/constants';
import { LOGGER } from '../../../../constants';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { VET_PROVIDER_CONFIG_KEY, VetProviderConfigInterface } from '../../../../shared/types';
import { IssuanceRequest, UserRequest, UserRequestsServiceType } from '../types';

@Injectable()
export class UserRequestNotificationService {
    private requestHandlers: { [key in UserRequestsServiceType]: <T>(userRequest: UserRequest<T>) => Promise<void> };

    constructor(
        @Inject(EMAIL_TEMPLATE_PATH) private readonly emailTemplateDir: string,
        @Inject(LOGGER) private readonly logger: Logger,
        private readonly mailService: MailerService,
        private readonly configService: ConfigService,
    ) {
        this.requestHandlers = {
            [UserRequestsServiceType.ISSUANCE_REQUESTS]: this.sendIssuanceRequestEmail.bind(this),
            // Add entries here for other request types if needed
        };
    }

    public async sendRequestEmail<T>(userRequest: UserRequest<T>): Promise<void> {
        const handler: Function | null = this.requestHandlers[userRequest.type];

        if (!handler) {
            this.logger.warn(`No handler found for request type: ${userRequest.type}`);
        }

        await handler(userRequest);
    }

    private async sendIssuanceRequestEmail(userRequest: UserRequest<IssuanceRequest>): Promise<void> {
        const { user, data } = userRequest;
        const { name, email } = this.configService.get<VetProviderConfigInterface>(VET_PROVIDER_CONFIG_KEY);
        const subject: string = `Credential is revoked by ${name}`;

        await this.mailService
            .sendMail({
                subject: subject,
                to: email,
                template: path.resolve(this.emailTemplateDir, 'user-requests', 'issuance-request-email'),
                context: {
                    subject,
                    vetProvider: name,
                    learnerName: user.name,
                    courseTitle: data.courseTitle,
                },
            })
            .catch((err) => {
                this.logger.error(`Error sending issuance request email`, err.stack);
            });
    }
}
