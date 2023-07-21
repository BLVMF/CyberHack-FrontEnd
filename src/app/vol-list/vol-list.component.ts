import { Component, OnInit } from '@angular/core';
import { Vol } from '../models/vol.model';
import { UserProfileService } from '../_services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vol-list',
  templateUrl: './vol-list.component.html',
  styleUrls: ['./vol-list.component.css'],
})
export class VolListComponent implements OnInit {
  vols: Vol[] = [];
  avVolunteers: Vol[] = [];

  constructor(
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userRole = 'volunteer'; // Set the appropriate user role here
    this.userProfileService.fetchVolunteers(userRole);
    this.userProfileService.getVolunteers().subscribe((vols) => {
      this.vols = vols;
      console.log(this.vols);
    });
  }
  contactVol(vol: Vol): void {
    const volEmail = vol.userEmail;
    const subject = 'NGO requires you assistance';
    const message =
      'Good Day, I am contacting you on behalf of the NGO I represent. We beleive you posses skills that we need to bolster our organisation. Please contact me so that we can discuss out needs with you.';

    const emailLink = `mailto:${volEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
  }

  goHome() {
    this.router.navigate(['ngo-home']);
  }

}
