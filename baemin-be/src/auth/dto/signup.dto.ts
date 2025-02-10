import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password_hash: string;
}
