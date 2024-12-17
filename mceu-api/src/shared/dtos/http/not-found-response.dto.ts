import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class NotFoundResponseDto {

    @ApiProperty({example: 'Not found'})
    @IsNotEmpty()
    error: string;

    @ApiProperty({example: 404})
    @IsNotEmpty()
    statusCode: number;
}