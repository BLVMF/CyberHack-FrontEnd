import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public roleMatch(allowedRole: string): boolean {
    const userRole = this.userAuthService.getRoles();
    console.log(userRole);

    if (userRole === null) {
      return false; // No roles assigned to user
    }
    return userRole.includes(allowedRole);
  }

  public canAccessNgoHome(): boolean {
    return this.roleMatch('ngo');
  }

  public canAccessVolHome(): boolean {
    return this.roleMatch('volunteer');
  }
}
