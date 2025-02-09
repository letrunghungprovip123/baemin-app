import { Decimal } from '@prisma/client/runtime/library';

export class OrderDto {
  order_id: number;
  user_id: number;
  restaurant_id: number;
  total_price: Decimal;
  status: string;
  created_at: Date;
}
