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

@ApiBearerAuth()
@ApiTags('file')
@Controller('file')
@UseGuards(AuthGuard('jwt'))
export class FileController {
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
          cb(
            null,
            `${req.user?.accountName}__${
              req.user?.id
            }__${new Date().getTime()}.${file.mimetype.split('/')[1]}`,
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
}
