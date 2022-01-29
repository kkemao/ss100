import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisInstance } from '../database/redis';

@Injectable()
export class RbacGuard implements CanActivate {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  // 构造器里的 role: number 是通过路由传入的可配置参数，表示必须小于等于这个数字的角色才能访问。通过获取用户角色的数字，和传入的角色数字进行比较即可。
  constructor(private readonly role: number) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 获取请求头里的 token
    const authorization = request['headers'].authorization || void 0;
    const token = authorization.split(' ')[1]; // authorization: Bearer xxx

    // 获取 redis 里缓存的 token
    const redis = await RedisInstance.initRedis('TokenGuard.canActivate', 0);
    const key = `${user.id}-${user.accountName}`;
    const cache = await redis.get(key);
    if (!cache) {
      // token过期，禁止访问
      throw new UnauthorizedException('您的登录已过期，请重新登录');
    }
    if (token !== cache) {
      // 如果 token 不匹配，禁止访问
      throw new UnauthorizedException('您的账号在其他地方登录，请重新登录');
    }

    // token未过期 请求接口刷新token有效期逻辑在此处实现
    // 比如把 JWT 的时效设置十天半个月的，然后就赋予 Redis 仅仅 1-2 个小时的时效，但是每次请求，都会重置过期时间，最后再判断这个键是否存在，来确认登录是否超时

    if (user.role > this.role) {
      throw new ForbiddenException('对不起，您无权操作');
    }
    return true;
  }
}
