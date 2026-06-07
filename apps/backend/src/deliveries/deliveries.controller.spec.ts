import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';

describe('DeliveriesController', () => {
  let controller: DeliveriesController;
  let service: DeliveriesService;

  const mockService = {
    create: jest.fn(),
    findByCommission: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesController],
      providers: [{ provide: DeliveriesService, useValue: mockService }],
    }).compile();

    controller = module.get<DeliveriesController>(DeliveriesController);
    service = module.get<DeliveriesService>(DeliveriesService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with DTO', async () => {
      const dto = { fileUrl: 'https://cdn.com/art.png', notes: 'Final', commissionId: 'comm-uuid' };
      const expected = { id: 'uuid-1', ...dto };
      mockService.create.mockResolvedValue(expected);

      const result = await controller.create(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('findByCommission', () => {
    it('should return deliveries for a commission', async () => {
      const expected = [{ id: 'uuid-1', fileUrl: 'https://cdn.com/art.png' }];
      mockService.findByCommission.mockResolvedValue(expected);

      const result = await controller.findByCommission('comm-uuid');
      expect(result).toEqual(expected);
    });
  });
});
