import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userAuthService.getToken() !== null) {
      const requiredRole = route.data['roles'] as string;
      if (requiredRole && !this.userAuthService.hasRole(requiredRole)) {
        this.router.navigate(['/forbidden']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
