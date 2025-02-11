import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async getPay(): Promise<PaymentDto[]> {
    try {
      return this.prisma.payments.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createPay(body: CreatePaymentDto): Promise<PaymentDto> {
    try {
      return await this.prisma.payments.create({
        data: body,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delPay(id: number): Promise<any> {
    try {
      let checkPay = await this.prisma.payments.findFirst({
        where: { payment_id: id },
      });
      if (!checkPay) throw new BadRequestException('Payment không tồn tại');
      await this.prisma.payments.delete({
        where: { payment_id: id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePay(body: UpdatePaymentDto, id: number): Promise<any> {
    try {
      let checkPay = await this.prisma.payments.findFirst({
        where: { payment_id: id },
      });
      if (!checkPay) throw new BadRequestException('Payment không tồn tại');
      return await this.prisma.payments.update({
        data: body,
        where: { payment_id: id },
      });
    } catch (error) {
      throw error;
    }
  }
}
