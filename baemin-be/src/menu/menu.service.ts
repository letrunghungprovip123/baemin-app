import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenu(): Promise<MenuDto[]> {
    try {
      return await this.prisma.menus.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMenu(body: CreateMenuDto): Promise<MenuDto> {
    try {
      let { restaurant_id } = body;
      let checkRes = await this.prisma.restaurants.findFirst({
        where: { restaurant_id },
      });
      if (!checkRes) throw new BadRequestException('Nhà hàng không tồn tại');
      let menu = await this.prisma.menus.create({
        data: body,
      });
      return menu;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new Error(error);
    }
  }

  async deleteMenu(id: number): Promise<any> {
    try {
      let checkMenu = await this.prisma.menus.findFirst({
        where: { menu_id: id },
      });
      if (!checkMenu) throw new BadRequestException('Menu không tồn tại');
      await this.prisma.menus.delete({
        where: { menu_id: id },
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new Error(error);
    }
  }

  async pageMenu(page: number, size: number): Promise<MenuDto[]> {
    const skip = ((page || 0) - 1) * (size || 0);
    try {
      let menu = await this.prisma.menus.findMany({
        skip,
        take: size || 10000,
      });
      return menu;
    } catch (error) {
      throw new Error();
    }
  }

  async searchMenu(keyword: string): Promise<MenuDto[]> {
    try {
      let menu = await this.prisma.menus.findMany({
        where: {
          name: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
      });
      return menu;
    } catch (error) {
      throw new Error(error);
    }
  }
}
