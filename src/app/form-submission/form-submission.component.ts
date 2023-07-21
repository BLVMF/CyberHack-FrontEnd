import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-submission',
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.css'],
})
export class FormSubmissionComponent {
  constructor(private router: Router) {}

  homePage() {
    this.router.navigate(['']);
  }
}
