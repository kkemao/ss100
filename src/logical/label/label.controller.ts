import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from 'src/guards/rbac.guard';
import { LabelService } from './label.service';
import { roleConstans as role } from 'src/logical/auth/constants'; // 引入角色常量

@ApiBearerAuth()
@ApiTags('label')
@UseGuards(AuthGuard('jwt'))
@Controller('label')
export class LabelController {
  constructor(private labelService: LabelService) {}

  @UseGuards(new RbacGuard(role.HUMAN))
  @Get('all')
  async findAllLabel() {
    return await this.labelService.findAllLabel();
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('add')
  async addLabel(@Body() body: any) {
    return await this.labelService.addLabel(body);
  }

  @UseGuards(new RbacGuard(role.HUMAN))
  @Post('update')
  async updateLabel(@Body() body: any) {
    return await this.labelService.updateLabel(body);
  }

  @UseGuards(new RbacGuard(role.ADMIN))
  @Get('delete')
  async deteleLabel(@Query() query: any) {
    return await this.labelService.deleteLabel(query.id);
  }
}
