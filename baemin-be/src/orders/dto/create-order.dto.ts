import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  restaurant_id: number;
  @ApiProperty()
  total_price: Decimal;
  @ApiProperty()
  status: string;
  @ApiProperty()
  created_at: Date;
}
