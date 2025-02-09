import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  restaurant_id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  created_at: Date;
}
