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
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { LoginDto } from './dto/Login.dto';
import { ApiBody } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: LoginDto,
  })
  @Post('/login')
  async login(
    @Res() res: Response,
    @Body() body: LoginDto,
  ): Promise<Response<any>> {
    let token = await this.authService.login(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Đăng nhập thành công', token });
  }

  @ApiBody({
    type: SignUpDto,
  })
  @Post('/sign-up')
  async signUp(
    @Res() res: Response,
    @Body() body: SignUpDto,
  ): Promise<Response<any>> {
    let user = await this.authService.signUp(body);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Đăng ký thành công', user });
  }
}
