import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

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
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto = { name: 'John', email: 'john@test.com', password: '123456', role: 'CLIENT' as const };

    it('should create a user', async () => {
      const expected = { id: 'uuid-1', ...dto, createdAt: new Date(), updatedAt: new Date() };
      mockPrisma.user.create.mockResolvedValue(expected);

      const result = await service.create(dto);
      expect(result).toEqual(expected);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
    });

    it('should throw ConflictException on duplicate email', async () => {
      mockPrisma.user.create.mockRejectedValue({ code: 'P2002' });
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('should throw on unexpected error', async () => {
      mockPrisma.user.create.mockRejectedValue(new Error('DB error'));
      await expect(service.create(dto)).rejects.toThrow('DB error');
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expected = [{ id: 'uuid-1', name: 'John' }];
      mockPrisma.user.findMany.mockResolvedValue(expected);

      const result = await service.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const expected = { id: 'uuid-1', name: 'John' };
      mockPrisma.user.findUnique.mockResolvedValue(expected);

      const result = await service.findOne('uuid-1');
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
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
      expect(result).toEqual(updated);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.update('nonexistent', dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException on email conflict', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'uuid-1' });
      mockPrisma.user.update.mockRejectedValue({ code: 'P2002' });
      await expect(service.update('uuid-1', { email: 'taken@test.com' })).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'uuid-1' });
      mockPrisma.user.delete.mockResolvedValue({ id: 'uuid-1' });

      await expect(service.remove('uuid-1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.remove('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });
});
