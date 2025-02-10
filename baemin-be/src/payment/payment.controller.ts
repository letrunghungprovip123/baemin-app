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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentDto } from './dto/payment.dto';
import { Response } from 'express';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getPay(@Res() res: Response): Promise<Response<PaymentDto[]>> {
    let payments = await this.paymentService.getPay();
    return res.status(HttpStatus.OK).json({ payments });
  }

  @ApiBody({
    type: CreatePaymentDto,
  })
  @Post('/create-pay')
  async createPay(
    @Res() res: Response,
    @Body() body: CreatePaymentDto,
  ): Promise<Response<PaymentDto>> {
    let payment = await this.paymentService.createPay(body);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Tạo thanh toán thành công', payment });
  }

  @ApiParam({
    type: Number,
    name: 'pay_id',
  })
  @Delete('/delete-payment/:pay_id')
  async delPay(
    @Res() res: Response,
    @Param('pay_id') id: number,
  ): Promise<Response<any>> {
    await this.paymentService.delPay(+id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Xoá payment thành công' });
  }
}
