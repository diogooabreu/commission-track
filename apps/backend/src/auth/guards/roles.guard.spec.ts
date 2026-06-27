import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { Role } from '../../users/dto/create-user.dto';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  const mockExecutionContext = (userRole?: string) => {
    const handler = () => {};
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user: userRole ? { role: userRole } : undefined,
        }),
      }),
      getHandler: handler,
      getClass: () => ({}),
    } as any;
  };

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should allow access when no roles are required', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(undefined);

    const result = guard.canActivate(mockExecutionContext('CLIENT'));

    expect(result).toBe(true);
  });

  it('should allow access when user has the required role', () => {
    jest.spyOn(reflector, 'get').mockReturnValue([Role.ARTIST]);

    const result = guard.canActivate(mockExecutionContext('ARTIST'));

    expect(result).toBe(true);
  });

  it('should deny access when user does not have the required role', () => {
    jest.spyOn(reflector, 'get').mockReturnValue([Role.ARTIST]);

    const result = guard.canActivate(mockExecutionContext('CLIENT'));

    expect(result).toBe(false);
  });

  it('should deny access when there is no user in request', () => {
    jest.spyOn(reflector, 'get').mockReturnValue([Role.ARTIST]);

    const result = guard.canActivate(mockExecutionContext());

    expect(result).toBe(false);
  });
});
