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
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Response } from 'express';
import { RestaurantDto } from './dto/restaurant.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Get()
  async getRes(@Res() res: Response): Promise<Response<RestaurantDto[]>> {
    let restaurants = await this.restaurantService.getRes();
    return res.status(HttpStatus.OK).json({ restaurants });
  }

  @ApiBody({
    type: CreateRestaurantDto,
  })
  @Post('/add-restaurant')
  async addRes(
    @Res() res: Response,
    @Body() body: CreateRestaurantDto,
  ): Promise<Response<RestaurantDto>> {
    let restaurant = await this.restaurantService.addRes(body);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Thêm nhà hàng thành công', restaurant });
  }

  @ApiParam({
    type: Number,
    name: 'res_id',
  })
  @Delete('/delete-restaurant/:res_id')
  async delRes(
    @Res() res: Response,
    @Param('res_id') id: number,
  ): Promise<Response<any>> {
    await this.restaurantService.delRes(+id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Xoá nhà hàng thành công' });
  }
}
