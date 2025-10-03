import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role-guard';
import { Router } from '@angular/router';
import { AuthService } from './auth';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(RoleGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access if role matches', () => {
    authServiceSpy.getUserRole.and.returnValue('student');
    const routeMock = { data: { role: 'student' } } as any;

    expect(guard.canActivate(routeMock)).toBeTrue();
  });

  it('should block access if role does not match', () => {
    authServiceSpy.getUserRole.and.returnValue('teacher');
    const routeMock = { data: { role: 'student' } } as any;

    expect(guard.canActivate(routeMock)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
