import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CredentialClaimDetailsDto {
    @ApiProperty({ example: 'Course name' })
    public title: string;

    @ApiProperty({ example: false })
    learnerExists: boolean
    @ApiProperty({ example: true })
    authenticatedLearner: boolean
    @ApiProperty({ example: false })
    sameLearner: boolean
}
