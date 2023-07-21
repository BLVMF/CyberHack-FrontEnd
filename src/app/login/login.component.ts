import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService } from '../_services/user-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userProfileService: UserProfileService
  ) {}

  showPassword: boolean = false;
  ngOnInit(): void {}
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe({
      next: (response: any) => {
        const userName = response.user.userName;
        const userFirstName = response.user.userFirstName;
        const userLastName = response.user.userLastName;
        const userEmail = response.user.userEmail;
        const userPhone = response.user.userPhone;
        const currentPosition = response.user.currentPosition;
        const yearsOfExperience = response.user.yearsOfExperience;
        const eduLvl = response.user.eduLvl;
        const volInterests = response.user.volInterests;
        const ngoNeeds = response.user.ngoNeeds;
        const wklyHrs = response.user.wklyHrs;
        const crimCheck = response.user.crimCheck;
        const workRefs = response.user.workRefs;
        const linkedIn = response.user.linkedIn;
        const avNow = response.user.avNow;

        this.userProfileService.setUserName(userName);
        this.userProfileService.setUserFirstName(userFirstName);
        this.userProfileService.setUserLastName(userLastName);
        this.userProfileService.setUserEmail(userEmail);
        this.userProfileService.setUserPhone(userPhone);
        this.userProfileService.setCurrentPosition(currentPosition);
        this.userProfileService.setYearsOfExperience(yearsOfExperience);
        this.userProfileService.setEduLvl(eduLvl);
        this.userProfileService.setVolInterests(volInterests);
        this.userProfileService.setNgoNeeds(ngoNeeds);
        this.userProfileService.setWklyHrs(wklyHrs);
        this.userProfileService.setCrimCheck(crimCheck);
        this.userProfileService.setWorkRefs(workRefs);
        this.userProfileService.setLinkedIn(linkedIn);
        this.userProfileService.setAvNow(avNow);

        this.userAuthService.setRoles(response.user.userRole),
          this.userAuthService.setToken(response.jwtToken);
        const userRoles = response.user.userRole;
        if (userRoles.includes('Admin')) {
          this.router.navigate(['/admin']);
        } else if (
          userRoles.includes('volunteer') &&
          this.userService.canAccessVolHome()
        ) {
          this.router.navigate(['/vol-home']);
        } else if (
          userRoles.includes('ngo') &&
          this.userService.canAccessNgoHome()
        ) {
          this.router.navigate(['/ngo-home']);
        } else {
          this.snackBar.open(
            'You do not have permission to access this page',
            'Dismiss'
          );
        }
      },
      error: (error: any) => {
        this.snackBar.open('Username or password is incorrect', 'Dismiss');
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
