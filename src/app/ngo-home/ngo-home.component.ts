import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { UserProfileService } from '../_services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngo-home',
  templateUrl: './ngo-home.component.html',
  styleUrls: ['./ngo-home.component.css'],
})
export class NgoHomeComponent implements OnInit {
  userName = '';
  userFirstName = '';
  userRole = '';
  userEmail = '';
  userPhone = '';
  ngoNeeds = '';
  workRefs = '';
  linkedIn = '';

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
      .getUserEmail()
      .subscribe((email) => (this.userEmail = email));
    this.userProfileService
      .getUserPhone()
      .subscribe((phone) => (this.userPhone = phone));
    this.userProfileService
      .getNgoNeeds()
      .subscribe((ngoNeeds) => (this.ngoNeeds = ngoNeeds));
    this.userProfileService
      .getWorkRefs()
      .subscribe((refs) => (this.workRefs = refs));
    this.userProfileService
      .getLinkedIn()
      .subscribe((linkedIn) => (this.linkedIn = linkedIn));
  }

  goHome() {
    this.router.navigate(['/ngo-home']);
  }

  changePassword() {
    this.userRole = 'ngo';
    this.router.navigate(['/change-password'], {
      queryParams: {
        userRole: this.userRole,
        userName: this.userName,
      },
    });
  }
  updateProfile() {
    this.userProfileService.saveUserProfileData();
    this.userRole = 'ngo';
    this.router.navigate(['user-update'], {
      queryParams: { userRole: this.userRole, userName: this.userName },
    });
  }

  logOut() {
    this.authService.logout();
  }

  volList() {
    this.router.navigate(['/vol-list']);
  }
}
