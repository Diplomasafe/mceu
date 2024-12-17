import { applyDecorators } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
    ForbiddenResponseDto,
    UnauthorizedResponseDto,
    UnprocessableEntityResponseDto,
} from '../../../shared/dtos/http';
import { PaginatedResponseDto } from '../../../shared/dtos/pagination/paginated-response.dto';
import { UserDto } from '../../dtos/user.dto';

export const CreateUserDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Create new user' }),
        ApiOkResponse({ type: UserDto, description: 'User created' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
        ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponseDto, description: 'Unprocessable' }),
    );
};
