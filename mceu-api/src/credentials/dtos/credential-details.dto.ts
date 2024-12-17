import { ApiProperty } from '@nestjs/swagger';

export class CredentialDetailsDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    learnerName: string;
    @ApiProperty()
    learnerMail: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    issuerName: string;
    @ApiProperty()
    issueDate: Date;
    @ApiProperty()
    criteria: string;
    @ApiProperty()
    credits: string;
    @ApiProperty()
    level: string;
    @ApiProperty()
    assessmentType: string;
    @ApiProperty()
    participationForm: string;
    @ApiProperty()
    verifiedBy: string;
    @ApiProperty()
    vcToken?: string;
}
