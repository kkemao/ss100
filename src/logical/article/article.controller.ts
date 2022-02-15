import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from 'src/guards/rbac.guard';
import { roleConstans as role } from '../auth/constants';
import { ArticleService } from './article.service';

@ApiBearerAuth()
@ApiTags('article')
@UseGuards(AuthGuard('jwt'))
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @UseGuards(new RbacGuard(role.HUMAN))
  @Get('all')
  async findAllArticle() {
    return await this.articleService.findAllArticle();
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('all')
  async findArticle(@Body() body: any) {
    return await this.articleService.findArticle(body);
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('add')
  async addArticle(@Body() body: any) {
    return await this.articleService.addArticle(body);
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('update')
  async updateArticle(@Body() body: any) {
    return await this.articleService.updateArticle(body);
  }

  @UseGuards(new RbacGuard(role.ADMIN))
  @Get('delete')
  async deteleArticle(@Query() query: any) {
    return await this.articleService.deleteArticle(query.id);
  }
}
