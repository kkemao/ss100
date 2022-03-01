import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import * as Sequelize from 'sequelize';

@Injectable()
export class DashboardService {
  async getAllCount(): Promise<any> {
    const data: any = {};
    try {
      const userCountSql = `select count(1) as total from t_wechat_user;`;
      let userCounts: any[] = await sequelize.query(userCountSql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      data['user'] = userCounts[0].total;

      const questionCountSql = `select count(1) as total from t_question;`;
      let questionCounts: any[] = await sequelize.query(questionCountSql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      data['question'] = questionCounts[0].total;

      const articleCountSql = `select count(1) as total, sum(count) as count from t_article;`;
      let articleCounts: any[] = await sequelize.query(articleCountSql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      data['article'] = articleCounts[0].total;
      data['articleCount'] = articleCounts[0].count;

      const labelCountSql = `select count(1) as total from t_label;`;
      let labelCounts: any[] = await sequelize.query(labelCountSql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      data['label'] = labelCounts[0].total;
      return {
        statusCode: 200,
        data,
        msg: '查询成功',
      };
    } catch (error) {
      return {
        statusCode: 500,
        data: null,
        msg: error.message,
      };
    }
  }
}
