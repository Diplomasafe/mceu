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
import { UserDto } from '../../dtos/user.dto';

export const UpdateUserDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Update existing user' }),
        ApiOkResponse({ type: UserDto, description: 'User updated' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
        ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponseDto, description: 'Unprocessable' }),
    );
};
