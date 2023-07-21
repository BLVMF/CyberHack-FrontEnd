import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserAuthService } from '../_services/user-auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockUserAuthService: jasmine.SpyObj<UserAuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockUserAuthService = jasmine.createSpyObj<UserAuthService>('UserAuthService', ['getToken']);
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: UserAuthService, useValue: mockUserAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if token is not null', () => {
    mockUserAuthService.getToken.and.returnValue('dummyToken');
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const canActivateResult = guard.canActivate(route, state);

    expect(canActivateResult).toBeTrue();
  });

  it('should navigate to login page if token is null', () => {
    mockUserAuthService.getToken.and.returnValue(null);
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const canActivateResult = guard.canActivate(route, state);

    expect(canActivateResult).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
