import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  create(@Body() dto: any) {
    return this.deliveriesService.create(dto);
  }

  @Get(':commissionId')
  findByCommission(@Param('commissionId') commissionId: string) {
    return this.deliveriesService.findByCommission(commissionId);
  }
}
