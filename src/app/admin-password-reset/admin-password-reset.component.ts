import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserProfileService } from '../_services/user-profile.service';

@Component({
  selector: 'app-admin-password-reset',
  templateUrl: './admin-password-reset.component.html',
  styleUrls: ['./admin-password-reset.component.css'],
})
export class AdminPasswordResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      userName: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  goHome() {
    this.router.navigate(['/admin']); // Change the route to the admin page
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const userName = this.resetPasswordForm.value.userName;
    const newPassword = this.resetPasswordForm.value.newPassword;

    this.userProfileService.resetPassword(userName, newPassword).subscribe(
      () => {
        this.snackBar.open('User password reset successfully', 'Dismiss');
        console.log(userName);
        console.log(newPassword);
      },
      (error: any) => {
        console.error('Error resetting user password', error);
        this.snackBar.open('Error resetting user password', 'Dismiss');
      }
    );
  }
}
