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
import { CommissionsService } from './commissions.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/dto/create-user.dto';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('commissions')
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ARTIST)
  @Post()
  create(@Body() dto: CreateCommissionDto) {
    return this.commissionsService.create(dto);
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
  update(@Param('id') id: string, @Body() dto: UpdateCommissionDto) {
    return this.commissionsService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ARTIST)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commissionsService.remove(id);
  }
}
