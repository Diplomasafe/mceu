import { Controller, HttpStatus, HttpException, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { Public } from 'nest-keycloak-connect';
import { GetEmployerCredentialQuery } from '../queries';
import { GetCredentialByIdDoc } from '../decorators/documentaion';
import {CredentialDetailsDto} from "../dtos";

@ApiTags('Public credentials')
@Controller('public/credentials')
export class PublicCredentialsController {
    public constructor(private readonly queryBus: QueryBus) {}

    @Public()
    @Get(':id')
    @GetCredentialByIdDoc()
    public async getCredential(@Param('id') id: string): Promise<CredentialDetailsDto> {
        try {
            return await this.queryBus.execute(new GetEmployerCredentialQuery(id));
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
}
