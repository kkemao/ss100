import { Module } from '@nestjs/common';
import { WechatController } from './wechat.controller';
import { WechatService } from './wechat.service';
import { ArticleService } from '../logical/article/article.service';
import { LabelService } from '../logical/label/label.service';

@Module({
  controllers: [WechatController],
  providers: [WechatService, ArticleService, LabelService],
})
export class WechatModule {}
