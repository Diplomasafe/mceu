import { Module } from '@nestjs/common';
import { AppKeyCommand } from './services';

@Module({
    providers: [AppKeyCommand],
})
export class CliModule {}
