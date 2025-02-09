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
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Response } from 'express';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUser(@Res() res: Response): Promise<Response<UserDto[]>> {
    let users = await this.usersService.getAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @ApiBody({
    required: false,
    type: CreateUserDto,
  })
  @Post('/create-user')
  async createUser(
    @Res() res: Response,
    @Body() body: CreateUserDto,
  ): Promise<Response<any>> {
    let user = await this.usersService.createUser(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Tạo user thành công', user });
  }
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
  })
  @Delete('/delete-user')
  async deleteUser(
    @Res() res: Response,
    @Query('id') id: number,
  ): Promise<Response<string>> {
    await this.usersService.deleteUser(+id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Xoá người dùng thành công!' });
  }

  @ApiQuery({
    required: false,
    name: 'size',
    type: Number,
  })
  @ApiQuery({
    required: false,
    name: 'page',
    type: Number,
  })
  @ApiQuery({
    required: false,
    name: 'keyword',
    type: String,
  })
  @Get('/phan-trang-tim-kiem')
  async pageUser(
    @Res() res: Response,
    @Query('size') size: number,
    @Query('page') page: number,
    @Query('keyword') key: string,
  ): Promise<Response<UserDto[]>> {
    let users = await this.usersService.pageUser(+size, +page, key);
    return res.status(HttpStatus.OK).json({ users });
  }

  @ApiParam({
    name: 'id', // Tên tham số trong URL
    type: Number, // Kiểu dữ liệu tham số (Number trong trường hợp này)
    description: 'ID của người dùng', // Mô tả tham số (tuỳ chọn)
  })
  @Get('/:id')
  async getUserId(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<Response<UserDto>> {
    let user = await this.usersService.getUserId(Number(id));
    return res.status(HttpStatus.OK).json({ user });
  }

  @ApiBody({
    type: UpdateUserDto,
    required: false,
  })
  @ApiParam({
    type: Number,
    required: true,
    name: 'id',
  })
  @Put('/update-user/:id')
  async updateUser(
    @Res() res: Response,
    @Body() body: UpdateUserDto,
    @Param('id') id: number,
  ): Promise<Response<UserDto>> {
    let user = await this.usersService.updateUser(+id, body);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Update user thành công', user });
  }
}
