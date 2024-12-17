import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetVetProviderQuery} from '../get-vet-provider.query';
import {VetProviderDTO} from 'src/vet-provider/dto/vet-provider.dto';
import {ConfigService} from '@nestjs/config';
import {VET_PROVIDER_CONFIG_KEY, VetProviderConfigInterface} from "../../../shared/types";

@QueryHandler(GetVetProviderQuery)
export class GetVetProviderHandlers
    implements IQueryHandler<GetVetProviderQuery> {
    constructor(private configService: ConfigService) {
    }

    public async execute(query: GetVetProviderQuery): Promise<VetProviderDTO> {
        const vetProvider = this.configService.get<VetProviderConfigInterface>(VET_PROVIDER_CONFIG_KEY);

        return {
            name: vetProvider.name,
            email: vetProvider.email,
            did: vetProvider.did
        };
    }
}
