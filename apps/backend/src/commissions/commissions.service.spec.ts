import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
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
    const artistDto = {
      title: 'Portrait',
      description: 'Digital art',
      price: 150,
      clientId: 'client-uuid',
    };
    const artistId = 'artist-uuid';

    it('should create a commission as ARTIST', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'client-uuid',
        role: 'CLIENT',
      });
      const expected = {
        id: 'uuid-1',
        ...artistDto,
        artistId,
        status: 'PENDING',
      };
      mockPrisma.commission.create.mockResolvedValue(expected);

      const result = await service.create(artistDto, artistId, 'ARTIST');
      expect(result).toEqual(expected);
    });

    it('should throw BadRequestException when client role is not CLIENT (ARTIST create)', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'client-uuid',
        role: 'ARTIST',
      });

      await expect(
        service.create(artistDto, artistId, 'ARTIST'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when client does not exist (ARTIST create)', async () => {
      mockPrisma.user.findUnique.mockReset();
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(
        service.create(artistDto, artistId, 'ARTIST'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create a commission as CLIENT', async () => {
      const clientDto = {
        title: 'Portrait',
        description: 'Digital art',
        price: 150,
        artistId: 'artist-uuid',
      };
      const clientUserId = 'client-uuid';
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'artist-uuid',
        role: 'ARTIST',
      });
      const expected = {
        id: 'uuid-1',
        title: 'Portrait',
        description: 'Digital art',
        price: 150,
        clientId: clientUserId,
        artistId: 'artist-uuid',
        status: 'PENDING',
      };
      mockPrisma.commission.create.mockResolvedValue(expected);

      const result = await service.create(clientDto, clientUserId, 'CLIENT');
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException when artist does not exist (CLIENT create)', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);
      const clientDto = {
        title: 'Portrait',
        description: 'Digital art',
        price: 150,
        artistId: 'nonexistent-artist',
      };

      await expect(
        service.create(clientDto, 'client-uuid', 'CLIENT'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when CLIENT does not provide artistId', async () => {
      await expect(
        service.create(
          { title: 'Portrait', description: 'Art', price: 100 },
          'client-uuid',
          'CLIENT',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    const include = {
      client: { select: { id: true, name: true, email: true } },
    };

    it('should return all commissions for ARTIST', async () => {
      const expected = [{ id: 'uuid-1', title: 'Portrait' }];
      mockPrisma.commission.findMany.mockResolvedValue(expected);

      const result = await service.findAll('artist-uuid', 'ARTIST');

      expect(mockPrisma.commission.findMany).toHaveBeenCalledWith({
        where: { artistId: 'artist-uuid' },
        include,
      });
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
        include,
      });
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a commission by id for ARTIST', async () => {
      const expected = {
        id: 'uuid-1',
        title: 'Portrait',
        artistId: 'artist-uuid',
      };
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

  describe('updateStatus', () => {
    const userId = 'artist-uuid';

    it('should update status when artist is the owner', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'uuid-1',
        artistId: 'artist-uuid',
      });
      const updated = { id: 'uuid-1', status: 'IN_PROGRESS' };
      mockPrisma.commission.update.mockResolvedValue(updated);

      const result = await service.updateStatus(
        'uuid-1',
        'IN_PROGRESS',
        userId,
      );

      expect(mockPrisma.commission.update).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        data: { status: 'IN_PROGRESS' },
      });
      expect(result).toEqual(updated);
    });

    it('should throw ForbiddenException when artist is not the owner', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue({
        id: 'uuid-1',
        artistId: 'other-artist',
      });

      await expect(
        service.updateStatus('uuid-1', 'IN_PROGRESS', userId),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if commission does not exist', async () => {
      mockPrisma.commission.findUnique.mockResolvedValue(null);

      await expect(
        service.updateStatus('nonexistent', 'IN_PROGRESS', userId),
      ).rejects.toThrow(NotFoundException);
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
