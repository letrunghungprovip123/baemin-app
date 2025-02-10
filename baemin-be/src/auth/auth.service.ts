import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/Login.dto';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<string> {
    try {
      let { email, password_hash } = body;
      let checkUser = await this.prisma.users.findFirst({
        where: { email },
      });
      if (!checkUser) throw new BadRequestException('Email không chính xác');
      const checkPass = bcrypt.compareSync(
        password_hash,
        checkUser.password_hash,
      );
      if (!checkPass) throw new BadRequestException('Mật khẩu không chính xác');
      const token = this.jwtService.sign(
        {
          data: { user_id: checkUser.user_id },
        },
        {
          expiresIn: '7d',
          secret: process.env.SECRET_KEY,
        },
      );
      return token;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new Error(error);
    }
  }
  async signUp(body: SignUpDto): Promise<any> {
    try {
      let checkUser = await this.prisma.users.findFirst({
        where: { email: body.email },
      });
      if (checkUser) throw new BadRequestException('Email đã tồn tại');
      body.password_hash = bcrypt.hashSync(body.password_hash, 10);
      return await this.prisma.users.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          password_hash: body.password_hash,
          role: 'user',
          created_at: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new Error(error);
    }
  }
}
