import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliveriesService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: { fileUrl: string; notes?: string; commissionId: string },
    userId: string,
  ) {
    const commission = await this.prisma.commission.findUnique({
      where: { id: dto.commissionId },
    });
    if (!commission) throw new NotFoundException('Commission not found');
    if (commission.artistId !== userId)
      throw new ForbiddenException(
        'You can only deliver to your own commissions',
      );

    return this.prisma.delivery.create({ data: dto });
  }

  async findByCommission(commissionId: string, userId: string, role: string) {
    const commission = await this.prisma.commission.findUnique({
      where: { id: commissionId },
    });
    if (!commission) throw new NotFoundException('Commission not found');

    if (role === 'CLIENT' && commission.clientId !== userId) {
      throw new NotFoundException('Commission not found');
    }

    return this.prisma.delivery.findMany({ where: { commissionId } });
  }
}
