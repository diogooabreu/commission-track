import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../users/dto/create-user.dto';

describe('DeliveriesController', () => {
  let controller: DeliveriesController;

  const mockService = {
    create: jest.fn(),
    findByCommission: jest.fn(),
  };

  const mockJwtGuard = { canActivate: jest.fn(() => true) };
  const mockRolesGuard = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesController],
      providers: [{ provide: DeliveriesService, useValue: mockService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    controller = module.get<DeliveriesController>(DeliveriesController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with DTO', async () => {
      const dto = {
        fileUrl: 'https://cdn.com/art.png',
        notes: 'Final',
        commissionId: 'comm-uuid',
      };
      const expected = { id: 'uuid-1', ...dto };
      mockService.create.mockResolvedValue(expected);

      const result = await controller.create(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('findByCommission', () => {
    it('should return deliveries for a commission', async () => {
      const user = { id: 'client-uuid', role: Role.CLIENT };
      const req = { user };
      const expected = [{ id: 'uuid-1', fileUrl: 'https://cdn.com/art.png' }];
      mockService.findByCommission.mockResolvedValue(expected);

      const result = await controller.findByCommission(
        req as unknown as Request,
        'comm-uuid',
      );

      expect(mockService.findByCommission).toHaveBeenCalledWith(
        'comm-uuid',
        'client-uuid',
        Role.CLIENT,
      );
      expect(result).toEqual(expected);
    });
  });
});
