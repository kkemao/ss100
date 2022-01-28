import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from 'src/logical/auth/auth.service';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { LoginDTO } from 'src/logical/login/login.dto'; // 引入 DTO
import { ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  // JWT验证 - Step 1: 用户请求登录
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post()
  async login(@Body() loginParmas: LoginDTO) {
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
