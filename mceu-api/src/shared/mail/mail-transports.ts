import { SESClient, SES } from '@aws-sdk/client-ses';
import SESTransport from 'nodemailer/lib/ses-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailTransportOptions } from '../types';
import * as aws from '@aws-sdk/client-ses';

// Define a union type for both transport options
const transportDrivers: Record<string, () => MailTransportOptions> = {
    ses: getSesTransport,
    smtp: getSmtpTransport,
};

export function getMailTransport(): MailTransportOptions {
    const selectedDriver = transportDrivers[process.env.MAIL_DRIVER] || getSmtpTransport;

    return selectedDriver();
}

function getSesTransport(): SESTransport.Options {
    const ses = new SES({
        region: process.env.SES_REGION,
        credentials: {
            accessKeyId: process.env.SES_ACCESS_KEY_ID,
            secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
        },
    });

    return { SES: { ses, aws } };
}

function getSmtpTransport(): SMTPTransport.Options {
    return {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    };
}
