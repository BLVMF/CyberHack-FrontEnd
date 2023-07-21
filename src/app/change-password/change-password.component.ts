import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '../_services/user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  userRole: string = '';
  userName: string = '';

  changePasswordForm!: FormGroup;
  newPasswordControl = new FormControl('', Validators.required);
  passwordStrength: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService
  ) {}

  showPassword: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.newPasswordControl.valueChanges.subscribe((value) => {
      this.checkPasswordStrength(value);
    });

    this.route.queryParams.subscribe((params) => {
      this.userName = params['userName'];
      this.userRole = params['userRole'];
      console.log(this.userName, this.userRole);
    });
  }

  initForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  goHome() {
    if (this.userRole === 'ngo') {
      this.router.navigate(['/ngo-home']);
    } else if (this.userRole === 'volunteer') {
      this.router.navigate(['/vol-home']);
    } else if (this.userRole === 'Admin') {
      this.router.navigate(['/admin']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const currentPassword = this.changePasswordForm.value.currentPassword;
    const newPassword = this.changePasswordForm.value.newPassword;
    const confirmPassword = this.changePasswordForm.value.confirmPassword;

    if (newPassword !== confirmPassword) {
      this.snackBar.open(
        'New password and Confirmation do not match.',
        'Dismiss'
      );
      return;
    }

    this.userProfileService
      .updatePassword(currentPassword, newPassword)
      .subscribe(
        () => {
          this.snackBar.open('Password Updated Successfully', 'Dismiss');
        },
        (error) => {
          console.error('Error updating password', error);
          this.snackBar.open('Error updating password', 'Dismiss');
        }
      );
  }

  checkPasswordStrength(password: string | null) {
    const userPassword = password ?? '';
    const regexStrong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (regexStrong.test(userPassword)) {
      this.passwordStrength = 'Strong';
    } else if (regexMedium.test(userPassword)) {
      this.passwordStrength = 'Medium';
    } else {
      this.passwordStrength = 'Weak';
    }
  }
}
