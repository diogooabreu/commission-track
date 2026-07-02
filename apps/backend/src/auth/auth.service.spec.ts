import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Role } from '../users/dto/create-user.dto';

jest.mock('bcryptjs');

describe('AuthService', () => {
  let service: AuthService;
  let bcryptHash: jest.Mock;

  const mockUsersService = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    bcryptHash = bcrypt.hash as jest.Mock;
    bcryptHash.mockResolvedValue('hashed-password');
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('login', () => {
    const dto = { email: '  John@Example.com  ', password: 'Str0ng!' };

    it('should return an access token when credentials are valid', async () => {
      const user = {
        id: 'uuid-1',
        email: 'john@example.com',
        password: 'hashed-password',
        role: Role.ARTIST,
      };
      mockUsersService.findByEmail.mockResolvedValue(user);
      mockJwtService.signAsync.mockResolvedValue('jwt-token');

      const result = await service.login(dto);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        'john@example.com',
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, user.password);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
      expect(result).toEqual({ accessToken: 'jwt-token' });
    });

    it('should throw UnauthorizedException when email is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        id: 'uuid-1',
        email: 'john@example.com',
        password: 'hashed-password',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    const dto = {
      name: 'John',
      email: 'john@test.com',
      password: 'Str0ng!',
      role: Role.CLIENT,
    };

    it('should create a user with hashed password and return without password', async () => {
      const hashedPassword = 'hashed-password';

      const createdUser = {
        id: 'uuid-1',
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersService.create.mockResolvedValue(createdUser);

      const result = await service.register(dto);

      expect(bcryptHash).toHaveBeenCalledWith(dto.password, 10);
      expect(mockUsersService.create).toHaveBeenCalledWith({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      });
      expect(result).not.toHaveProperty('password');
      expect(result).toEqual({
        id: 'uuid-1',
        name: dto.name,
        email: dto.email,
        role: dto.role,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      mockUsersService.create.mockRejectedValue(
        new ConflictException('Registration failed'),
      );

      await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });
  });
});
