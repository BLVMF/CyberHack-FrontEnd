import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private userId: string | null = null;
  private roles: string | null = null;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}

  public setRoles(roles: string[]) {
    const roleString = JSON.stringify(roles);
    this.cookieService.set('roles', roleString);
    console.log(roleString);
  }

  public hasRole(requiredRole: string): boolean {
    const roleString = this.cookieService.get('roles');
    if (roleString) {
      const userRoles = JSON.parse(roleString) as string[];
      return userRoles.includes(requiredRole);
    }
    return false;
  }

  public setToken(jwtToken: string) {
    console.log(jwtToken);
    this.cookieService.set('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    const token = this.cookieService.get('jwtToken');
    if (token === null) {
      console.log('No JWT found, Access denied.');
    }
    return token;
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }

  public getUserId(): string | null {
    return this.userId;
  }

  public logout() {
    this.clear();
    this.router.navigate(['/login']);
  }

  public clear() {
    this.cookieService.delete('roles');
    this.cookieService.delete('jwtToken');
    this.userId = null;
    this.roles = null;
  }

  public isLoggedIn(): boolean {
    return this.getRoles() !== null && this.getToken() !== null;
  }

  public getRoles(): string[] | null {
    const roleString = this.cookieService.get('roles');
    console.log(roleString);
    if (roleString) {
      return JSON.parse(roleString) as string[];
    }
    return null;
  }
}
