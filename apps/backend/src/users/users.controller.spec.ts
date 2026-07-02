import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('UsersController', () => {
  let controller: UsersController;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findArtistClients: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtGuard = { canActivate: jest.fn(() => true) };
  const mockRolesGuard = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      const expected = [{ id: 'uuid-1', name: 'John' }];
      mockService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('findClients', () => {
    it('should call service.findArtistClients with the authenticated user id', async () => {
      const user = { id: 'artist-uuid', role: 'ARTIST' };
      const req = { user };
      const expected = [{ id: 'client-1', name: 'Maria' }];
      mockService.findArtistClients.mockResolvedValue(expected);

      const result = await controller.findClients(req as unknown as Request);

      expect(mockService.findArtistClients).toHaveBeenCalledWith('artist-uuid');
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a user for ARTIST', async () => {
      const user = { id: 'artist-uuid', role: 'ARTIST' };
      const req = { user };
      const expected = { id: 'uuid-1', name: 'John' };
      mockService.findOne.mockResolvedValue(expected);

      const result = await controller.findOne(
        req as unknown as Request,
        'uuid-1',
      );
      expect(result).toEqual(expected);
    });

    it('should return the user when CLIENT requests own id', async () => {
      const user = { id: 'my-uuid', role: 'CLIENT' };
      const req = { user };
      const expected = { id: 'my-uuid', name: 'John' };
      mockService.findOne.mockResolvedValue(expected);

      const result = await controller.findOne(
        req as unknown as Request,
        'my-uuid',
      );
      expect(result).toEqual(expected);
    });

    it('should throw ForbiddenException when CLIENT requests other user', () => {
      const user = { id: 'my-uuid', role: 'CLIENT' };
      const req = { user };

      expect(() =>
        controller.findOne(req as unknown as Request, 'other-uuid'),
      ).toThrow(ForbiddenException);
    });
  });

  describe('me', () => {
    it('should return the current user from request', () => {
      const user = {
        id: 'uuid-1',
        name: 'John',
        email: 'john@test.com',
        role: 'CLIENT',
      };
      const req = { user };
      const result = controller.getProfile(req as unknown as Request);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should allow ARTIST to update any user', async () => {
      const user = { id: 'artist-uuid', role: 'ARTIST' };
      const req = { user };
      const dto = { name: 'Updated' };
      const expected = { id: 'uuid-1', ...dto };
      mockService.update.mockResolvedValue(expected);

      const result = await controller.update(
        req as unknown as Request,
        'uuid-1',
        dto,
      );
      expect(result).toEqual(expected);
      expect(mockService.update).toHaveBeenCalledWith('uuid-1', dto);
    });

    it('should allow CLIENT to update own data', async () => {
      const user = { id: 'my-uuid', role: 'CLIENT' };
      const req = { user };
      const dto = { name: 'Updated' };
      const expected = { id: 'my-uuid', ...dto };
      mockService.update.mockResolvedValue(expected);

      const result = await controller.update(
        req as unknown as Request,
        'my-uuid',
        dto,
      );
      expect(result).toEqual(expected);
    });

    it('should throw ForbiddenException when CLIENT updates other user', () => {
      const user = { id: 'my-uuid', role: 'CLIENT' };
      const req = { user };

      expect(() =>
        controller.update(req as unknown as Request, 'other-uuid', {
          name: 'x',
        }),
      ).toThrow(ForbiddenException);
    });
  });

  describe('remove', () => {
    it('should delete a user and return it', async () => {
      const expected = { id: 'uuid-1' };
      mockService.remove.mockResolvedValue(expected);

      const result = await controller.remove('uuid-1');

      expect(mockService.remove).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(expected);
    });
  });
});
