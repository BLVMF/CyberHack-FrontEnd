import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPasswordResetComponent } from './admin-password-reset.component';

describe('AdminPasswordResetComponent', () => {
  let component: AdminPasswordResetComponent;
  let fixture: ComponentFixture<AdminPasswordResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPasswordResetComponent]
    });
    fixture = TestBed.createComponent(AdminPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
