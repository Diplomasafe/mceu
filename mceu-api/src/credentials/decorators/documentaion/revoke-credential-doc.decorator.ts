import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { UnprocessableEntityResponseDto } from '../../../shared/dtos/http';
import { CredentialClaimedDto } from '../../dtos';

export const RevokeCredentialDoc = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Revoke credentials' }),
        ApiOkResponse({ type: CredentialClaimedDto, description: 'Credential revoked' }),
        ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponseDto, description: 'Unprocessable' }),
    );
};
