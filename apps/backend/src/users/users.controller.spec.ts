import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with DTO', async () => {
      const dto = { name: 'John', email: 'john@test.com', password: '123456', role: 'CLIENT' as const };
      const expected = { id: 'uuid-1', ...dto };
      mockService.create.mockResolvedValue(expected);

      const result = await controller.create(dto);
      expect(result).toEqual(expected);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
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
