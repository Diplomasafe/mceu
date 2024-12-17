import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class IssuanceRequestDto {
    @ApiProperty({ example: 'name' })
    @IsNotEmpty()
    public courseTitle: string;
}
