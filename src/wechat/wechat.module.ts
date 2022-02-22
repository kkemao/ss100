import { Module } from '@nestjs/common';
import { WechatController } from './wechat.controller';
import { WechatService } from './wechat.service';
import { ArticleService } from 'src/logical/article/article.service';
import { LabelService } from 'src/logical/label/label.service';
import { QuestionService } from 'src/logical/question/question.service';

@Module({
  controllers: [WechatController],
  providers: [WechatService, ArticleService, LabelService, QuestionService],
})
export class WechatModule {}
