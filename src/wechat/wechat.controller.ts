import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from '../logical/article/article.service';

@Controller('wechat')
export class WechatController {
  constructor(private articleService: ArticleService) {}

  @Get('article/all')
  async findAllArticle() {
    return await this.articleService.findAllArticle();
  }

  @Post('article/all')
  async findArticle(@Body() body: any) {
    return await this.articleService.findArticle(body);
  }
}
