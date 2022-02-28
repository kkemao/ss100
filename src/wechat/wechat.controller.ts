import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from '../logical/article/article.service';
import { LabelService } from '../logical/label/label.service';
import { QuestionService } from 'src/logical/question/question.service';
import { WechatService } from './wechat.service';

@Controller('wechat')
export class WechatController {
  constructor(
    private wechatService: WechatService,
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

  @Get('auth/session')
  async getSession(@Query() query: any) {
    return await this.wechatService.getSession(query.code);
  }

  @Post('auth/create')
  async createAuth(@Body() body: any) {
    return await this.wechatService.createAuth(body);
  }

  @Post('answer/save')
  async saveAnswer(@Body() body: any) {
    return await this.wechatService.saveAnswer(body);
  }

  @Get('updatelogin')
  async updateLogin(@Query() query: any) {
    return await this.wechatService.updateLogin(query.phoneNumber);
  }

  @Get('updatearticlecount')
  async updateArticleCount(@Query() query: any) {
    return await this.wechatService.updateArticleCount(query.id);
  }

  @Get('getarticle')
  async getArticle(@Query() query: any) {
    // labelId 为大类id
    return await this.wechatService.findArticle(query.labelId);
  }

  @Post('getarticle/labelparentid')
  async getArticleBylabelId(@Body() body: any) {
    // labelId为小类id
    return await this.articleService.findArticle(body);
  }
}
