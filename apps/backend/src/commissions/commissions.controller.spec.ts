import { Test, TestingModule } from '@nestjs/testing';
import { CommissionsController } from './commissions.controller';
import { CommissionsService } from './commissions.service';

describe('CommissionsController', () => {
  let controller: CommissionsController;
  let service: CommissionsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionsController],
      providers: [{ provide: CommissionsService, useValue: mockService }],
    }).compile();

    controller = module.get<CommissionsController>(CommissionsController);
    service = module.get<CommissionsService>(CommissionsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with DTO', async () => {
      const dto = { title: 'Portrait', description: 'Art', price: 150, clientId: 'c1', artistId: 'a1' };
      const expected = { id: 'uuid-1', ...dto };
      mockService.create.mockResolvedValue(expected);

      const result = await controller.create(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all commissions', async () => {
      const expected = [{ id: 'uuid-1', title: 'Portrait' }];
      mockService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a commission by id', async () => {
      const expected = { id: 'uuid-1', title: 'Portrait' };
      mockService.findOne.mockResolvedValue(expected);

      const result = await controller.findOne('uuid-1');
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('should update a commission', async () => {
      const dto = { title: 'Updated' };
      const expected = { id: 'uuid-1', title: 'Updated' };
      mockService.update.mockResolvedValue(expected);

      const result = await controller.update('uuid-1', dto);
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should delete a commission', async () => {
      await controller.remove('uuid-1');
      expect(mockService.remove).toHaveBeenCalledWith('uuid-1');
    });
  });
});
