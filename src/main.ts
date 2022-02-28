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
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Https from 'https';
import { Writable } from 'stream';

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
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

  // 暂时不引用全局守卫，先通过控制器局部控制
  // app.useGlobalGuards(new JwtAuthGuard());
  app.use(logger);
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api'); // 全局路由前缀
  // AllExceptionsFilter 要在 HttpExceptionFilter 的上面，否则 HttpExceptionFilter 就不生效了，全被 AllExceptionsFilter 捕获了。
  app.useGlobalFilters(new AllExceptionsFilter());
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter());

  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('server api')
    .setDescription('server swagger api')
    .setVersion('1.0')
    .addTag('ss100_1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(9998);
}
bootstrap();
