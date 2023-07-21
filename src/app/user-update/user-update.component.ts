import { Component, OnInit, } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './user.interface';
import { UserProfileService } from '../_services/user-profile.service';
import { MatDialog }  from '@angular/material/dialog';
import { UserAuthService } from '../_services/user-auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userName!: string;
  userRole!: string;
  
 
  userFirstNameControl = new FormControl('');
  userLastNameControl = new FormControl('');
  
  userEmailControl = new FormControl('');
  userPhoneControl = new FormControl('');
  volInterestsControl = new FormControl('');
  ngoNeedsControl = new FormControl('');
  linkedInControl = new FormControl('');
  crimCheckControl = new FormControl('');
  avNowControl = new FormControl('');

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private userProfileService: UserProfileService,
    private dialog: MatDialog,
    private authService: UserAuthService, 
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userName = params['userName'];
      this.userRole = params['userRole'];    
      
      this.http.get<User>(`http://localhost:9090/users/${this.userName}`).subscribe(
        (user: User) => {
          this.userFirstNameControl.setValue(user.userFirstName);
          this.userLastNameControl.setValue(user.userLastName);
          this.userEmailControl.setValue(user.userEmail);
          this.userPhoneControl.setValue(user.userPhone);
          this.volInterestsControl.setValue(user.volInterests);
          this.ngoNeedsControl.setValue(user.ngoNeeds);
          this.linkedInControl.setValue(user.linkedIn);
          this.crimCheckControl.setValue(user.crimCheck);
          this.avNowControl.setValue(user.avNow);
          
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
  }

  goHome():void {
    if(this.userRole === 'ngo'){
      this.router.navigate(['/ngo-home'])
    } else if (this.userRole === 'volunteer'){
      this.router.navigate(['/vol-home']);
    } else if (this.userRole === 'Admin' ){
      this.router.navigate(['/admin'])
    }
  }

  onUpdate() {
    this.route.queryParams.subscribe(params => {
      const userName = params['userName'];
      const updatedUser: any = {}; // Create an empty object for the updated user

      if (this.userFirstNameControl.value !== '') {
        updatedUser.userFirstName = this.userFirstNameControl.value;
      }
      if (this.userLastNameControl.value !== '') {
        updatedUser.userLastName = this.userLastNameControl.value;
      }
      if (this.userEmailControl.value !== '') {
        updatedUser.userEmail = this.userEmailControl.value;
      }
      if (this.userPhoneControl.value !== '') {
        updatedUser.userPhone = this.userPhoneControl.value;
      }
      if (this.volInterestsControl.value !== '') {
        updatedUser.volInterests = this.volInterestsControl.value;
      }
      if (this.ngoNeedsControl.value !== '') { 
        updatedUser.ngoNeeds = this.ngoNeedsControl.value; 
      }
      if (this.linkedInControl.value !== '') {
        updatedUser.linkedIn = this.linkedInControl.value;
      }
      if(this.crimCheckControl.value !== '') {
        updatedUser.crimCheck = this.crimCheckControl.value;
      }
      if(this.avNowControl.value !== '') {
        updatedUser.avNow = this.avNowControl.value;
      }



      if (Object.keys(updatedUser).length === 0) {
        this.snackBar.open('No changes made', 'Dismiss');
        return;
      }

      // Make the update request with the updatedUser object and userName in the URL
      this.http
        .put(`http://localhost:9090/users/${userName}`, updatedUser)
        .subscribe(
          (response) => {
            // Handle the success response
            this.snackBar.open('User updated successfully', 'Dismiss');
            // Update the UserProfileService with the updated user information
            this.userProfileService.setUserFirstName(updatedUser.userFirstName);
            this.userProfileService.setUserLastName(updatedUser.userLastName);
            this.userProfileService.setUserEmail(updatedUser.userEmail);
            this.userProfileService.setUserPhone(updatedUser.userPhone);
            this.userProfileService.setVolInterests(updatedUser.volInterests);
            this.userProfileService.setLinkedIn(updatedUser.linkedIn);
            this.userProfileService.setCrimCheck(updatedUser.crimCheck);
            this.userProfileService.setAvNow(updatedUser.avNow);
            
            
            this.userProfileService.saveUserProfileData(); // Save the updated data to localStorage
          },
          (error) => {
            console.error('Error updating user', error);
            // Handle the error response
            this.snackBar.open('Error updating user', 'Dismiss');
          }
        );
    });
  }
  
  deleteUser(): void {
    const userName = this.userName;
    this.http.delete(`http://localhost:9090/users/${userName}`, { responseType: 'text', observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.authService.logout();
          this.snackBar.open('User deleted successfully', 'Dismiss');
        } else {
          console.error('Error deleting user. Contact adminCH@CyberHack.com', response.status);
        }
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }
  
 
}