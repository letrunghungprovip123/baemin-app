import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantDto } from './dto/restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}
  async getRes(): Promise<RestaurantDto[]> {
    try {
      return await this.prisma.restaurants.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }
  async addRes(body: CreateRestaurantDto): Promise<RestaurantDto> {
    try {
      let restaurant = await this.prisma.restaurants.create({
        data: body,
      });
      return restaurant;
    } catch (error) {
      throw new Error(error);
    }
  }
  async delRes(id: number): Promise<any> {
    try {
      let checkRes = await this.prisma.restaurants.findFirst({
        where: { restaurant_id: id },
      });
      if (!checkRes) throw new BadRequestException('Nhà hàng không tồn tại');
      await this.prisma.restaurants.delete({
        where: { restaurant_id: id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
