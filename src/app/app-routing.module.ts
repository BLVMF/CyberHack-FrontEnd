import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { AboutComponent } from './about/about.component';
import { NGOFormComponent } from './ngoform/ngoform.component';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { FormSubmissionComponent } from './form-submission/form-submission.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VolHomeComponent } from './vol-home/vol-home.component';
import { NgoHomeComponent } from './ngo-home/ngo-home.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { NGOListComponent } from './ngolist/ngolist.component';
import { VolListComponent } from './vol-list/vol-list.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminPasswordResetComponent } from './admin-password-reset/admin-password-reset.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'ngo-home',
    component: NgoHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ngo'] },
  },
  {
    path: 'vol-home',
    component: VolHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['volunteer'] },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'about', component: AboutComponent },
  { path: 'ngoform', component: NGOFormComponent },
  { path: 'volunteer-form', component: VolunteerFormComponent },
  { path: 'form-submission', component: FormSubmissionComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'user-update',component: UserUpdateComponent },
  {
    path: 'ngos-list',
    component: NGOListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['volunteer'] },
  },
  {
    path: 'vol-list',
    component: VolListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ngo'] },
  },
  {
    path: 'new-user',
    component: NewUserFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  { path: 'change-password', component: ChangePasswordComponent },
  {
    path: 'admin-password-reset',
    component: AdminPasswordResetComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
