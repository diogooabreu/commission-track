import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('$2a$10$hashed_password'),
}));

describe('UsersService', () => {
  let service: UsersService;

  const mockPrisma = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const rawDto = {
      name: 'John',
      email: '  JOHN@Example.com  ',
      password: '123456',
      role: 'CLIENT' as const,
    };

    it('should create a user with normalized email', async () => {
      const expected = {
        id: 'uuid-1',
        name: 'John',
        email: 'john@example.com',
        password: '123456',
        role: 'CLIENT' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrisma.user.create.mockResolvedValue(expected);

      const result = await service.create(rawDto);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          name: 'John',
          email: 'john@example.com',
          password: '123456',
          role: 'CLIENT',
        },
      });
      expect(result).toEqual(expected);
    });

    it('should throw ConflictException on duplicate email', async () => {
      mockPrisma.user.create.mockRejectedValue({ code: 'P2002' });
      await expect(service.create(rawDto)).rejects.toThrow(ConflictException);
    });

    it('should throw on unexpected error', async () => {
      mockPrisma.user.create.mockRejectedValue(new Error('DB error'));
      await expect(service.create(rawDto)).rejects.toThrow('DB error');
    });
  });

  describe('findAll', () => {
    it('should return all users without password', async () => {
      const expected = [{ id: 'uuid-1', name: 'John' }];
      mockPrisma.user.findMany.mockResolvedValue(expected);

      const result = await service.findAll();

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        omit: { password: true },
      });
      expect(result).toEqual(expected);
    });
  });

  describe('findArtistClients', () => {
    it('should return only CLIENT users with commissions for the artist', async () => {
      const artistId = 'artist-uuid';
      const expected = [
        { id: 'client-1', name: 'Maria', role: 'CLIENT' },
        { id: 'client-2', name: 'João', role: 'CLIENT' },
      ];
      mockPrisma.user.findMany.mockResolvedValue(expected);

      const result = await service.findArtistClients(artistId);

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        where: {
          role: 'CLIENT',
          commissionsAsClient: { some: { artistId } },
        },
        omit: { password: true },
      });
      expect(result).toEqual(expected);
    });

    it('should return empty array when no clients have commissions', async () => {
      mockPrisma.user.findMany.mockResolvedValue([]);

      const result = await service.findArtistClients('artist-uuid');

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id without password', async () => {
      const expected = { id: 'uuid-1', name: 'John' };
      mockPrisma.user.findUnique.mockResolvedValue(expected);

      const result = await service.findOne('uuid-1');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        omit: { password: true },
      });
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.findOne('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    const dto = { name: 'Updated' };

    it('should update a user', async () => {
      const existing = { id: 'uuid-1', name: 'John' };
      mockPrisma.user.findUnique.mockResolvedValue(existing);
      const updated = { id: 'uuid-1', name: 'Updated' };
      mockPrisma.user.update.mockResolvedValue(updated);

      const result = await service.update('uuid-1', dto);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        data: { name: 'Updated' },
        omit: { password: true },
      });
      expect(result).toEqual(updated);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.update('nonexistent', dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should normalize email on update', async () => {
      const existing = { id: 'uuid-1', name: 'John' };
      mockPrisma.user.findUnique.mockResolvedValue(existing);
      const updated = {
        id: 'uuid-1',
        name: 'John',
        email: 'normalized@test.com',
      };
      mockPrisma.user.update.mockResolvedValue(updated);

      const result = await service.update('uuid-1', {
        email: '  NORMALIZED@Test.com  ',
      });

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        data: { email: 'normalized@test.com' },
        omit: { password: true },
      });
      expect(result).toEqual(updated);
    });

    it('should throw ConflictException on email conflict', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'uuid-1' });
      mockPrisma.user.update.mockRejectedValue({ code: 'P2002' });
      await expect(
        service.update('uuid-1', { email: 'taken@test.com' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should hash password when provided', async () => {
      const existing = { id: 'uuid-1', name: 'John' };
      mockPrisma.user.findUnique.mockResolvedValue(existing);
      const updated = {
        id: 'uuid-1',
        name: 'John',
        password: '$2a$10$hashed_password',
      };
      mockPrisma.user.update.mockResolvedValue(updated);

      const result = await service.update('uuid-1', {
        password: 'new-password',
      });

      expect(bcrypt.hash).toHaveBeenCalledWith('new-password', 10);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        data: { password: '$2a$10$hashed_password' },
        omit: { password: true },
      });
      expect(result).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('should delete a user and return it without password', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'uuid-1' });
      mockPrisma.user.delete.mockResolvedValue({ id: 'uuid-1' });

      const result = await service.remove('uuid-1');

      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        omit: { password: true },
      });
      expect(result).toEqual({ id: 'uuid-1' });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.remove('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
