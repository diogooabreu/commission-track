import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../auth.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  const mockAuthService: Partial<AuthService> = {
    validateUser: jest.fn(),
  };

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret';
  });

  beforeEach(() => {
    strategy = new JwtStrategy(mockAuthService as AuthService);
  });

  describe('validate', () => {
    it('should return user object when payload is valid', async () => {
      const payload = { sub: 'uuid-1', email: 'john@test.com', role: 'CLIENT' };
      const user = { id: 'uuid-1', email: 'john@test.com', role: 'CLIENT' };
      (mockAuthService.validateUser as jest.Mock).mockResolvedValue(user);

      const result = await strategy.validate(payload);

      expect(mockAuthService.validateUser).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(user);
    });

    it('should throw when user is not found', async () => {
      const payload = {
        sub: 'nonexistent',
        email: 'test@test.com',
        role: 'CLIENT',
      };
      (mockAuthService.validateUser as jest.Mock).mockResolvedValue(null);

      await expect(strategy.validate(payload)).rejects.toThrow();
    });
  });
});
