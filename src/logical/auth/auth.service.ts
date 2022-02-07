import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';
import { RedisInstance } from 'src/database/redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(accountName: string, password: string): Promise<any> {
    // console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOne(accountName);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      userName: user.username,
      accountName: user.accountname,
      password: user.password,
      id: user.id,
      phone: user.phone,
      sub: user.id,
      role: user.role,
    };
    // console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      // 实例化 redis
      const redis = await RedisInstance.initRedis('auth.certificate', 0);
      // 将用户信息和 token 存入 redis，并设置失效时间，语法：[key, seconds, value]
      await redis.setex(`${user.id}-${user.accountname}`, 3600 * 8, `${token}`);
      return {
        statusCode: 200,
        data: {
          token: token,
          userInfo: {
            username: user.username,
            phone: user.phone,
            id: user.id,
          },
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        statusCode: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
