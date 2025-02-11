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
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Response } from 'express';
import { DeliveryDto } from './dto/delivery.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  async getDel(@Res() res: Response): Promise<Response<DeliveryDto[]>> {
    let delivery = await this.deliveryService.getDel();
    return res.status(HttpStatus.OK).json({ delivery });
  }

  @ApiBody({
    type: CreateDeliveryDto,
  })
  @Post('/create-delivery')
  async createDel(
    @Res() res: Response,
    @Body() body: CreateDeliveryDto,
  ): Promise<Response<DeliveryDto>> {
    let delivery = await this.deliveryService.createDel(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Tạo đơn giao hàng thành công', delivery });
  }

  @ApiParam({
    type: Number,
    name: 'del_id',
  })
  @Delete('/delete-delivery/:del_id')
  async delDel(
    @Res() res: Response,
    @Param('del_id') id: number,
  ): Promise<any> {
    await this.deliveryService.delDel(+id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Xoá đơn giao thành công' });
  }

  @ApiBody({
    type: UpdateDeliveryDto,
  })
  @ApiParam({
    type: Number,
    name: 'del_id',
  })
  @Put('/update-delivery/:del_id')
  async updateDel(
    @Res() res: Response,
    @Body() body: UpdateDeliveryDto,
    @Param('del_id') id: number,
  ): Promise<Response<DeliveryDto>> {
    let delivery = await this.deliveryService.updateDel(body, +id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Cập nhật đơn giao thành công', delivery });
  }
}
