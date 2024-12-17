import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UnauthorizedResponseDto {

    @ApiProperty({example: 'Unauthorized'})
    @IsNotEmpty()
    error: string;

    @ApiProperty({example: 401})
    @IsNotEmpty()
    statusCode: number;
}