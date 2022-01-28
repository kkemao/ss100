import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/logical/auth/auth.service';
import { UserService } from 'src/logical/user/user.service';
import { Request } from 'express';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { RegisterInfoDTO } from 'src/logical/user/user.dto'; // 引入 DTO

interface RequestWithUserInfo extends Request {
  user: any;
}

@UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.username);
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post('register')
  async register(
    @Req() request: RequestWithUserInfo,
    @Body() body: RegisterInfoDTO,
  ) {
    //   拿到jwt里面保存的用户信息
    // console.log('zkf-request-user', request.user);
    return await this.userService.register(body);
  }
}
