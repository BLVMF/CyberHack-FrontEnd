import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css'],
})
export class VolunteerFormComponent {
  userNameControl = new FormControl('', Validators.required);
  userFirstNameControl = new FormControl('', Validators.required);
  userLastNameControl = new FormControl('', Validators.required);
  userEmailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  userPasswordControl = new FormControl('', Validators.required);
  userPhoneControl = new FormControl('', Validators.required);
  currentPositionControl = new FormControl('', Validators.required);
  yearsOfExperienceControl = new FormControl('', Validators.required);
  eduLvlControl = new FormControl('', Validators.required);
  volInterestsControl = new FormControl('', Validators.required);
  wklyHrsControl = new FormControl('', Validators.required);
  crimCheckControl = new FormControl('', Validators.required);
  referencesControl = new FormControl('', Validators.required);
  linkedInControl = new FormControl('', Validators.required);
  passwordStrength: string = '';
  showPassword: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  sanitizeInput(input: string): string {
    let santisedInput = input.trim();
    santisedInput = santisedInput.replace(/[^a-zA-Z0-9\s@!\-.]/g, ''); 
    return santisedInput;
  }
  
  

  checkPasswordStrength() {
    const userPassword = this.userPasswordControl.value ?? '';
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

  onSubmit() {
    if (
      this.userNameControl.invalid ||
      this.userFirstNameControl.invalid ||
      this.userLastNameControl.invalid ||
      this.userEmailControl.invalid ||
      this.userPasswordControl.invalid ||
      this.userPhoneControl.invalid ||
      this.currentPositionControl.invalid ||
      this.yearsOfExperienceControl.invalid ||
      this.eduLvlControl.invalid ||
      this.volInterestsControl.invalid ||
      this.wklyHrsControl.invalid ||
      this.crimCheckControl.invalid ||
      this.referencesControl.invalid ||
      this.linkedInControl.invalid
    ) {
      this.snackBar.open('Please fill in all required fields', 'OK', {
        duration: 5000,
      });
      return;
    }

    // Form is valid, proceed with form submission
    const formData = {
      userName: this.userNameControl.value
        ? this.sanitizeInput(this.userNameControl.value)
        : '',

      userFirstName: this.userFirstNameControl.value
        ? this.sanitizeInput(this.userFirstNameControl.value)
        : '',

      userLastName: this.userLastNameControl.value
        ? this.sanitizeInput(this.userLastNameControl.value)
        : '',

      userEmail: this.userEmailControl.value
        ? this.sanitizeInput(this.userEmailControl.value)
        : '',

      userPassword: this.userPasswordControl.value
        ? this.sanitizeInput(this.userPasswordControl.value)
        : '',

      userPhone: this.userPhoneControl.value
        ? this.sanitizeInput(this.userPhoneControl.value)
        : '',

      currentPosition: this.currentPositionControl.value
        ? this.sanitizeInput(this.currentPositionControl.value)
        : '',

      yearsOfExperience: this.yearsOfExperienceControl.value
        ? this.sanitizeInput(this.yearsOfExperienceControl.value)
        : '',

      eduLvl: this.eduLvlControl.value
        ? this.sanitizeInput(this.eduLvlControl.value)
        : '',

      volInterests: this.volInterestsControl.value
        ? this.sanitizeInput(this.volInterestsControl.value)
        : '',

      wklyHrs: this.wklyHrsControl.value
        ? this.sanitizeInput(this.wklyHrsControl.value)
        : '',

      crimCheck: this.crimCheckControl.value
        ? this.sanitizeInput(this.crimCheckControl.value)
        : '',

      references: this.referencesControl.value
        ? this.sanitizeInput(this.referencesControl.value)
        : '',

      linkedIn: this.linkedInControl.value
        ? this.sanitizeInput(this.linkedInControl.value)
        : '',

      userRole: 'volunteer',

      avNow: 'Yes',
    };

    this.http
      .post('http://localhost:9090/users/registerNewUser', formData, {
        params: { sanitize: 'true' },
      })
      .subscribe(
        (data) => {
          console.log('Form submitted successfully:', data);
          this.router.navigate(['/form-submission']);
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
            this.snackBar.open(
              'An error occurred while submitting the form. Please contact adminCH@CyberHack.com',
              'Close'
            );
          }
        }
      );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
