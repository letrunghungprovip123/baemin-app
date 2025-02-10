import { Decimal } from '@prisma/client/runtime/library';

export class PaymentDto {
  payment_id: number;
  order_id: number;
  amount: Decimal;
  payment_method: string;
  payment_status: string;
  payment_time: Date;
}
