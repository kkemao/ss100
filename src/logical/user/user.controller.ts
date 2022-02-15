import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  UsePipes,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/logical/auth/auth.service';
import { UserService } from 'src/logical/user/user.service';
import { Request } from 'express';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { RegisterInfoDTO } from 'src/logical/user/user.dto'; // 引入 DTO
import { RbacInterceptor } from 'src/interceptor/rbac.interceptor';
import { RbacGuard } from 'src/guards/rbac.guard';
import { roleConstans as role } from 'src/logical/auth/constants'; // 引入角色常量
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

interface RequestWithUserInfo extends Request {
  user: any;
}

@ApiBearerAuth() // Swagger 的 JWT 验证
@ApiTags('user') // 添加 接口标签 装饰器
@UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(new RbacGuard(role.ADMIN))
  @Post('find-one')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.accountName);
  }

  @UseGuards(new RbacGuard(role.ADMIN))
  @Get('find-all')
  async findAll() {
    return await this.userService.findAll();
  }

  @UsePipes(new ValidationPipe()) // 使用管道验证
  // @UseInterceptors(new RbacInterceptor(role.SUPER_ADMIN))
  @UseGuards(new RbacGuard(role.ADMIN))
  @Post('register')
  async register(
    @Req() request: RequestWithUserInfo,
    @Body() body: RegisterInfoDTO,
  ) {
    //   拿到jwt里面保存的用户信息
    // console.log('zkf-request-user', request.user);
    return await this.userService.register(body);
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('add')
  async addUser(@Body() body: any) {
    return await this.userService.register(body);
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('update')
  async updateUser(@Body() body: any) {
    return await this.userService.updateUser(body);
  }

  @UseGuards(new RbacGuard(role.ADMIN))
  @Get('delete')
  async deteleUser(@Query() query: any) {
    return await this.userService.deleteUser(query.id);
  }
}
