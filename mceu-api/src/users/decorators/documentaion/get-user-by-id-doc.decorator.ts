import { applyDecorators } from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ForbiddenResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../../../shared/dtos/http';
import { UserDto } from '../../dtos/user.dto';
import { User } from '../../entites/user.entity';

export const GetUserByIdDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get single user by id' }),
        ApiOkResponse({ type: User, description: 'Single user by id' }),
        ApiNotFoundResponse({ type: NotFoundResponseDto, description: 'Not found' }),
        ApiUnauthorizedResponse({ type: UnauthorizedResponseDto, description: 'Unauthorized' }),
        ApiForbiddenResponse({ type: ForbiddenResponseDto, description: 'Forbidden' }),
    );
};
