import { applyDecorators } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
    ForbiddenResponseDto,
    UnauthorizedResponseDto,
    UnprocessableEntityResponseDto,
} from '../../../shared/dtos/http';

export const CreateCredentialDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Create new credentials' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
        ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponseDto, description: 'Unprocessable' }),
    );
};
