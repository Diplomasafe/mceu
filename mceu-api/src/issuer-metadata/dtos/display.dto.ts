import { IsOptional } from 'class-validator';

export class DisplayDto {
    @IsOptional()
    public name: string;

    @IsOptional()
    public locale: string;
}
