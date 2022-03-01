import { Injectable } from '@nestjs/common';
import * as Https from 'https';
import sequelize from 'src/database/sequelize';
import { WXBizDataCrypt } from 'src/utils/cryptogram';
import * as Sequelize from 'sequelize';
import * as moment from 'moment';

@Injectable()
export class WechatService {
  async saveAnswer(body: any): Promise<any> {
    try {
      const { phoneNumber, answerList } = body;
      const insertSql = `
            INSERT INTO t_wechat_answer 
            (id, phone, answers, time) 
            VALUES 
            (null, '${phoneNumber}', '${answerList}', '${moment().format(
        'YYYY-MM-DD HH:mm:ss',
      )}');
            `;
      await sequelize.query(insertSql, {
        type: Sequelize.QueryTypes.INSERT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
      });
      return {
        statusCode: 200,
        data: null,
        msg: '提交成功',
      };
    } catch (error) {
      return {
        statusCode: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  async createAuth(body: any): Promise<any> {
    try {
      const {
        appid,
        sessionKey,
        encryptedData,
        iv,
        avatar,
        accountName,
        gender,
      } = body;
      if (!appid || !sessionKey || !encryptedData || !iv) {
        return { statusCode: 400, data: null, msg: '参数不全' };
      }
      // 1. 获取微信加密的手机信息，服务器解密
      const { err, data } = await this.decodePhone(
        appid,
        sessionKey,
        encryptedData,
        iv,
      );
      if (!data) {
        return { statusCode: 500, data: null, msg: '授权异常，请重试' };
      }

      // 1、先查询数据库t_wechat_user是否有该数据，2、没有就插入，3、有就直接返回结果
      // （后续第一步查询改成新建另一张微信用户表，由管理员分配用户信息，没有就直接返回没有权限并禁止测评，由管理员添加方有权限）
      const sql = `SELECT * FROM t_wechat_user WHERE phone = '${data.phoneNumber}'`;
      try {
        const user = (
          await sequelize.query(sql, {
            type: Sequelize.QueryTypes.SELECT, // 查询方式
            raw: true, // 是否使用数组组装的方式展示结果
          })
        )[0];
        console.log('zkf-user', user);
        // 若查不到用户，则 user === undefined
        if (!user) {
          const insertSql = `
            INSERT INTO t_wechat_user 
            (id, accountname, username, gender, phone, avatar, salt, register_time, last_login, description, isdelete, role) 
            VALUES 
            (null, '${accountName}', '${accountName}', '${gender}', '${
            data.phoneNumber
          }', '${avatar}', '', '${moment().format(
            'YYYY-MM-DD HH:mm:ss',
          )}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', '', 0, '${3}');
            `;
          await sequelize.query(insertSql, {
            type: Sequelize.QueryTypes.INSERT, // 查询方式
            raw: true, // 是否使用数组组装的方式展示结果
          });
        }
      } catch (error) {
        console.error(error);
      }
      return {
        statusCode: 200,
        data,
        msg: '获取成功',
      };
    } catch (err) {
      return {
        statusCode: 503,
        msg: `Service error: ${err}`,
      };
    }
  }
  async updateLogin(phone: number): Promise<any> {
    const sql = `update t_wechat_user set last_login = '${moment().format(
      'YYYY-MM-DD HH:mm:ss',
    )}' where phone = '${phone}';`;
    try {
      await sequelize.query(sql, {
        type: Sequelize.QueryTypes.UPDATE, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
      });
      return {
        statusCode: 200,
        data: null,
        msg: '查询成功',
      };
    } catch (err) {
      return {
        statusCode: 503,
        msg: `Service error: ${err}`,
      };
    }
  }
  getwxAuth(code: string): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx3e9616624672b017&secret=2ea616a7451d1f665dd678aa15c71df8&js_code=${code}&grant_type=authorization_code`;
        const req = Https.request(url, (res) => {
          let str = '';
          res.on('data', (r) => {
            str += r;
          });
          res.on('end', () => {
            resolve(str);
          });
          res.on('error', (err) => {
            resolve(err);
          });
        });
        req.end();
      });
    } catch (error) {
      return error.message;
    }
  }

  async getSession(code: string): Promise<any> {
    const data = await this.getwxAuth(code);
    const { session_key, openid, errcode, errmsg } = JSON.parse(data);
    if (session_key && openid) {
      return {
        statusCode: 200,
        data: {
          session_key,
          openid,
        },
        msg: '查询成功',
      };
    }
    return {
      statusCode: 500,
      data: null,
      msg: errmsg || '获取session失败',
    };
  }

  decodeWXPhone({ appid, sessionKey, encryptedData, iv }): any {
    try {
      const pc = new WXBizDataCrypt(appid, sessionKey);
      const data = pc.decryptData(encryptedData, iv);
      return data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err.message);
    }
  }

  decodePhone(appid, sessionKey, encryptedData, iv): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const { err, data } = this.decodeWXPhone({
          appid,
          sessionKey,
          encryptedData,
          iv,
        });
        if (data) {
          resolve({
            err: null,
            data,
          });
          return;
        }
        resolve({ err, data: null });
      } catch (err) {
        reject({ err, data: null });
      }
    });
  }
  async updateArticleCount(id: number): Promise<any> {
    const sql = `update t_article set count = count + 1 where id = ${id}`;
    try {
      const raws = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.UPDATE, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
      });
      return {
        statusCode: 200,
        data: [],
        msg: '查询成功',
      };
    } catch (error) {
      return {
        statusCode: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  async findArticle(labelId: number): Promise<any> {
    const sql = `select 
    t.id, t.title, t.cover, t.sketch, t.content, t.label_id, t.status, t.description, t.create_time, t.auth, l.parent_id, l.name as labelname, l.level 
       from t_article t 
       left join t_label l 
       on t.label_id = l.id 
       where l.parent_id = ${labelId} and t.status = 1 order by create_time desc;`;
    try {
      const raws = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
      });
      // 记录类型篇数
      const obj = {};
      raws.map((item: any) => {
        if (obj[item.label_id]) {
          if (obj[item.label_id].children.length < 2) {
            obj[item.label_id].children.push(item);
          }
        } else {
          obj[item.label_id] = {
            id: item.label_id,
            labelName: item.labelname,
            children: [item],
          };
        }
      });

      return {
        statusCode: 200,
        data: Object.values(obj),
        msg: '查询成功',
      };
    } catch (err) {
      return {
        statusCode: 503,
        msg: `Service error: ${err}`,
      };
    }
  }
  async queryArticle(params: {
    id: number;
    searchText: string;
    page: number;
    pageSize: number;
    label_id: number;
    label_children_id: number;
  }): Promise<any> {
    const { id, searchText, page, pageSize, label_id, label_children_id } =
      params;
    const st = `title like '%${searchText || ''}%'`;
    const pid = label_id ? `and parent_id = ${label_id}` : '';
    const lid = label_children_id ? `and label_id = ${label_children_id}` : '';
    const aid = id ? `and id = ${id}` : '';
    const sql = `select 
    t.id, t.title, t.cover, t.sketch, t.content, t.label_id, t.status, t.description, t.create_time, t.auth, t.count, l.parent_id, l.name as labelname
       from t_article t 
       left join t_label l 
       on t.label_id = l.id 
       where ${st} ${pid} ${lid} and t.status = 1  order by create_time desc  
       limit ${(page - 1) * pageSize},${pageSize};`;
    const sqlTotal = `select count(1) as total from t_article t 
       left join t_label l 
       on t.label_id = l.id 
       where ${st} ${pid} ${lid} ${aid} and t.status = 1;`;
    try {
      let total: any[] = await sequelize.query(sqlTotal, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      let articleList: any[] = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return {
        statusCode: 200,
        data: Object.values(articleList),
        total: total[0].total,
        msg: '查询成功',
      };
    } catch (error) {
      console.error(error.message);
      return {
        statusCode: 500,
        msg: error.message,
        data: null,
      };
    }
  }
}
