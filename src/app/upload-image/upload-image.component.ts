import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "@firebase/util";
import { AngularFireStorage } from "angularfire2/storage";
import { FileUpload } from "./file-upload";
import { UploadImageService } from "./uploadimage.service";

@Component({
  selector: "app-upload-image",
  styleUrls: ["./upload-image.component.css"],
  templateUrl: "./upload-image.component.html",
})
export class UploadImageComponent {
  // downloadURL: Observable<string>;
  // uploadProgress: Observable<number>;
  // task: any;
  // ref: any;
  // constructor(private storage: AngularFireStorage) { }
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadService: UploadImageService) { }
  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match("image.*")) {
      this.selectedFiles = event.target.files;
    } else {
      alert("invalid format!");
    }
  }
  uploadFile(event) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
}

  // uploadFile(event)
  /*  {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.task.downloadURL();
  } */
