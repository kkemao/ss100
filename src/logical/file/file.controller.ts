import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as moment from 'moment';
import { diskStorage } from 'multer';
import * as ExcelJs from 'exceljs';
import { FileService } from './file.service';
import { LabelService } from '../label/label.service';
import { RbacGuard } from 'src/guards/rbac.guard';
import { roleConstans as role } from 'src/logical/auth/constants'; // 引入角色常量
import * as admZip from 'adm-zip';
import * as iconv from 'iconv-lite';

const urlCheck = (url: any): string => {
  if (!url) return '';
  url = typeof url === 'string' ? url : url.text;
  // 如果是完整的链接直接存入，否则增加存储前缀
  url = url.startsWith('http') ? url : `/fileUpload/image/${url}`;
  return url;
};
const isImage = (value: any): boolean =>
  value.endsWith('.png') || value.endsWith('.jpeg') || value.endsWith('.jpg');

@ApiBearerAuth()
@ApiTags('file')
@Controller('file')
@UseGuards(AuthGuard('jwt'))
export class FileController {
  labelList: {};
  constructor(
    private fileService: FileService,
    private labelService: LabelService,
  ) {}

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = `./fileUpload/${moment().format('YYYY-MM-DD')}`;
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
          cb(null, path);
        },
        filename: (req: any, file, cb) => {
          const typeArr = file.originalname.split('.');
          cb(
            null,
            `${req.user?.accountName}__${
              req.user?.id
            }__${new Date().getTime()}.${typeArr[typeArr.length - 1]}`,
          );
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      statusCode: 200,
      url: '/' + file.path,
      msg: '上传成功',
    };
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('images')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const path = `./fileUpload/image`;
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
          cb(null, path);
        },
        filename: (req: any, file, cb) => {
          const typeArr = file.originalname.split('.');
          cb(
            null,
            `${req.user?.accountName}__${
              req.user?.id
            }__${new Date().getTime()}.${typeArr[typeArr.length - 1]}`,
          );
        },
      }),
    }),
  )
  uploadBatchImage(@UploadedFile() file: Express.Multer.File) {
    const zip = new admZip(file.path);
    const zipEntries = zip.getEntries();
    for (let i = 0; i < zipEntries.length; i++) {
      let entry = zipEntries[i];
      entry.entryName = iconv.decode(entry.rawEntryName, 'utf-8');
    }
    zip.extractAllTo(`./fileUpload/image`);
    return {
      statusCode: 200,
      url: '/' + file.path,
      msg: '图片上传成功',
    };
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('importArticle')
  @UseInterceptors(FileInterceptor('file'))
  async importArticle(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { buffer } = file;
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(1);
    const obj = {
      编号: 'id',
      标题: 'title',
      简述: 'sketch',
      内容: 'content',
      封面: 'cover',
      备注: 'description',
      类别: 'parent_id',
      子类别: 'label_id',
      状态: 'status',
      作者: 'auth',
    };
    const titleArr = []; //列头内容
    const result = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell, colNumber) => {
          titleArr.push(cell.value);
        });
      }
      if (rowNumber > 1) {
        const _obj = {};
        row.eachCell((cell, colNumber) => {
          const key = obj[titleArr[colNumber - 1]];
          _obj[key] = cell.value;
          _obj[key] =
            typeof _obj[key] === 'object' ? _obj[key].text : _obj[key];
          if (key === 'cover') {
            _obj[key] = isImage(_obj[key]) && urlCheck(_obj[key]);
          }
          if (key === 'content') {
            const content = [];
            const arr = _obj[key].split('||');
            arr.map((item: string) => {
              content.push({
                type: isImage(item) ? 1 : 2,
                content: isImage(item) ? urlCheck(item) : item,
              });
            });
            _obj[key] = JSON.stringify(content);
          }
        });
        result.push(_obj);
      }
    });
    if (!result.length) {
      return {
        statusCode: 200,
        msg: 'excel文章为空，请确认',
      };
    }
    let labelList = await this.labelService.findSecondLevelLabel();
    const labelObj = {};
    labelList.map((item: any) => {
      labelObj[item.name] = item.id;
    });
    this.labelList = labelObj;
    let rightList = [],
      errMsg = '';
    result.map((item, index) => {
      const { id, title, sketch, content, label_id } = item;
      if (!title || !this.labelList[label_id] || !content || !sketch) {
        if (!title) {
          errMsg += `序号${id} 标题不能为空；`;
        }
        if (!sketch) {
          errMsg += `序号${id} 简述不能为空；`;
        }
        if (!content) {
          errMsg += `序号${id} 内容不能为空；`;
        }
        if (!this.labelList[label_id]) {
          errMsg += `序号${id} 标签无法在平台找到；`;
        }
      } else {
        rightList.push(item);
      }
    });
    if (!rightList.length) {
      return {
        statusCode: 200,
        msg: `导入成功${rightList.length}条，失败信息：【${errMsg}】`,
      };
    }
    const res = await this.fileService.addArticle(this.labelList, rightList);
    return {
      ...res,
      msg:
        res.statusCode === 500
          ? res.msg
          : `导入成功${rightList.length}条，失败信息：【${errMsg}】`,
    };
  }

  // 上传试题
  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { buffer } = file;
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(1);
    const obj = {
      编号: 'id',
      题型: 'type',
      题目: 'title',
      封面: 'cover',
      选项: 'options',
      答案: 'answer',
      来源: 'origin',
      解释: 'description',
      类别: 'parent_id',
      子类别: 'label_id',
      状态: 'status',
    };
    const titleArr = []; //列头内容
    const result = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell, colNumber) => {
          titleArr.push(cell.value);
        });
      }
      if (rowNumber > 1) {
        const _obj = {};
        row.eachCell((cell, colNumber) => {
          const key = obj[titleArr[colNumber - 1]];
          _obj[key] = cell.value;
          _obj[key] =
            typeof _obj[key] === 'object' ? _obj[key].text : _obj[key];
          if (key === 'cover') {
            _obj[key] = isImage(_obj[key]) && urlCheck(_obj[key]);
          }
          // _obj[obj[titleArr[colNumber - 1]]] = _obj[key];
        });
        result.push(_obj);
      }
    });
    if (!result.length) {
      return {
        statusCode: 200,
        msg: 'excel试题为空，请确认',
      };
    }
    let labelList = await this.labelService.findSecondLevelLabel();
    const labelObj = {};
    labelList.map((item: any) => {
      labelObj[item.name] = item.id;
    });
    this.labelList = labelObj;
    let rightList = [],
      errMsg = '';
    result.map((item, index) => {
      const { id, title, answer, label_id, type } = item;
      if (!title || !answer || !this.labelList[label_id] || !type) {
        if (!title) {
          errMsg += `序号${id} 标题不能为空；`;
        }
        if (!answer) {
          errMsg += `序号${id} 答案不能为空；`;
        }
        if (!this.labelList[label_id]) {
          errMsg += `序号${id} 标签无法在平台找到；`;
        }
        if (!type) {
          errMsg += `序号${id} 题型不能为空；`;
        }
      } else {
        rightList.push(item);
      }
    });
    if (!rightList.length) {
      return {
        statusCode: 200,
        msg: `导入成功${rightList.length}条，失败信息：【${errMsg}】`,
      };
    }
    const res = await this.fileService.addQuestion(this.labelList, rightList);
    return {
      ...res,
      msg:
        res.statusCode === 500
          ? res.msg
          : `导入成功${rightList.length}条，失败信息：【${errMsg}】`,
    };
  }
}
