import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { CommissionsController } from './commissions.controller';
import { CommissionsService } from './commissions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../users/dto/create-user.dto';

describe('CommissionsController', () => {
  let controller: CommissionsController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    updateStatus: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtGuard = { canActivate: jest.fn(() => true) };
  const mockRolesGuard = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionsController],
      providers: [{ provide: CommissionsService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    controller = module.get<CommissionsController>(CommissionsController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with DTO, userId and role for ARTIST', async () => {
      const user = { id: 'artist-uuid', role: 'ARTIST' };
      const req = { user };
      const dto = {
        title: 'Portrait',
        description: 'Art',
        price: 150,
        clientId: 'c1',
      };
      const expected = { id: 'uuid-1', ...dto, artistId: 'artist-uuid' };
      mockService.create.mockResolvedValue(expected);

      const result = await controller.create(req as unknown as Request, dto);

      expect(mockService.create).toHaveBeenCalledWith(
        dto,
        'artist-uuid',
        'ARTIST',
      );
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all commissions for authenticated user', async () => {
      const user = { id: 'artist-uuid', role: Role.ARTIST };
      const req = { user };
      const expected = [{ id: 'uuid-1', title: 'Portrait' }];
      mockService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll(req as unknown as Request);

      expect(mockService.findAll).toHaveBeenCalledWith(
        'artist-uuid',
        Role.ARTIST,
      );
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a commission by id', async () => {
      const user = { id: 'client-uuid', role: Role.CLIENT };
      const req = { user };
      const expected = { id: 'uuid-1', title: 'Portrait' };
      mockService.findOne.mockResolvedValue(expected);

      const result = await controller.findOne(
        req as unknown as Request,
        'uuid-1',
      );

      expect(mockService.findOne).toHaveBeenCalledWith(
        'uuid-1',
        'client-uuid',
        Role.CLIENT,
      );
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('should call service.update with DTO and userId', async () => {
      const user = { id: 'artist-uuid' };
      const req = { user };
      const dto = { title: 'Updated' };
      const expected = { id: 'uuid-1', title: 'Updated' };
      mockService.update.mockResolvedValue(expected);

      const result = await controller.update(
        req as unknown as Request,
        'uuid-1',
        dto,
      );

      expect(mockService.update).toHaveBeenCalledWith(
        'uuid-1',
        dto,
        'artist-uuid',
      );
      expect(result).toEqual(expected);
    });
  });

  describe('updateStatus', () => {
    it('should call service.updateStatus with status and userId', async () => {
      const user = { id: 'artist-uuid' };
      const req = { user };
      const dto = { status: 'IN_PROGRESS' };
      const expected = { id: 'uuid-1', status: 'IN_PROGRESS' };
      mockService.updateStatus.mockResolvedValue(expected);

      const result = await controller.updateStatus(
        req as unknown as Request,
        'uuid-1',
        dto,
      );

      expect(mockService.updateStatus).toHaveBeenCalledWith(
        'uuid-1',
        'IN_PROGRESS',
        'artist-uuid',
      );
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should call service.remove with id and userId and return result', async () => {
      const user = { id: 'artist-uuid' };
      const req = { user };
      const expected = { id: 'uuid-1' };
      mockService.remove.mockResolvedValue(expected);

      const result = await controller.remove(
        req as unknown as Request,
        'uuid-1',
      );

      expect(mockService.remove).toHaveBeenCalledWith('uuid-1', 'artist-uuid');
      expect(result).toEqual(expected);
    });
  });
});
