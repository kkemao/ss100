import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from 'src/guards/rbac.guard';
import { roleConstans as role } from 'src/logical/auth/constants'; // 引入角色常量
import { DashboardService } from './dashboard.service';

@ApiBearerAuth()
@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(new RbacGuard(role.HUMAN))
  @Get('count')
  async getTotalCount(@Param() param: any) {
    return await this.dashboardService.getAllCount();
  }
}
