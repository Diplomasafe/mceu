import { Controller, UnprocessableEntityException, HttpStatus, Get } from '@nestjs/common';
import { VetProviderDTO } from '../dto/vet-provider.dto';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Public, Roles } from 'nest-keycloak-connect';
import { realmRoleBuilderHelper } from 'src/shared/helpers';
import { UserRealmRoles } from 'src/shared/enums/auth/realm-roles.enum';
import { ForbiddenResponseDto, UnauthorizedResponseDto, UnprocessableEntityResponseDto } from 'src/shared/dtos/http';
import { QueryBus } from '@nestjs/cqrs';
import { GetVetProviderQuery } from '../queries';

@ApiTags('VET Provider')
@ApiBearerAuth()
@Controller('vet-provider')
export class VetProviderController {
    public constructor(private readonly queryBus: QueryBus) {}

    @Get()
    @ApiUnauthorizedResponse({
        type: UnauthorizedResponseDto,
        description: 'Unauthorized',
    })
    @ApiForbiddenResponse({
        type: ForbiddenResponseDto,
        description: 'Forbidden',
    })
    @ApiUnprocessableEntityResponse({
        type: UnprocessableEntityResponseDto,
        description: 'Unprocessable',
    })
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    public async getVetProviderData(): Promise<VetProviderDTO> {
        try {
            return await this.queryBus.execute(new GetVetProviderQuery());
        } catch (error) {
            throw new UnprocessableEntityException({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error: error.message,
            });
        }
    }
}
