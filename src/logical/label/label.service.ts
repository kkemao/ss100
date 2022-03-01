import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import * as Sequelize from 'sequelize';

@Injectable()
export class LabelService {
  async findAllLabel(): Promise<any> {
    const sql = `select * from t_label;`;
    try {
      let rows: any[] = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      const labelList = {};
      rows
        .filter((row) => row.level === 1)
        .map((row) => {
          labelList[row.id] = {
            ...row,
            children: [],
          };
        });
      rows
        .filter((row) => row.level === 2)
        .map((row) => {
          labelList[row.parent_id]?.children.push(row);
        });
      return {
        statusCode: 200,
        data: Object.values(labelList),
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
  async queryLabel(): Promise<any> {
    const sql = `select * from t_label;`;
    try {
      let rows: any[] = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return {
        statusCode: 200,
        data: rows,
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
  async findSecondLevelLabel(): Promise<any> {
    const sql = `select * from t_label where level = 2;`;
    try {
      let rows: any[] = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return rows;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
  async addLabel(labelInfo: {
    name: string;
    level: number;
    parent_id: number;
    description: string;
    remark: string;
  }): Promise<any> {
    const sql = `insert into t_label values(${null}, '${labelInfo.name}', ${
      labelInfo.level
    }, ${labelInfo.parent_id}, '${labelInfo.description}', '${
      labelInfo.remark
    }')`;
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
  async updateLabel(labelInfo: {
    id: number;
    name: string;
    parent_id: number;
    description: string;
    remark: string;
  }): Promise<any> {
    const { id, name, parent_id, description, remark } = labelInfo;
    const sql = `update t_label set 
            name = '${name}', 
            parent_id = ${parent_id}, 
            description = '${description}', 
            remark = '${remark}' 
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
  async deleteLabel(id: number): Promise<any> {
    const checkSql = `(select q.title from t_question as q where q.label_id = ${id} limit 1) union all (select a.title as atitle from t_article as a where a.label_id = ${id} limit 1)`;
    try {
      const resultc = await sequelize.query(checkSql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
      });
      if (resultc.length) {
        return {
          statusCode: 1001,
          msg: '该类标签下有文章或者试题，请先转移。',
          data: null,
        };
      }
    } catch (error) {
      console.error(error.message);
      return {
        statusCode: 500,
        msg: error.message,
        data: null,
      };
    }
    const sql = `delete from t_label where id = ${id}`;
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.DELETE,
        raw: true,
      });
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
}
