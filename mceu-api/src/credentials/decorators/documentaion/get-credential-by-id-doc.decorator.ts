import { applyDecorators } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForbiddenResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../../../shared/dtos/http';
import { CredentialDetailsDto } from '../../dtos';

export const GetCredentialByIdDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get single credentials by id' }),
        ApiOkResponse({ type: CredentialDetailsDto, description: 'Credential claimed' }),
        ApiNotFoundResponse({ type: NotFoundResponseDto, description: 'Not found' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
    );
};
