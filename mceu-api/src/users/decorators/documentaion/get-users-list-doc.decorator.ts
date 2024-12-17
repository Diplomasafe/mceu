import { SetMetadata } from '@nestjs/common';

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../shared/dtos/pagination/paginated-response.dto';
import { UnauthorizedResponseDto, ForbiddenResponseDto } from '../../../shared/dtos/http';

export const GetUsersListDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get users list e' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
        ApiOkResponse({ isArray: true, type: PaginatedResponseDto, description: 'User list' }),
    );
};
