import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UnprocessableEntityResponseDto {

    @ApiProperty({example: 'Unprocessable Entity'})
    @IsNotEmpty()
    error: string;

    @ApiProperty({example: 422})
    @IsNotEmpty()
    statusCode: number;
}