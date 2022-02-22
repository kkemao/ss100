import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from '../logical/article/article.service';
import { LabelService } from '../logical/label/label.service';
import { QuestionService } from 'src/logical/question/question.service';

@Controller('wechat')
export class WechatController {
  constructor(
    private articleService: ArticleService,
    private labelService: LabelService,
    private questionService: QuestionService,
  ) {}

  @Get('label/all')
  async queryLabel() {
    return await this.labelService.queryLabel();
  }

  @Get('article/all')
  async findAllArticle() {
    return await this.articleService.findAllArticle();
  }

  @Post('article/all')
  async findArticle(@Body() body: any) {
    return await this.articleService.findArticle(body);
  }

  @Get('question/test')
  async findQuestion() {
    return await this.questionService.findQuestionTest();
  }
}
