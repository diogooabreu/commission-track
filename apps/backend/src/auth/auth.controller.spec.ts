import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role } from '../users/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('register', () => {
    it('should call authService.register with DTO', async () => {
      const dto = {
        name: 'John',
        email: 'john@test.com',
        password: 'Str0ng!',
        role: Role.CLIENT,
      };
      const expected = { id: 'uuid-1', name: dto.name, email: dto.email, role: dto.role };
      mockAuthService.register.mockResolvedValue(expected);

      const result = await controller.register(dto);

      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('login', () => {
    it('should call authService.login with DTO', async () => {
      const dto = { email: 'john@test.com', password: 'Str0ng!' };
      const expected = { accessToken: 'jwt-token' };
      mockAuthService.login.mockResolvedValue(expected);

      const result = await controller.login(dto);

      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expected);
    });
  });
});
