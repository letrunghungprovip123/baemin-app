import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty()
  order_id: number;
  @ApiProperty()
  driver_id: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  delivery_address: string;
  @ApiProperty()
  delivery_time: Date;
  @ApiProperty()
  created_at: Date;
}
