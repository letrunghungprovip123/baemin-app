import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll(): Promise<UserDto[]> {
    try {
      return await this.prisma.users.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(body: CreateUserDto): Promise<UserDto> {
    try {
      let { email } = body;
      let checkUser = await this.prisma.users.findFirst({
        where: { email },
      });
      if (checkUser) throw new BadRequestException('Email đã tồn tại');
      let user = await this.prisma.users.create({
        data: body,
      });
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new Error(error);
    }
  }
  async deleteUser(id: number): Promise<void> {
    try {
      // Kiểm tra xem người dùng có tồn tại không
      let checkUser = await this.prisma.users.findFirst({
        where: { user_id: id },
      });
      // Nếu không tìm thấy người dùng, quăng lỗi 400
      if (!checkUser) {
        throw new BadRequestException('Id người dùng không đúng!');
      }

      // Nếu tìm thấy, thực hiện xóa người dùng
      await this.prisma.users.delete({
        where: { user_id: id },
      });
    } catch (error) {
      // Kiểm tra xem lỗi có phải là BadRequestException không
      if (error instanceof BadRequestException) {
        throw error; // Nếu đúng, quăng lại BadRequestException
      }

      // Quăng lỗi server nếu có lỗi khác không phải BadRequestException
      throw new Error(error);
    }
  }

  async pageUser(size: number, page: number, keyword: string) {
    try {
      const skip = ((page || 0) - 1) * (size || 0);

      const users = await this.prisma.users.findMany({
        where: {
          name: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
        skip,
        take: size || 10000,
      });
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserId(id: number): Promise<UserDto> {
    try {
      let checkUser = await this.prisma.users.findFirst({
        where: { user_id: id },
      });
      if (!checkUser) throw new BadRequestException('User không tồn tại');
      return checkUser;
      return;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new Error(error);
    }
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<UserDto> {
    try {
      let checkUser = await this.prisma.users.findFirst({
        where: { user_id: id },
      });
      if (!checkUser) throw new BadRequestException('User không tồn tại');
      let { email } = body;
      let checkUser2 = await this.prisma.users.findFirst({
        where: { email },
      });
      if (checkUser2) throw new BadRequestException('Email đã tồn tại');
      let user = await this.prisma.users.update({
        data: body,
        where: { user_id: id },
      });
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new Error(error);
    }
  }
}
