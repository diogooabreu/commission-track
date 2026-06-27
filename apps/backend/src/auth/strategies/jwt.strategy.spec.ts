import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../auth.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
  };

  beforeEach(() => {
    authService = mockAuthService as any;
    strategy = new JwtStrategy(authService);
  });

  describe('validate', () => {
    it('should return user object when payload is valid', async () => {
      const payload = { sub: 'uuid-1', email: 'john@test.com', role: 'CLIENT' };
      const user = { id: 'uuid-1', email: 'john@test.com', role: 'CLIENT' };
      mockAuthService.validateUser.mockResolvedValue(user);

      const result = await strategy.validate(payload);

      expect(mockAuthService.validateUser).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(user);
    });

    it('should throw when user is not found', async () => {
      const payload = { sub: 'nonexistent', email: 'test@test.com', role: 'CLIENT' };
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(strategy.validate(payload)).rejects.toThrow();
    });
  });
});
