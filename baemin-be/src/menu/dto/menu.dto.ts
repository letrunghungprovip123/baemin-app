import { Decimal } from '@prisma/client/runtime/library';

export class MenuDto {
  menu_id: number;
  restaurant_id: number;
  name: string;
  description: string;
  price: Decimal;
  created_at: Date;
}
