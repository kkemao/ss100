import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import { makeSalt, encryptPassword } from '../../utils/cryptogram'; // 引入加密函数
import * as moment from 'moment';

@Injectable()
export class UserService {
  async findOne(accountName: string): Promise<any> {
    const sql = `SELECT * FROM t_user WHERE accountname = '${accountName}'`;
    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
        })
      )[0];
      // 若查不到用户，则 user === undefined
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }
  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    const registerSQL = `
    INSERT INTO t_user 
        (id, accountname, username, password, phone, image, salt, register_time, last_login, description, isdelete) 
    VALUES 
        (null, '${accountName}', '', '${hashPwd}', '${mobile}', '', '${salt}', '${moment().format(
      'YYYY-MM-DD HH:mm:ss',
    )}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', '', 0);
    `;
    try {
      await sequelize.query(registerSQL);
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
