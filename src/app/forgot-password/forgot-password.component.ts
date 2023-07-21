import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  email: string = '';

  resetPassword() {
    const url = 'https://formspree.io/f/mjvqbelk';
    const formData = { email: this.email };

    this.http.post(url, formData).subscribe(
      () => {
        this.snackBar.open(
          'An admin will get in touch with you shortly',
          'Dismiss'
        );
        this.router.navigate(['/form-submission']);
      },
      (error) => {
        this.snackBar.open(
          'There was an error completing your request. Email adminCH@Cyberhack.com.',
          'Dismiss'
        );
      }
    );
  }

  goHome() {
    this.router.navigate(['/login']);
  }
}
