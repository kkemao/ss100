import { Module } from '@nestjs/common';
import { WechatController } from './wechat.controller';
import { WechatService } from './wechat.service';
import { ArticleService } from '../logical/article/article.service';

@Module({
  controllers: [WechatController],
  providers: [WechatService, ArticleService],
})
export class WechatModule {}
