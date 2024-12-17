import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class VetProviderDTO {
  @ApiProperty({ example: 'Vet Provider Name' })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 'mail@example.com' })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9Kbo2MiYEX' })
  @IsOptional()
  public did?: string;

  @ApiProperty({ example: 'TBD' })
  @IsOptional()
  public eSealCert?: string;

}
