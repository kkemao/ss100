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
  async findAll(): Promise<any> {
    const sql = `SELECT id, accountName, username, role, phone, image, register_time, last_login FROM t_user;`;
    try {
      const user = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
      });
      return {
        statusCode: 200,
        data: user,
        msg: '查询成功',
      };
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
    const {
      accountName,
      password,
      repassword,
      username,
      phone,
      role,
      image = '',
    } = requestBody;
    if (password !== repassword) {
      return {
        statusCode: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(accountName);
    if (user) {
      return {
        statusCode: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    const registerSQL = `
    INSERT INTO t_user 
        (id, accountname, username, password, phone, image, salt, register_time, last_login, description, isdelete, role) 
    VALUES 
        (null, '${accountName}', '${username}', '${hashPwd}', '${phone}', '${image}', '${salt}', '${moment().format(
      'YYYY-MM-DD HH:mm:ss',
    )}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', '', 0, '${role ?? 3}');
    `;
    try {
      await sequelize.query(registerSQL);
      return {
        statusCode: 200,
        msg: '添加成功',
      };
    } catch (error) {
      return {
        statusCode: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async deleteUser(id: number): Promise<any> {
    const sql = `delete from t_user where id = ${id}`;
    try {
      await sequelize.query(sql);
      return {
        statusCode: 200,
        msg: '删除成功',
      };
    } catch (error) {
      return {
        statusCode: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async updateUser(requestBody: any): Promise<any> {
    const { id, accountName, username, phone, role, image = '' } = requestBody;
    try {
      const querysql = `select * from t_user where accountname = '${accountName}' and id != ${id}`;
      const res = await sequelize.query(querysql, {
        raw: true,
        type: Sequelize.QueryTypes.SELECT,
      });
      if (res.length) {
        return {
          statusCode: 400,
          msg: `该用户名已经存在，请修改`,
        };
      }
    } catch (error) {
      return {
        statusCode: 400,
        msg: `Service error: ${error}`,
      };
    }
    try {
      const sql = `update t_user set 
        accountname = '${accountName}',
        image = '${image}',
        phone = '${phone}',
        username = '${username}',
        role = ${role} 
        where id = ${id}`;
      await sequelize.query(sql, {
        raw: true,
        type: Sequelize.QueryTypes.UPDATE,
      });
      return {
        statusCode: 200,
        msg: '更新成功',
      };
    } catch (error) {
      return {
        statusCode: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
