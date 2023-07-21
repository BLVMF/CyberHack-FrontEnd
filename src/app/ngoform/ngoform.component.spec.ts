import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NGOFormComponent } from './ngoform.component';

describe('NGOFormComponent', () => {
  let component: NGOFormComponent;
  let fixture: ComponentFixture<NGOFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NGOFormComponent]
    });
    fixture = TestBed.createComponent(NGOFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
