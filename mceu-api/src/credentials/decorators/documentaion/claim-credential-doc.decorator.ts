import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { UnprocessableEntityResponseDto } from '../../../shared/dtos/http';
import { CredentialClaimedDto } from '../../dtos';

export const ClaimCredentialDoc = () => {
    return applyDecorators(
        ApiTags('Claim credentials'),
        ApiOperation({ summary: 'Claim credentials' }),
        ApiOkResponse({ type: CredentialClaimedDto, description: 'Credential claimed' }),
        ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponseDto, description: 'Unprocessable' }),
    );
};
