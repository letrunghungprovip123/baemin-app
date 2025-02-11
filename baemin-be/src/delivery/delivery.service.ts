import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeliveryDto } from './dto/delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  async getDel(): Promise<DeliveryDto[]> {
    try {
      return await this.prisma.delivery.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createDel(body: CreateDeliveryDto): Promise<DeliveryDto> {
    try {
      return await this.prisma.delivery.create({
        data: body,
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new Error(error);
    }
  }
  async delDel(id: number): Promise<any> {
    try {
      let checkDel = await this.prisma.delivery.findFirst({
        where: { delivery_id: id },
      });
      if (!checkDel) throw new BadRequestException('Đơn giao không tồn tại');
      await this.prisma.delivery.delete({
        where: { delivery_id: id },
      });
    } catch (error) {
      throw error;
    }
  }
  async updateDel(body: UpdateDeliveryDto, id: number): Promise<DeliveryDto> {
    try {
      let checkDel = await this.prisma.delivery.findFirst({
        where: { delivery_id: id },
      });
      if (!checkDel) throw new BadRequestException('Đơn giao không tồn tại');
      return await this.prisma.delivery.update({
        data: body,
        where: { delivery_id: id },
      });
    } catch (error) {
      throw error;
    }
  }
}
