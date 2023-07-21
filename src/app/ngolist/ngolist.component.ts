import { Component, OnInit } from '@angular/core';
import { NGO } from '../models/ngo.model';
import { UserProfileService } from '../_services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngolist',
  templateUrl: './ngolist.component.html',
  styleUrls: ['./ngolist.component.css'],
})
export class NGOListComponent implements OnInit {
  constructor(
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngos: NGO[] = [];

  ngOnInit(): void {
    const userRole = 'ngo'; // Set the appropriate user role here
    this.userProfileService.fetchNGOs(userRole);
    this.userProfileService.getNGOs().subscribe((ngos) => {
      this.ngos = ngos;
      console.log(this.ngos);
    });
  }
  contactNGO(ngo: NGO): void {
    const ngoEmail = ngo.userEmail;
    const subject = 'Volunteer Inquiry';
    const message =
      ' Good Day, I am interested in volunteering with your organisation. How may I get involved?';
    const emailLink = `mailto:${ngoEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    window.open(emailLink);
  }
  goHome() {
    this.router.navigate(['vol-home']);
  }
}
