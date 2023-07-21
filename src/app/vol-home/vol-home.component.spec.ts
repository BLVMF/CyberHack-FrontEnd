import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolHomeComponent } from './vol-home.component';

describe('VolHomeComponent', () => {
  let component: VolHomeComponent;
  let fixture: ComponentFixture<VolHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolHomeComponent]
    });
    fixture = TestBed.createComponent(VolHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
