import { Component, OnInit } from "@angular/core";
import { FileUpload } from "../file-upload";
import { UploadImageService } from "../uploadimage.service";

@Component({
  selector: "list-upload",
  styleUrls: ["./list-upload.component.css"],
  templateUrl: "./list-upload.component.html",
})
export class ListUploadComponent implements OnInit {

  fileUploads: any[];

  constructor(private uploadService: UploadImageService) { }

  ngOnInit() {
    // Use snapshotChanges().map() to store the key
    this.uploadService.getFileUploads(5).snapshotChanges().map((changes) => {
      return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe((fileUploads) => {
      this.fileUploads = fileUploads;
    });
  }
}
