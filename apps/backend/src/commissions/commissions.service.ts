import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommissionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: {
      title: string;
      description: string;
      price: number;
      clientId: string;
    },
    artistId: string,
  ) {
    const client = await this.prisma.user.findUnique({
      where: { id: dto.clientId },
    });
    if (!client) throw new NotFoundException('Client not found');

    const artist = await this.prisma.user.findUnique({
      where: { id: artistId },
    });
    if (!artist) throw new NotFoundException('Artist not found');

    return this.prisma.commission.create({ data: { ...dto, artistId } });
  }

  async findAll(userId: string, role: string) {
    if (role === 'CLIENT') {
      return this.prisma.commission.findMany({
        where: { clientId: userId },
      });
    }
    return this.prisma.commission.findMany();
  }

  async findOne(id: string, userId: string, role: string) {
    const commission = await this.findById(id);
    if (role === 'CLIENT' && commission.clientId !== userId) {
      throw new NotFoundException('Commission not found');
    }
    return commission;
  }

  async update(
    id: string,
    dto: Partial<{ title: string; description: string; price: number }>,
    userId: string,
  ) {
    const commission = await this.findById(id);
    if (commission.artistId !== userId) {
      throw new ForbiddenException('You can only update your own commissions');
    }
    return this.prisma.commission.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string) {
    const commission = await this.findById(id);
    if (commission.artistId !== userId) {
      throw new ForbiddenException('You can only delete your own commissions');
    }
    await this.prisma.commission.delete({ where: { id } });
  }

  private async findById(id: string) {
    const commission = await this.prisma.commission.findUnique({
      where: { id },
    });
    if (!commission) throw new NotFoundException('Commission not found');
    return commission;
  }
}
