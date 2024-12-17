import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MailerModule, MailerOptions} from "@nestjs-modules/mailer";
import {MAIL_CONFIG_KEY, MailConfigInterface} from "../types";

@Module({
    imports: [
        ConfigModule,
        MailerModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService): MailerOptions => config.get<MailConfigInterface>(MAIL_CONFIG_KEY)
        })
    ]
})
export class MailModule {
}
