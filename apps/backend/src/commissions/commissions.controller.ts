import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CommissionsService } from './commissions.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { UpdateCommissionStatusDto } from './dto/update-commission-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/dto/create-user.dto';
import type { Request } from 'express';

@ApiTags('Commissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('commissions')
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ARTIST)
  @Post()
  create(@Req() req: Request, @Body() dto: CreateCommissionDto) {
    const user = req.user as { id: string };
    return this.commissionsService.create(dto, user.id);
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as { id: string; role: string };
    return this.commissionsService.findAll(user.id, user.role);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { id: string; role: string };
    return this.commissionsService.findOne(id, user.id, user.role);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ARTIST)
  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateCommissionDto,
  ) {
    const user = req.user as { id: string };
    return this.commissionsService.update(id, dto, user.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ARTIST)
  @Patch(':id/status')
  updateStatus(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateCommissionStatusDto,
  ) {
    const user = req.user as { id: string };
    return this.commissionsService.updateStatus(id, dto.status, user.id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ARTIST)
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { id: string };
    await this.commissionsService.remove(id, user.id);
  }
}
