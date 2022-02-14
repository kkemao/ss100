import { Injectable } from '@nestjs/common';
import * as ExcelJs from 'exceljs';
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import * as Sequelize from 'sequelize';
import * as moment from 'moment';

export enum EQuestionType {
  单选题 = 1, // 单选题
  多选题 = 2, // 多选题
  判断题 = 3, //判断题
}
export enum EQStatus {
  在线 = 1, // 在线
  离线 = 2, // 离线
}
@Injectable()
export class FileService {
  async importExcel(): Promise<any> {}

  async addQuestion(
    labelList: any,
    questionInfoList: any,
    errorIndex: any,
  ): Promise<any> {
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
    } = questionInfoList[0];
    const sql = `
  INSERT INTO t_question 
  (title, cover, options, answer, origin, label_id, status, description, type, imageUrl, time) 
  VALUES 
  ('${title}', '${
      typeof cover === 'string' ? cover : cover.text
    }', '${options}', '${answer}', '${origin}', ${labelList[label_id]}, ${
      EQStatus[status]
    }, 
  '${description}', ${EQuestionType[type]}, '${imageUrl}', '${moment().format(
      'YYYY-MM-DD HH:mm:ss',
    )}');
  `;
    // console.log('zkf', this.labelList, label_id);
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.INSERT,
        raw: true,
      });
      if (questionInfoList.length <= 1) {
        return {
          statusCode: 200,
          data: errorIndex,
          msg: `导入成功${questionInfoList.length - errorIndex.length}条，失败${
            errorIndex.length
          }条`,
        };
      } else {
        this.addQuestion(labelList, questionInfoList.slice(1), errorIndex);
      }
    } catch (error) {
      errorIndex.push(id);
      if (questionInfoList.length <= 1) {
        return {
          statusCode: 200,
          data: errorIndex,
          msg: `导入成功${questionInfoList.length - errorIndex.length}条，失败${
            errorIndex.length
          }条`,
        };
      } else {
        this.addQuestion(labelList, questionInfoList.slice(1), errorIndex);
      }
    }
  }
  async addArticle(
    labelList: any,
    articleInfoList: any,
    errorIndex: any,
  ): Promise<any> {
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
    } = articleInfoList[0];
    const sql = `
    INSERT INTO t_article 
    (title, cover, sketch, content, label_id, status, description, create_time, auth) 
    VALUES 
    ('${title}', '${
      typeof cover === 'string' ? cover : cover.text
    }', '${sketch}', '${content}', ${labelList[label_id]}, ${EQStatus[status]}, 
    '${description}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', '${auth}');
    `;
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.INSERT,
        raw: true,
      });
      if (articleInfoList.length <= 1) {
        return {
          statusCode: 200,
          data: errorIndex,
          msg: `导入成功${articleInfoList.length - errorIndex.length}条，失败${
            errorIndex.length
          }条`,
        };
      } else {
        this.addArticle(labelList, articleInfoList.slice(1), errorIndex);
      }
    } catch (error) {
      errorIndex.push(id);
      if (articleInfoList.length <= 1) {
        return {
          statusCode: 500,
          data: errorIndex,
          msg: `导入成功${articleInfoList.length - errorIndex.length}条，失败${
            errorIndex.length
          }条`,
        };
      } else {
        this.addArticle(labelList, articleInfoList.slice(1), errorIndex);
      }
    }
  }
}
