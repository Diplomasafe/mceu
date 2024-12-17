import SESTransport from 'nodemailer/lib/ses-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type MailTransportOptions = SESTransport.Options | SMTPTransport.Options;

export const MAIL_CONFIG_KEY = 'mail';

export interface MailConfigInterface {
    transport: MailTransportOptions;
    defaults: {
        from: string;
    };
    template: {
        dir: string;
        adapter;
        options: {
            strict: boolean;
        };
    };
    options: any;
}
