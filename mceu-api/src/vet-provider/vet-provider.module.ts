import { Module, Provider } from '@nestjs/common';
import { VetProviderController } from './http/vet-provider.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetVetProviderHandlers, GetVetProviderQuery } from './queries';
import { ConfigModule } from '@nestjs/config';

const providers: Provider[] = [GetVetProviderHandlers, GetVetProviderQuery];

@Module({
  controllers: [VetProviderController],
  providers: [...providers],
  imports: [CqrsModule, ConfigModule],
  exports: [],
})
export class VetProviderModule {}
