import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DeliveriesService', () => {
  let service: DeliveriesService;

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
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const dto = {
      fileUrl: 'https://cdn.com/art.png',
      notes: 'Final version',
      commissionId: 'comm-uuid',
    };

    it('should create a delivery when artist owns the commission', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'comm-uuid',
        artistId: 'artist-uuid',
      });
      const expected = { id: 'uuid-1', ...dto };
      mockPrisma.delivery.create.mockResolvedValue(expected);

      const result = await service.create(dto, 'artist-uuid');
      expect(result).toEqual(expected);
    });

    it('should throw ForbiddenException when artist does not own the commission', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'comm-uuid',
        artistId: 'other-artist',
      });

      await expect(service.create(dto, 'artist-uuid')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw NotFoundException when commission does not exist', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue(null);
      await expect(service.create(dto, 'artist-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByCommission', () => {
    it('should return deliveries for ARTIST', async () => {
      const expected = [{ id: 'uuid-1', fileUrl: 'https://cdn.com/art.png' }];
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'comm-uuid',
        clientId: 'client-uuid',
      });
      mockPrisma.delivery.findMany.mockResolvedValue(expected);

      const result = await service.findByCommission(
        'comm-uuid',
        'artist-uuid',
        'ARTIST',
      );

      expect(mockPrisma.delivery.findMany).toHaveBeenCalledWith({
        where: { commissionId: 'comm-uuid' },
      });
      expect(result).toEqual(expected);
    });

    it('should return deliveries for CLIENT owner', async () => {
      const expected = [{ id: 'uuid-1', fileUrl: 'https://cdn.com/art.png' }];
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'comm-uuid',
        clientId: 'client-uuid',
      });
      mockPrisma.delivery.findMany.mockResolvedValue(expected);

      const result = await service.findByCommission(
        'comm-uuid',
        'client-uuid',
        'CLIENT',
      );

      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException for CLIENT not owning the commission', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'comm-uuid',
        clientId: 'other-client',
      });

      await expect(
        service.findByCommission('comm-uuid', 'client-uuid', 'CLIENT'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when commission does not exist', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue(null);

      await expect(
        service.findByCommission('comm-uuid', 'any-id', 'ARTIST'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
