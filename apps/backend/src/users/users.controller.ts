import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Param,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './dto/create-user.dto';
import type { Request } from 'express';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ARTIST)
  @Get('clients')
  findClients(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.usersService.findArtistClients(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { id: string; role: Role };
    if (user.role !== Role.ARTIST && user.id !== id) {
      throw new ForbiddenException('You can only access your own data');
    }
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    const user = req.user as { id: string; role: Role };
    if (user.role !== Role.ARTIST && user.id !== id) {
      throw new ForbiddenException('You can only update your own data');
    }
    return this.usersService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ARTIST)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
