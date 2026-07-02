import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommissionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: {
      title: string;
      description: string;
      price: number;
      clientId?: string;
      artistId?: string;
      deadline?: string;
    },
    userId: string,
    role: string,
  ) {
    let clientId: string;
    let artistId: string;

    if (role === 'CLIENT') {
      clientId = userId;
      artistId = dto.artistId!;
      if (!artistId) throw new BadRequestException('Artist ID is required');
      const artist = await this.prisma.user.findUnique({
        where: { id: artistId },
      });
      if (!artist) throw new NotFoundException('Artist not found');
    } else {
      clientId = dto.clientId!;
      if (!clientId) throw new BadRequestException('Client ID is required');
      artistId = userId;
      const client = await this.prisma.user.findUnique({
        where: { id: clientId },
      });
      if (!client) throw new NotFoundException('Client not found');
      if (client.role !== 'CLIENT')
        throw new BadRequestException('Client must have CLIENT role');
    }

    return this.prisma.commission.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        deadline: dto.deadline,
        clientId,
        artistId,
      },
    });
  }

  async findAll(userId: string, role: string) {
    const include = {
      client: { select: { id: true, name: true, email: true } },
    };
    if (role === 'CLIENT') {
      return this.prisma.commission.findMany({
        where: { clientId: userId },
        include,
      });
    }
    return this.prisma.commission.findMany({
      where: { artistId: userId },
      include,
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const commission = await this.findById(id);
    if (role === 'CLIENT' && commission.clientId !== userId) {
      throw new NotFoundException('Commission not found');
    }
    if (role === 'ARTIST' && commission.artistId !== userId) {
      throw new NotFoundException('Commission not found');
    }
    return commission;
  }

  async update(
    id: string,
    dto: Partial<{
      title: string;
      description: string;
      price: number;
      deadline: string;
    }>,
    userId: string,
  ) {
    const commission = await this.findById(id);
    if (commission.artistId !== userId) {
      throw new ForbiddenException('You can only update your own commissions');
    }
    return this.prisma.commission.update({ where: { id }, data: dto });
  }

  async updateStatus(id: string, status: Status, userId: string) {
    const commission = await this.findById(id);
    if (commission.artistId !== userId) {
      throw new ForbiddenException('You can only update your own commissions');
    }
    return this.prisma.commission.update({
      where: { id },
      data: { status },
    });
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
      include: {
        client: { select: { id: true, name: true, email: true } },
        artist: { select: { id: true, name: true, email: true } },
      },
    });
    if (!commission) throw new NotFoundException('Commission not found');
    return commission;
  }
}
