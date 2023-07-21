import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { NGOFormComponent } from './ngoform/ngoform.component';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { FormSubmissionComponent } from './form-submission/form-submission.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { UserUpdateComponent } from './user-update/user-update.component';
import { CookieService } from 'ngx-cookie-service';
import { UserProfileService } from './_services/user-profile.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NGOListComponent } from './ngolist/ngolist.component';
import { VolListComponent } from './vol-list/vol-list.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminPasswordResetComponent } from './admin-password-reset/admin-password-reset.component';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    ForbiddenComponent,
    AboutComponent,
    NGOFormComponent,
    VolunteerFormComponent,
    FormSubmissionComponent,
    ForgotPasswordComponent,
    UserUpdateComponent,
    NGOListComponent,
    VolListComponent,
    NewUserFormComponent,
    ChangePasswordComponent,
    AdminPasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserProfileService,
    UserUpdateComponent,
    CookieService,
    AuthGuard,
    MatDialog,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
