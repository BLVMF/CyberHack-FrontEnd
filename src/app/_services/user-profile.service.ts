import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NGO } from '../models/ngo.model';
import { Vol } from '../models/vol.model';

import { Admin } from '../models/admin.model';
@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private usernameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private userRoleSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private userFirstNameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private userLastNameSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private userEmailSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private userPhoneSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private currentPositionSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private yearsOfExperienceSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private eduLvlSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private volInterestsSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private ngoNeedsSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private wklyHrsSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private crimCheckSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private workRefsSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private linkedInSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private avNowSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private ngosSubject: BehaviorSubject<NGO[]> = new BehaviorSubject<NGO[]>([]);
  private volSubject: BehaviorSubject<Vol[]> = new BehaviorSubject<Vol[]>([]);
  private adminSubject: BehaviorSubject<Admin[]> = new BehaviorSubject<Admin[]>(
    []
  );

  private readonly baseUrl = 'http://localhost:9090/users';

  constructor(private http: HttpClient) {
    this.loadUserProfileDataFromStorage();
  }

  private loadUserProfileDataFromStorage(): void {
    const userProfileData = localStorage.getItem('userProfileData');
    if (userProfileData) {
      const data = JSON.parse(userProfileData);
      this.setUserName(data.username);
      this.setUserFirstName(data.firstName);
      this.setUserLastName(data.lastName);
      this.setUserRole(data.role);
      this.setUserEmail(data.email);
      this.setUserPhone(data.phone);
      this.setCurrentPosition(data.position);
      this.setYearsOfExperience(data.experience);
      this.setEduLvl(data.educationLevel);
      this.setVolInterests(data.interests);
      this.setNgoNeeds(data.ngoNeeds);
      this.setWklyHrs(data.weeklyHours);
      this.setCrimCheck(data.criminalCheck);
      this.setAvNow(data.avNow);
      this.setNgoNeeds(data.ngoNeeds);
      this.setWorkRefs(data.workReferences);
      this.setLinkedIn(data.linkedin);
    }
  }
  setUserRole(role: string) {
    this.userRoleSubject.next(role);
  }

  getUserRole() {
    return this.userRoleSubject.asObservable();
  }

  setUserName(username: string) {
    this.usernameSubject.next(username);
  }

  getUserName(): Observable<string> {
    return this.usernameSubject.asObservable();
  }

  setUserFirstName(firstName: string) {
    this.userFirstNameSubject.next(firstName);
  }

  getUserFirstName(): Observable<string> {
    return this.userFirstNameSubject.asObservable();
  }

  setUserLastName(lastName: string) {
    this.userLastNameSubject.next(lastName);
  }

  getUserLastName(): Observable<string> {
    return this.userLastNameSubject.asObservable();
  }

  setUserEmail(email: string) {
    this.userEmailSubject.next(email);
  }

  getUserEmail(): Observable<string> {
    return this.userEmailSubject.asObservable();
  }

  setUserPhone(phone: string) {
    this.userPhoneSubject.next(phone);
  }

  getUserPhone(): Observable<string> {
    return this.userPhoneSubject.asObservable();
  }

  setCurrentPosition(position: string) {
    this.currentPositionSubject.next(position);
  }

  getCurrentPosition(): Observable<string> {
    return this.currentPositionSubject.asObservable();
  }

  setYearsOfExperience(experience: string) {
    this.yearsOfExperienceSubject.next(experience);
  }

  getYearsOfExperience(): Observable<string> {
    return this.yearsOfExperienceSubject.asObservable();
  }

  setEduLvl(level: string) {
    this.eduLvlSubject.next(level);
  }

  getEduLvl(): Observable<string> {
    return this.eduLvlSubject.asObservable();
  }

  setVolInterests(interests: string) {
    this.volInterestsSubject.next(interests);
  }

  getVolInterests(): Observable<string> {
    return this.volInterestsSubject.asObservable();
  }

  setNgoNeeds(ngoNeeds: string) {
    this.ngoNeedsSubject.next(ngoNeeds);
  }

  getNgoNeeds(): Observable<string> {
    return this.ngoNeedsSubject.asObservable();
  }

  setWklyHrs(hours: string) {
    this.wklyHrsSubject.next(hours);
  }

  getWklyHrs(): Observable<string> {
    return this.wklyHrsSubject.asObservable();
  }

  setCrimCheck(check: string) {
    this.crimCheckSubject.next(check);
  }

  getCrimCheck(): Observable<string> {
    return this.crimCheckSubject.asObservable();
  }

  setWorkRefs(refs: string) {
    this.workRefsSubject.next(refs);
  }

  getWorkRefs(): Observable<string> {
    return this.workRefsSubject.asObservable();
  }

  setLinkedIn(linkedIn: string) {
    this.linkedInSubject.next(linkedIn);
  }

  getLinkedIn(): Observable<string> {
    return this.linkedInSubject.asObservable();
  }

  getNGOs(): Observable<NGO[]> {
    return this.ngosSubject.asObservable();
  }

  getVolunteers(): Observable<Vol[]> {
    return this.volSubject.asObservable();
  }

  getAdmins(): Observable<Admin[]> {
    return this.adminSubject.asObservable();
  }

  getAvNow(): Observable<string> {
    return this.avNowSubject.asObservable();
  }

  setAvNow(avNow: string) {
    this.avNowSubject.next(avNow);
  }

  saveUserProfileData(): void {
    const userProfileData = {
      username: this.usernameSubject.getValue(),
      firstName: this.userFirstNameSubject.getValue(),
      lastName: this.userLastNameSubject.getValue(),
      email: this.userEmailSubject.getValue(),
      phone: this.userPhoneSubject.getValue(),
      position: this.currentPositionSubject.getValue(),
      experience: this.yearsOfExperienceSubject.getValue(),
      educationLevel: this.eduLvlSubject.getValue(),
      interests: this.volInterestsSubject.getValue(),
      ngoNeeds: this.ngoNeedsSubject.getValue(),
      weeklyHours: this.wklyHrsSubject.getValue(),
      criminalCheck: this.crimCheckSubject.getValue(),
      workReferences: this.workRefsSubject.getValue(),
      linkedin: this.linkedInSubject.getValue(),
      avNow: this.avNowSubject.getValue(),
    };
    localStorage.setItem('userProfileData', JSON.stringify(userProfileData));
  }

  setUserProfileData(userData: any) {
    this.setUserName(userData.userName);
    this.setUserFirstName(userData.userFirstName);
    this.setUserLastName(userData.userLastName);
    this.setUserEmail(userData.userEmail);
    this.setUserPhone(userData.userPhone);
    this.setCurrentPosition(userData.currentPosition);
    this.setYearsOfExperience(userData.yearsOfExperience);
    this.setEduLvl(userData.eduLvl);
    this.setVolInterests(userData.volInterests);
    this.setNgoNeeds(userData.ngoNeeds);
    this.setWklyHrs(userData.wklyHrs);
    this.setCrimCheck(userData.crimCheck);
    this.setWorkRefs(userData.workRefs);
    this.setLinkedIn(userData.linkedIn);
    this.setAvNow(userData.avNow);
  }

  deleteUser(userName: string): Observable<any> {
    const url = `${this.baseUrl}/${userName}`;
    return this.http.delete(url);
  }

  fetchNGOs(userRole: string): void {
    const url = `${this.baseUrl}?userRole=${userRole}`;
    this.http.get<NGO[]>(url).subscribe((ngos) => {
      this.ngosSubject.next(ngos);
    });
  }

  fetchVolunteers(userRole: string): void {
    const url = `${this.baseUrl}?userRole=${userRole}`;
    this.http.get<Vol[]>(url).subscribe((volunteers) => {
      this.volSubject.next(volunteers);
    });
  }

  fetchAdmins(userRole: string): void {
    const url = `${this.baseUrl}?userRole=${userRole}`;
    this.http.get<Admin[]>(url).subscribe((admins) => {
      this.adminSubject.next(admins);
    });
  }

  updatePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const userName = this.usernameSubject.getValue();
    const updateData = { currentPassword, newPassword };
    const url = `${this.baseUrl}/${userName}/password`;
    return this.http.put(url, updateData);
  }

  resetPassword(userName: string, newPassword: string): Observable<any> {
    const updateData = { userName, newPassword };
    const url = `${this.baseUrl}/${userName}/reset-password`;
    return this.http.put(url, updateData);
  }

}
