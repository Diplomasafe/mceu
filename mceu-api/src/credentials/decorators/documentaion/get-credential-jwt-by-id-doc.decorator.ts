import { applyDecorators } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForbiddenResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../../../shared/dtos/http';
import { CredentialJwtDto } from '../../dtos';

export const GetCredentialJwtByIdDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get single credential jwt by id' }),
        ApiOkResponse({ type: CredentialJwtDto, description: 'Credential claimed' }),
        ApiNotFoundResponse({ type: NotFoundResponseDto, description: 'Not found' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
    );
};
