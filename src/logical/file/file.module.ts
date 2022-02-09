import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { LabelService } from '../label/label.service';

@Module({
  providers: [FileService, LabelService],
  exports: [FileService, LabelService],
})
export class FileModule {}
