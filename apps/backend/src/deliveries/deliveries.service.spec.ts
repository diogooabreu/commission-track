import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DeliveriesService', () => {
  let service: DeliveriesService;
  let prisma: PrismaService;

  const mockPrisma = {
    delivery: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    commission: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveriesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<DeliveriesService>(DeliveriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const dto = { fileUrl: 'https://cdn.com/art.png', notes: 'Final version', commissionId: 'comm-uuid' };

    it('should create a delivery', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({ id: 'comm-uuid' });
      const expected = { id: 'uuid-1', ...dto };
      mockPrisma.delivery.create.mockResolvedValue(expected);

      const result = await service.create(dto);
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException when commission does not exist', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue(null);
      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByCommission', () => {
    it('should return deliveries for a commission', async () => {
      const expected = [{ id: 'uuid-1', fileUrl: 'https://cdn.com/art.png' }];
      mockPrisma.delivery.findMany.mockResolvedValue(expected);

      const result = await service.findByCommission('comm-uuid');
      expect(result).toEqual(expected);
      expect(mockPrisma.delivery.findMany).toHaveBeenCalledWith({ where: { commissionId: 'comm-uuid' } });
    });
  });
});
