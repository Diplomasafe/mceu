import { applyDecorators, Type } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForbiddenResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../../../shared/dtos/http';
import { UserDto } from '../../dtos/user.dto';

export const DeleteUserDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Delete existing user' }),
        ApiOkResponse({ description: 'User deleted' }),
        ApiNotFoundResponse({ type: NotFoundResponseDto, description: 'Not found' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
    );
};
