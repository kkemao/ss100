import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/logical/auth/auth.service';
import { UserService } from 'src/logical/user/user.service';
import { NoAuth } from 'src/utils/unAuth';
import { Request } from 'express';

interface RequestWithUserInfo extends Request {
  user: any;
}

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

  @Get('find-one')
  findOnes() {
    return this.userService.findOneGet();
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('register')
  async register(@Req() request: RequestWithUserInfo, @Body() body: any) {
    //   拿到jwt里面保存的用户信息
    // console.log('zkf-request-user', request.user);
    return await this.userService.register(body);
  }

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParmas: any) {
    // console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.accountName,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}
