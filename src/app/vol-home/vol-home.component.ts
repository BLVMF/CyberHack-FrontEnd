import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { UserProfileService } from '../_services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vol-home',
  templateUrl: './vol-home.component.html',
  styleUrls: ['./vol-home.component.css'],
})
export class VolHomeComponent implements OnInit {
  userName = '';
  userRole = '';
  userFirstName = '';
  userLastName = '';
  userEmail = '';
  userPhone = '';
  currentPosition = '';
  yearsOfExperience = '';
  eduLvl = '';
  volInterests = '';
  wklyHrs = '';
  crimCheck = '';
  workRefs = '';
  linkedIn = '';
  avNow = '';

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private authService: UserAuthService
  ) {}

  ngOnInit() {
    this.userProfileService
      .getUserName()
      .subscribe((username) => (this.userName = username));
    this.userProfileService
      .getUserRole()
      .subscribe((role) => (this.userRole = role));
    this.userProfileService
      .getUserFirstName()
      .subscribe((firstName) => (this.userFirstName = firstName));
    this.userProfileService
      .getUserLastName()
      .subscribe((lastName) => (this.userLastName = lastName));
    this.userProfileService
      .getUserEmail()
      .subscribe((email) => (this.userEmail = email));
    this.userProfileService
      .getUserPhone()
      .subscribe((phone) => (this.userPhone = phone));
    this.userProfileService
      .getCurrentPosition()
      .subscribe((position) => (this.currentPosition = position));
    this.userProfileService
      .getYearsOfExperience()
      .subscribe((experience) => (this.yearsOfExperience = experience));
    this.userProfileService
      .getEduLvl()
      .subscribe((level) => (this.eduLvl = level));
    this.userProfileService
      .getVolInterests()
      .subscribe((interests) => (this.volInterests = interests));
    this.userProfileService
      .getWklyHrs()
      .subscribe((hours) => (this.wklyHrs = hours));
    this.userProfileService
      .getCrimCheck()
      .subscribe((check) => (this.crimCheck = check));
    this.userProfileService
      .getWorkRefs()
      .subscribe((refs) => (this.workRefs = refs));
    this.userProfileService
      .getLinkedIn()
      .subscribe((linkedIn) => (this.linkedIn = linkedIn));
    this.userProfileService
      .getAvNow()
      .subscribe((avNow) => (this.avNow = avNow));
  }

  goHome() {
    this.router.navigate(['/vol-home']);
  }
  updateProfile() {
    this.userProfileService.saveUserProfileData();
    this.userRole = 'volunteer';
    this.router.navigate(['/user-update'], {
      queryParams: {
        userRole: this.userRole,
        userName: this.userName,
      },
    });
  }

  ngoList() {
    this.router.navigate(['/ngos-list']);
  }

  logOut() {
    this.authService.logout();
  }

  changePassword() {
    this.userRole = 'volunteer';
    this.router.navigate(['/change-password'], {
      queryParams: {
        userRole: this.userRole,
        userName: this.userName,
      },
    });
  }
}
