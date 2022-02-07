import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import * as Sequelize from 'sequelize';
import * as moment from 'moment';

@Injectable()
export class QuestionService {
  async findAllQuestion(): Promise<any> {
    const sql = `select t.id, t.title, t.cover, t.options, t.answer, t.origin, t.label_id, t.status, t.description, t.type, t.imageUrl, t.time, l.parent_id from t_question t left join t_label l on t.label_id = l.id;`;
    try {
      let questionList: any[] = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return {
        statusCode: 200,
        data: Object.values(questionList),
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

  async deleteQuestion(id: number): Promise<any> {
    const sql = `delete from t_question where id = ${id}`;
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

  async addQuestion(questionInfo: any): Promise<any> {
    const {
      title,
      cover = '',
      options,
      answer,
      origin,
      label_id,
      status,
      description,
      type,
      imageUrl = '',
    } = questionInfo;
    const sql = `
    INSERT INTO t_question 
    (title, cover, options, answer, origin, label_id, status, description, type, imageUrl, time) 
    VALUES 
    ('${title}', '${cover}', '${options}', '${answer}', '${origin}', ${label_id}, ${status}, 
    '${description}', ${type}, '${imageUrl}', '${moment().format(
      'YYYY-MM-DD HH:mm:ss',
    )}');
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
  async updateLabel(questionInfo: any): Promise<any> {
    const {
      id,
      title,
      cover = '',
      options,
      answer,
      origin,
      label_id,
      status,
      description,
      type,
      imageUrl = '',
    } = questionInfo;
    const sql = `update t_question set 
            title = '${title}', 
            cover = '${cover}', 
            options = '${options}', 
            answer = '${answer}', 
            origin = '${origin}', 
            label_id = ${label_id}, 
            status = ${status}, 
            type = ${type}, 
            imageUrl = '${imageUrl}', 
            description = '${description}', 
            time = '${moment().format('YYYY-MM-DD HH:mm:ss')}' 
        where id = ${id}`;
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.UPDATE,
        raw: true,
      });
      console.log('zkf', result);
      return {
        statusCode: 200,
        msg: '更新成功',
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