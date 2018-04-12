import { inject, TestBed } from "@angular/core/testing";
import { UploadImageService } from "./uploadimage.service";

describe("UploadimageService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadImageService],
    });
  });

  it("should be crea.ted", inject([UploadImageService], (service: UploadImageService) => {
    expect(service).toBeTruthy();
  }));
});
