import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class CreatePaymentDto {
  @ApiProperty()
  order_id: number;
  @ApiProperty()
  amount: Decimal;
  @ApiProperty()
  payment_method: string;
  @ApiProperty()
  payment_status: string;
  @ApiProperty()
  payment_time: Date;
}
