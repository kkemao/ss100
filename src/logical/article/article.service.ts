import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import * as Sequelize from 'sequelize';
import * as moment from 'moment';

@Injectable()
export class ArticleService {
  async findAllArticle(): Promise<any> {
    const sql = `select t.id, t.title, t.cover, t.sketch, t.content, t.label_id, t.status, t.description, t.create_time, t.auth, t.count, l.parent_id from t_article t left join t_label l on t.label_id = l.id order by create_time desc;`;
    try {
      let articleList: any[] = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return {
        statusCode: 200,
        data: Object.values(articleList),
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
  async findArticle(params: {
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
       where ${st} ${pid} ${lid}  order by create_time desc  
       limit ${(page - 1) * pageSize},${pageSize};`;
    const sqlTotal = `select count(1) as total from t_article t 
       left join t_label l 
       on t.label_id = l.id 
       where ${st} ${pid} ${lid} ${aid} ;`;
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

  async deleteArticle(id: number): Promise<any> {
    const sql = `delete from t_article where id = ${id}`;
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.DELETE,
        raw: true,
      });
      console.log('zkf', result);
      return {
        statusCode: 200,
        msg: '删除成功',
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

  async addArticle(articleInfo: any): Promise<any> {
    const {
      title,
      cover = '',
      sketch,
      content,
      label_id,
      status,
      description,
      auth,
    } = articleInfo;
    const sql = `
    INSERT INTO t_article 
    (title, cover, sketch, content, label_id, status, description, create_time, auth, count) 
    VALUES 
    ('${title}', '${cover}', '${sketch}', '${content}', ${label_id}, ${status}, 
    '${description}', '${moment().format(
      'YYYY-MM-DD HH:mm:ss',
    )}', '${auth}', 0);
    `;
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.INSERT,
        raw: true,
      });
      return {
        statusCode: 200,
        msg: '添加成功',
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
  async updateArticle(articleInfo: any): Promise<any> {
    const {
      id,
      title,
      cover = '',
      sketch,
      content,
      label_id,
      status,
      description,
      auth,
    } = articleInfo;
    const sql = `update t_article set 
            title = '${title}', 
            cover = '${cover}', 
            sketch = '${sketch}', 
            content = '${content}', 
            label_id = ${label_id}, 
            status = ${status}, 
            description = '${description}', 
            create_time = '${moment().format('YYYY-MM-DD HH:mm:ss')}' ,
            auth = '${auth}'
        where id = ${id}`;
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.UPDATE,
        raw: true,
      });
      return {
        statusCode: 200,
        msg: '更新成功',
      };
    } catch (error) {
      console.error('zkf-error', content, sql, error.message);
      return {
        statusCode: 500,
        msg: error.message,
        data: null,
      };
    }
  }
}
