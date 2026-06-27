import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('UsersController', () => {
  let controller: UsersController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockGuard = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expected = [{ id: 'uuid-1', name: 'John' }];
      mockService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const expected = { id: 'uuid-1', name: 'John' };
      mockService.findOne.mockResolvedValue(expected);

      const result = await controller.findOne('uuid-1');
      expect(result).toEqual(expected);
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
    it('should update a user', async () => {
      const dto = { name: 'Updated' };
      const expected = { id: 'uuid-1', ...dto };
      mockService.update.mockResolvedValue(expected);

      const result = await controller.update('uuid-1', dto);
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      await controller.remove('uuid-1');
      expect(mockService.remove).toHaveBeenCalledWith('uuid-1');
    });
  });
});
