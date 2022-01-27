import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from '@nestjs/passport';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { logger } from './middleware/logger.middleware';

const allowRoute = ['/api/user/login'];

// 直接用全局守卫会有类型报错，增加自定义类解决问题
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  // canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest();
  //   const path = request.route?.path;
  //   // if (!allowRoute.includes(path) && !request.headers.authorization) {
  //   //   throw new UnauthorizedException();
  //   //   // throw new HttpException(
  //   //   //   {
  //   //   //     status: HttpStatus.FORBIDDEN,
  //   //   //     error: '未授权的访问',
  //   //   //   },
  //   //   //   HttpStatus.FORBIDDEN,
  //   //   // );
  //   // }
  //   return true;
  // }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 暂时不引用全局守卫，先通过控制器局部控制
  // app.useGlobalGuards(new JwtAuthGuard());
  app.use(logger);
  app.setGlobalPrefix('api'); // 全局路由前缀
  await app.listen(9998);
}
bootstrap();
