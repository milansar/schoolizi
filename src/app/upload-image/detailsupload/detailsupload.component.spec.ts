import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailsUploadComponent } from "./detailsupload.component";

describe("DetailsuploadComponent", () => {
  let component: DetailsUploadComponent;
  let fixture: ComponentFixture<DetailsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsUploadComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
