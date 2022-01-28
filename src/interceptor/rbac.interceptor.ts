import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RbacInterceptor implements NestInterceptor {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  // 构造器里的 role: number 是通过路由传入的可配置参数，表示必须小于等于这个数字的角色才能访问。通过获取用户角色的数字，和传入的角色数字进行比较即可。
  constructor(private readonly role: number) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    if (req.user.role > this.role) {
      throw new ForbiddenException('对不起，您无权操作');
    }
    return next.handle();
  }
}
