import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  owner_id: number;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  is_partner: boolean;
}
