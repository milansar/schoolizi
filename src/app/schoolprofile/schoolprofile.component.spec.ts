import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolprofileComponent } from './schoolprofile.component';

describe('SchoolprofileComponent', () => {
  let component: SchoolprofileComponent;
  let fixture: ComponentFixture<SchoolprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
