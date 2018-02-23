import {Component, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../file.service";

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  fileForm: {name: string, file: File} = {name: '', file: null};

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  uploadFile(fileForm: {name: string, file: File}) {
    console.log(fileForm);
    const file = this.fileInput.nativeElement.files[0];
    console.log(this.fileInput.nativeElement);

    this.fileService.uploadFile(file)
      .subscribe((data) => {
      this.fileService.saveFileRef(data);
        console.log(data);
      });
  }
}
