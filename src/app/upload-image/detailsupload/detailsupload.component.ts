import { Component, Input, OnInit } from "@angular/core";
import { FileUpload } from "../file-upload";
import { UploadImageService } from "../uploadimage.service";

@Component({
  selector: "detailsupload",
  styleUrls: ["./detailsupload.component.css"],
  templateUrl: "./detailsupload.component.html",
})
export class DetailsUploadComponent {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: UploadImageService) { }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}
