import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ForbiddenResponseDto {
    @ApiProperty({example: 'Forbidden resource'})
    @IsNotEmpty()
    message: string;

    @ApiProperty({example: 'Forbidden'})
    @IsNotEmpty()
    error: string;

    @ApiProperty({example: 403})
    @IsNotEmpty()
    statusCode: number;
}