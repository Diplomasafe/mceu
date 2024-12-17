import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsUUID, Validate } from 'class-validator';
import { IsLearnerEmailConstraint } from '../constraints';

export class IssueCredentialDto {
    @IsOptional()
    @IsUUID()
    public id?: string;

    @ApiProperty({ example: 'name' })
    @IsNotEmpty()
    public learnerName: string;

    @ApiProperty({ example: 'learner@mail.int' })
    @IsNotEmpty()
    @IsEmail()
    @Validate(IsLearnerEmailConstraint)
    public learnerMail: string;

    @ApiProperty({ example: 'Title' })
    @IsNotEmpty()
    public title: string;

    @ApiProperty({ example: '2024-05-02' })
    @IsNotEmpty()
    @IsDateString()
    public issueDate: Date;

    @ApiProperty({ example: 'Denmark' })
    @IsNotEmpty()
    public country: string;

    @ApiProperty({ example: 'criteria' })
    @IsNotEmpty()
    public criteria: string;

    @ApiProperty({ example: 'credits' })
    @IsNotEmpty()
    public credits: string;

    @ApiProperty({ example: 'level' })
    @IsNotEmpty()
    public level: string;

    @ApiProperty({ example: 'assessment type' })
    @IsNotEmpty()
    public assessmentType: string;

    @ApiProperty({ example: 'participation form' })
    @IsNotEmpty()
    public participationForm: string;

    @ApiProperty({ example: 'verified by' })
    @IsNotEmpty()
    public verifiedBy: string;
}
