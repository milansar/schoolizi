import { Component, OnInit } from '@angular/core';

import { FileUpload } from '../fileupload';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  fileUploads: any[];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.uploadService.getFileUploads(6).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

}
