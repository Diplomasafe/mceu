import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UnprocessableEntityException,
} from '@nestjs/common';
import {
    ClaimCredentialDto,
    CredentialClaimDetailsDto,
    CredentialClaimedDto,
    CredentialDetailsDto,
    IssueCredentialDto,
} from '../dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { AuthenticatedUser, Public, Roles } from 'nest-keycloak-connect';
import { realmRoleBuilderHelper } from 'src/shared/helpers';
import { UserRealmRoles } from '../../shared/enums/auth/realm-roles.enum';
import { ClaimCredentialCommand, IssueCredentialCommand, RevokeCredentialCommand } from '../commands';
import { GetClaimCredentialDetailsQuery, GetIssuerCredentialListQuery, GetIssuerCredentialQuery } from '../queries';
import { PaginationDto } from '../../shared/dtos/pagination/pagination.dto';
import {
    ClaimCredentialDoc,
    CreateCredentialDoc,
    GetCredentialByIdDoc,
    GetCredentialListDoc,
    RevokeCredentialDoc,
} from '../decorators/documentaion';
import { CredentialIssuedEvent, CredentialRevokedEvent } from '../events';
import { AuthenticatedUserInterface } from '../../shared/types';
import { GetClaimCredentialDetailsDoc } from '../decorators/documentaion/get-claim-credential-details-doc.decorator';
import { Credential } from '../entities/credential.entity';

@ApiBearerAuth()
@Controller('credentials')
export class CredentialsController {
    public constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus,
    ) {}

    @Get()
    @GetCredentialListDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    @ApiTags('Provider credentials')
    public async getCredentialList(@Query() paginationDto: PaginationDto): Promise<any> {
        try {
            return await this.queryBus.execute(new GetIssuerCredentialListQuery(paginationDto));
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Get(':id')
    @GetCredentialByIdDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    @ApiTags('Provider credentials')
    public async getCredential(@Param('id') id: string): Promise<CredentialDetailsDto> {
        try {
            return await this.queryBus.execute(new GetIssuerCredentialQuery(id));
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Patch('/:id/revoke')
    @RevokeCredentialDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    @ApiTags('Provider credentials')
    public async revoke(@Param('id') id: string): Promise<void> {
        try {
            const credential: Credential = await this.commandBus.execute(new RevokeCredentialCommand(id));

            this.eventBus.publish(new CredentialRevokedEvent(credential, new Date()));
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: error.message,
                },
                HttpStatus.NOT_FOUND,
            );
        }
    }

    @Post()
    @CreateCredentialDoc()
    @Roles({ roles: [realmRoleBuilderHelper(UserRealmRoles.PROVIDER)] })
    @ApiTags('Provider credentials')
    public async create(@Body() credential: IssueCredentialDto): Promise<void> {
        try {
            const commandResult = await this.commandBus.execute(new IssueCredentialCommand(credential));

            this.eventBus.publish(new CredentialIssuedEvent(commandResult));
        } catch (error) {
            throw new UnprocessableEntityException({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error: error.message,
            });
        }
    }

    @Public(false)
    @GetClaimCredentialDetailsDoc()
    @Get('/:id/:hash/claim-details')
    public async getClaimDetails(
        @Param('id') id: string,
        @Param('hash') hash: string,
        @AuthenticatedUser() user: AuthenticatedUserInterface,
    ): Promise<CredentialClaimDetailsDto> {
        try {
            return await this.queryBus.execute(new GetClaimCredentialDetailsQuery(id, hash, user ?? null));
        } catch (error) {
            throw new UnprocessableEntityException({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error: error.message,
            });
        }
    }

    @Public(false)
    @ClaimCredentialDoc()
    @Post('/:id/claim')
    public async claim(
        @Param('id') id: string,
        @Body() claimData: ClaimCredentialDto,
        @AuthenticatedUser() user: AuthenticatedUserInterface,
    ): Promise<CredentialClaimedDto> {
        try {
            const userId = user ? user.sub : null;

            return await this.commandBus.execute(new ClaimCredentialCommand(id, claimData, userId));
        } catch (error) {
            throw new UnprocessableEntityException({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error: error.message,
            });
        }
    }
}
