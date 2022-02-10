import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from 'src/guards/rbac.guard';
import { roleConstans as role } from '../auth/constants';
import { QuestionService } from './question.service';

@ApiBearerAuth()
@ApiTags('question')
@UseGuards(AuthGuard('jwt'))
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @UseGuards(new RbacGuard(role.HUMAN))
  @Get('all')
  async findAllQuestion() {
    return await this.questionService.findAllQuestion();
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('all')
  async findQuestion(@Body() body: any) {
    return await this.questionService.findQuestion(body);
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('add')
  async addQuestion(@Body() body: any) {
    return await this.questionService.addQuestion(body);
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('update')
  async updateQuestion(@Body() body: any) {
    return await this.questionService.updateQuestion(body);
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Get('delete')
  async deteleQuestion(@Query() query: any) {
    return await this.questionService.deleteQuestion(query.id);
  }
}
