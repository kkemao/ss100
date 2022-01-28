import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/logical/auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  // JWT验证 - Step 1: 用户请求登录
  @Post()
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
