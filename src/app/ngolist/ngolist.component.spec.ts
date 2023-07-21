import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NGOListComponent } from './ngolist.component';

describe('NGOListComponent', () => {
  let component: NGOListComponent;
  let fixture: ComponentFixture<NGOListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NGOListComponent]
    });
    fixture = TestBed.createComponent(NGOListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
