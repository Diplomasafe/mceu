import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../shared/dtos/pagination/paginated-response.dto';
import { ForbiddenResponseDto, UnauthorizedResponseDto } from '../../../shared/dtos/http';

export const GetCredentialListDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get credentials list.' }),
        ApiOkResponse({ type: PaginatedResponseDto, description: 'Paginated credentials list' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
        ApiOkResponse({ isArray: true, type: PaginatedResponseDto, description: 'User list' }),
    );
};
