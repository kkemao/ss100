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
          if (key === 'content') {
            _obj[key] =
              typeof _obj[key] === 'string' ? _obj[key] : _obj[key].text;
            const content = [];
            const arr = _obj[key].split('||');
            arr.map((item: string) => {
              content.push({
                type:
                  item.startsWith('http') ||
                  item.endsWith('.png') ||
                  item.endsWith('.jpeg') ||
                  item.endsWith('.jpg')
                    ? 1
                    : 2,
                content: item,
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
    const res = await this.fileService.addArticle(this.labelList, result, []);
    return res;
  }

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
          _obj[obj[titleArr[colNumber - 1]]] = cell.value;
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
    const res = await this.fileService.addQuestion(this.labelList, result, []);
    console.log('zkf', res);
    return res;
  }
}
