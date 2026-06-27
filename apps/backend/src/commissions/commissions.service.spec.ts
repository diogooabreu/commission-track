import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CommissionsService } from './commissions.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CommissionsService', () => {
  let service: CommissionsService;

  const mockPrisma = {
    commission: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommissionsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CommissionsService>(CommissionsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const dto = {
      title: 'Portrait',
      description: 'Digital art',
      price: 150,
      clientId: 'client-uuid',
    };
    const artistId = 'artist-uuid';

    it('should create a commission', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: 'client-uuid' });
      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: 'artist-uuid' });
      const expected = { id: 'uuid-1', ...dto, artistId, status: 'PENDING' };
      mockPrisma.commission.create.mockResolvedValue(expected);

      const result = await service.create(dto, artistId);
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException when client does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.create(dto, artistId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when artist does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: 'client-uuid' });
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);
      await expect(service.create(dto, artistId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all commissions for ARTIST', async () => {
      const expected = [{ id: 'uuid-1', title: 'Portrait' }];
      mockPrisma.commission.findMany.mockResolvedValue(expected);

      const result = await service.findAll('artist-uuid', 'ARTIST');

      expect(mockPrisma.commission.findMany).toHaveBeenCalledWith();
      expect(result).toEqual(expected);
    });

    it('should return only own commissions for CLIENT', async () => {
      const expected = [
        { id: 'uuid-1', title: 'Portrait', clientId: 'client-uuid' },
      ];
      mockPrisma.commission.findMany.mockResolvedValue(expected);

      const result = await service.findAll('client-uuid', 'CLIENT');

      expect(mockPrisma.commission.findMany).toHaveBeenCalledWith({
        where: { clientId: 'client-uuid' },
      });
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a commission by id for ARTIST', async () => {
      const expected = { id: 'uuid-1', title: 'Portrait' };
      mockPrisma.commission.findUnique.mockResolvedValue(expected);

      const result = await service.findOne('uuid-1', 'artist-uuid', 'ARTIST');

      expect(result).toEqual(expected);
    });

    it('should return a commission by id for CLIENT owner', async () => {
      const expected = {
        id: 'uuid-1',
        title: 'Portrait',
        clientId: 'client-uuid',
      };
      mockPrisma.commission.findUnique.mockResolvedValue(expected);

      const result = await service.findOne('uuid-1', 'client-uuid', 'CLIENT');

      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException when CLIENT tries to access another commission', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'uuid-1',
        title: 'Portrait',
        clientId: 'other-client',
      });

      await expect(
        service.findOne('uuid-1', 'client-uuid', 'CLIENT'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when commission not found', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue(null);

      await expect(
        service.findOne('nonexistent', 'any-id', 'ARTIST'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const dto = { title: 'Updated' };
    const userId = 'artist-uuid';

    it('should update a commission when artist is the owner', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'uuid-1',
        artistId: 'artist-uuid',
      });
      const updated = { id: 'uuid-1', title: 'Updated' };
      mockPrisma.commission.update.mockResolvedValue(updated);

      const result = await service.update('uuid-1', dto, userId);
      expect(result).toEqual(updated);
    });

    it('should throw ForbiddenException when artist is not the owner', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'uuid-1',
        artistId: 'other-artist',
      });

      await expect(service.update('uuid-1', dto, userId)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw NotFoundException if commission does not exist', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue(null);
      await expect(service.update('nonexistent', dto, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    const userId = 'artist-uuid';

    it('should delete a commission when artist is the owner', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'uuid-1',
        artistId: 'artist-uuid',
      });
      mockPrisma.commission.delete.mockResolvedValue({ id: 'uuid-1' });

      await expect(service.remove('uuid-1', userId)).resolves.toBeUndefined();
    });

    it('should throw ForbiddenException when artist is not the owner', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'uuid-1',
        artistId: 'other-artist',
      });

      await expect(service.remove('uuid-1', userId)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw NotFoundException if commission does not exist', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue(null);
      await expect(service.remove('nonexistent', userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
