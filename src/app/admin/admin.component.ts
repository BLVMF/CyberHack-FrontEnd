import { Component, OnInit } from '@angular/core';
import { NGO } from '../models/ngo.model';
import { Admin } from '../models/admin.model';
import { Vol } from '../models/vol.model';
import { UserProfileService } from '../_services/user-profile.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user-update/user.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private authService: UserAuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngos: NGO[] = [];
  vols: Vol[] = [];
  admins: Admin[] = [];
  userRole = '';
  userName = '';

  ngOnInit(): void {
    this.userProfileService
      .getUserName()
      .subscribe((username) => (this.userName = username));

    const userRoleNgo = 'ngo'; // Set the appropriate user role here for NGOs
    this.userProfileService.fetchNGOs(userRoleNgo);
    this.userProfileService.getNGOs().subscribe((ngos) => {
      this.ngos = ngos;
      console.log(this.ngos);
    });

    const userRoleVolunteer = 'volunteer'; // Set the appropriate user role here for volunteers
    this.userProfileService.fetchVolunteers(userRoleVolunteer);
    this.userProfileService.getVolunteers().subscribe((vols) => {
      this.vols = vols;
      console.log(this.vols);
    });

    const userRoleAdmin = 'admin'; // Set the appropriate user role here for admins
    this.userProfileService.fetchAdmins(userRoleAdmin);
    this.userProfileService.getAdmins().subscribe((admins) => {
      this.admins = admins;
      console.log(this.admins);
    });
  }

  logOut() {
    this.authService.logout();
  }

  createUser() {
    this.router.navigate(['new-user']);
  }

  editUser(userName: string) {
    this.userRole = 'Admin';
    this.router.navigate(['/user-update'], {
      queryParams: { userName, userRole: this.userRole },
    });
  }

  deleteUser(userName: string) {
    if (userName === 'Admin') {
      // Show a snackbar message indicating deletion is not allowed for the admin user
      this.snackBar.open('Deletion not allowed for admin user.', 'Dismiss');
      return;
    }
    // Call the deleteUser method from the UserProfileService
    this.userProfileService.deleteUser(userName).subscribe(() => {
      const userRoleNgo = 'ngo';
      this.userProfileService.fetchNGOs(userRoleNgo);
      this.userProfileService.getNGOs().subscribe((ngos) => {
        this.ngos = ngos;
        console.log(this.ngos);
      });
      const userRoleVolunteer = 'volunteer';
      this.userProfileService.fetchVolunteers(userRoleVolunteer);
      this.userProfileService.getVolunteers().subscribe((vols) => {
        this.vols = vols;
        console.log(this.vols);
      });
      const userRoleAdmin = 'admin'; // Set the appropriate user role here for admins
      this.userProfileService.fetchAdmins(userRoleAdmin);
      this.userProfileService.getAdmins().subscribe((admins) => {
        this.admins = admins;
        console.log(this.admins);
      });

      this.router.navigate(['/admin']);
    });
  }


  changePassword() {
    this.userRole = 'Admin';
    this.router.navigate(['/change-password'], {
      queryParams: {
        userRole: this.userRole,
        userName: this.userName,
      },
    });
  }

  goResetPass() {
    this.userRole = 'Admin';
    this.router.navigate(['/admin-password-reset'], {
      queryParams: {
        userRole: this.userRole,
        userName: this.userName,
      },
    });
  }
}
