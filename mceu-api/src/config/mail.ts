import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { MAIL_CONFIG_KEY, MailConfigInterface } from '../shared/types';
import { getMailTransport } from './../shared/mail/mail-transports';

export default (): { mail: MailConfigInterface } => ({
    [MAIL_CONFIG_KEY]: {
        transport: getMailTransport(),
        defaults: {
            from: process.env.MAIL_FROM,
        },
        template: {
            dir: process.env.MAIL_TEMPLATES_DIR,
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
        options: {
            partials: {
                dir: path.resolve(process.env.MAIL_TEMPLATES_DIR, './partials'),
                options: {
                    strict: true,
                },
            },
        },
    },
});
