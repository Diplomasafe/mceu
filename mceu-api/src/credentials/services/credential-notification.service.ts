import { Inject, Injectable, Logger } from '@nestjs/common';
import { EMAIL_TEMPLATE_PATH } from '../../shared/mail/constants';
import { LOGGER } from '../../constants';
import { MailerService } from '@nestjs-modules/mailer';
import { Credential } from '../entities/credential.entity';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import {
    APP_CONFIG_KEY,
    AppConfigInterface,
    VET_PROVIDER_CONFIG_KEY,
    VetProviderConfigInterface,
} from '../../shared/types';

@Injectable()
export class CredentialNotificationService {
    constructor(
        @Inject(EMAIL_TEMPLATE_PATH) private readonly emailTemplateDir: string,
        @Inject(LOGGER) private readonly logger: Logger,
        private readonly mailService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    public async sendSendClaimingEmail(credential: Credential) {
        const { name } = this.configService.get<VetProviderConfigInterface>(VET_PROVIDER_CONFIG_KEY);
        const { learnerAppUrl } = this.configService.get<AppConfigInterface>(APP_CONFIG_KEY);

        const subject: string = `Congratulations on your new credential is issued by ${name}`;

        // build claim url
        const claimUrl = `${learnerAppUrl}/claim/${credential.id}/${credential.hash}`;

        await this.mailService
            .sendMail({
                subject: subject, // Subject line
                to: `${credential.learnerName} <${credential.learnerMail}>`,
                template: path.resolve(this.emailTemplateDir, 'credentials', 'claiming-email'),
                context: {
                    subject,
                    claimUrl,
                    learnerName: credential.learnerName,
                    credentialTitle: credential.title,
                },
            })
            .catch((err) => {
                this.logger.error(`Error sending claiming email for credential ${credential.id}`, err.stack);
            });
    }

    public async sendRevokingEmail(credential: Credential) {
        const { name } = this.configService.get<VetProviderConfigInterface>(VET_PROVIDER_CONFIG_KEY);
        const subject: string = `Credential is revoked by ${name}`;

        await this.mailService
            .sendMail({
                subject: subject,
                to: `${credential.learnerName} <${credential.learnerMail}>`,
                template: path.resolve(this.emailTemplateDir, 'credentials', 'revoking-email'),
                context: {
                    subject,
                    learnerName: credential.learnerName,
                    credentialTitle: credential.title,
                },
            })
            .catch((err) => {
                this.logger.error(`Error sending revoking email for credential ${credential.id}`, err.stack);
            });
    }
}
