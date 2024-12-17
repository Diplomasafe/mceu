import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CredentialClaimDetailsDto, CredentialClaimedDto } from '../../dtos';
import { UnprocessableEntityResponseDto } from '../../../shared/dtos/http';

export const GetClaimCredentialDetailsDoc = () => {
    return applyDecorators(
        ApiTags('Claim credentials'),
        ApiOperation({ summary: 'Get claim credentials details' }),
        ApiOkResponse({ type: CredentialClaimDetailsDto, description: 'Credential details' }),
        ApiUnprocessableEntityResponse({ type: UnprocessableEntityResponseDto, description: 'Unprocessable' }),
    );
};
