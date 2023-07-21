import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css'],
})
export class ForbiddenComponent implements OnInit {
  userRole: string = '';
  userName: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userName = params['userName'];
      this.userRole = params['userRole'];
      console.log(this.userName, this.userRole);
    });
  }

  goHome() {
    if (this.userRole === 'ngo') {
      this.router.navigate(['/ngo-home']);
    } else if (this.userRole === 'volunteer') {
      this.router.navigate(['/vol-home']);
    } else if (this.userRole === 'Admin') {
      this.router.navigate(['/admin']);
    } else{
      this.router.navigate(['']);
    }
  }
}
