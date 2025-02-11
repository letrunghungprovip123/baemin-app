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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';
import { OrderDto } from './dto/orders.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders(@Res() res: Response): Promise<Response<OrderDto[]>> {
    let orders = await this.ordersService.getOrders();
    return res.status(HttpStatus.OK).json({ orders });
  }

  @ApiBody({
    type: CreateOrderDto,
    required: false,
  })
  @Post('/create-order')
  async createOrder(
    @Res() res: Response,
    @Body() body: CreateOrderDto,
  ): Promise<Response<OrderDto>> {
    let order = await this.ordersService.createOrder(body);
    return res.status(HttpStatus.CREATED).json({ order });
  }

  @ApiParam({
    type: Number,
    name: 'order_id',
  })
  @Delete('/delete-order/:order_id')
  async deleteOrder(
    @Res() res: Response,
    @Param('order_id') id: number,
  ): Promise<Response<any>> {
    await this.ordersService.deleteOrder(+id);
    return res.status(HttpStatus.OK).json({ message: 'Xoá thành công' });
  }

  @Put('/update-order/:order_id')
  async updateOrder(
    @Res() res: Response,
    @Body() body: UpdateOrderDto,
    @Param('order_id') id: number,
  ): Promise<Response<any>> {
    let order = await this.ordersService.updateOrder(body, +id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Cập nhật order thành công',order });
  }
}
