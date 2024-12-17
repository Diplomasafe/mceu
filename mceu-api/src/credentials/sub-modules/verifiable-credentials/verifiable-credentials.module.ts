import { Module, Provider } from '@nestjs/common';
import { BuildVerifiableCredentialService, VerifiableCredentialService } from './services';
import { VerifiableAttestationBuilderService } from './services/builders';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { EbsiService } from './services';

const sharedProviders: Provider[] = [
    VerifiableCredentialService,
    VerifiableAttestationBuilderService,
    {
        provide: BuildVerifiableCredentialService,
        useFactory: (verifiableAttestationBuilder) =>
            new BuildVerifiableCredentialService([verifiableAttestationBuilder]),
        inject: [VerifiableAttestationBuilderService],
    },
];

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [...sharedProviders, EbsiService],
    exports: [...sharedProviders],
})
export class VerifiableCredentialsModule {}
