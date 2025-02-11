import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuDto } from 'src/menu/dto/menu.dto';
import { OrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(): Promise<OrderDto[]> {
    try {
      let orders = await this.prisma.orders.findMany();
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createOrder(body: CreateOrderDto): Promise<OrderDto> {
    try {
      let order = await this.prisma.orders.create({
        data: body,
      });
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOrder(id: number): Promise<any> {
    try {
      let checkOrder = await this.prisma.orders.findFirst({
        where: { order_id: id },
      });
      if (!checkOrder) throw new BadRequestException('Order không tồn tại');
      await this.prisma.orders.delete({
        where: { order_id: id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOrder(body: UpdateOrderDto, id: number): Promise<any> {
    try {
      let checkOrder = await this.prisma.orders.findFirst({
        where: { order_id: id },
      });
      if (!checkOrder) throw new BadRequestException('Order không tồn tại');
      return await this.prisma.orders.update({
        data: body,
        where: { order_id: id },
      });
    } catch (error) {
      throw error;
    }
  }
}
