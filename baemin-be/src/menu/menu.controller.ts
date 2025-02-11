import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Response } from 'express';
import { MenuDto } from './dto/menu.dto';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenu(@Res() res: Response): Promise<Response<MenuDto[]>> {
    let menu = await this.menuService.getMenu();
    return res.status(HttpStatus.OK).json({ menu });
  }

  @ApiBody({
    type: CreateMenuDto,
    required: false,
  })
  @Post('/create-menu')
  async createMenu(
    @Res() res: Response,
    @Body() body: CreateMenuDto,
  ): Promise<Response<MenuDto>> {
    let menu = await this.menuService.createMenu(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Tạo menu thành công', menu });
  }

  @ApiParam({
    type: Number,
    name: 'menu_id',
  })
  @Delete('/delete-menu/:menu_id')
  async deleteMenu(
    @Res() res: Response,
    @Param('menu_id') id: number,
  ): Promise<Response<any>> {
    await this.menuService.deleteMenu(+id);
    return res.status(HttpStatus.OK).json({ message: 'Xoá menu thành công' });
  }

  @ApiQuery({
    type: Number,
    required: false,
    name: 'page',
  })
  @ApiQuery({
    type: Number,
    required: false,
    name: 'size',
  })
  @Get('/phan-trang-thuc-an')
  async pageMenu(
    @Res() res: Response,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<Response<MenuDto[]>> {
    let menu = await this.menuService.pageMenu(+page, +size);
    return res.status(HttpStatus.OK).json({ menu });
  }

  @ApiQuery({
    type: String,
    required: false,
    name: 'keyword',
  })
  @Get('/tim-kiem-thuc-an')
  async searchMenu(
    @Res() res: Response,
    @Query('keyword') keyword: string,
  ): Promise<Response<MenuDto[]>> {
    let menu = await this.menuService.searchMenu(keyword);
    return res.status(HttpStatus.OK).json({ menu });
  }
}
