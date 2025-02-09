import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  
  @ApiProperty()
  @IsEmail()
  email: string;



  @ApiProperty()
  phone: string;
  @ApiProperty()
  password_hash: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  created_at: Date;
}
