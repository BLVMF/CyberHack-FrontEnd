import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css'],
})
export class NewUserFormComponent {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  sanitizeInput(input: string): string {
    let santisedInput = input.trim();
    santisedInput = santisedInput.replace(/[^a-zA-Z0-9\s@!\-]/g, ''); 
    return santisedInput;
  }

  userNameControl = new FormControl('', Validators.required);
  userEmailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  userPasswordControl = new FormControl('', Validators.required);
  userRoleControl = new FormControl('', Validators.required);

  onSubmit() {
    if (
      this.userNameControl.invalid ||
      this.userEmailControl.invalid ||
      this.userPasswordControl.invalid ||
      this.userRoleControl.invalid
    ) {
      this.snackBar.open('Please fill in all required fields', 'OK', {
        duration: 5000,
      });
      return;
    }
    const formData = {
      userName: this.userNameControl.value
        ? this.sanitizeInput(this.userNameControl.value)
        : '',
      userEmail: this.userEmailControl.value
        ? this.sanitizeInput(this.userEmailControl.value)
        : '',

      userPassword: this.userPasswordControl.value
        ? this.sanitizeInput(this.userPasswordControl.value)
        : '',

      userRole: this.userRoleControl.value
        ? this.sanitizeInput(this.userRoleControl.value)
        : '',
    };
    this.http
      .post('http://localhost:9090/users/registerNewUser', formData, {
        params: { sanitize: 'true' },
      })
      .subscribe(
        (data) => {
          this.snackBar.open('Form submitted successfully:', 'Dismiss');
          this.router.navigate(['/admin']);
        },
        (error) => {
          if (error.status === 500) {
            console.error('Error submitting form:', error);
            this.snackBar.open(
              'Username already exists, please choose another',
              'Close'
            );
          } else {
            console.error('Error submitting form:', error);
            this.snackBar.open('It must be really broken...', 'Close');
          }
        }
      );
  }

  goHome() {
    this.router.navigate(['/admin']);
  }
}
