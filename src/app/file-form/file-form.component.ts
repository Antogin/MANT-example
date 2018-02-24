import {Component, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../file.service";
import {ModalService} from "../modal/modal.service";

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  fileForm = {
    name: '',
    expireUnit: 'd',
    expireValue: 14,
    file: null
  };

  constructor(private fileService: FileService, private modalService: ModalService) { }

  ngOnInit() {
  }

  uploadFile() {
    const name = this.fileForm.name;
    const file = this.fileInput.nativeElement.files[0];
    const expireValue = this.fileForm.expireValue;
    const expireUnit = this.fileForm.expireUnit;
    console.log(expireValue, expireUnit);

    this.fileService.uploadFile(file, name, expireValue, expireUnit)
      .subscribe(() => {
        this.modalService.closeModal();
      });
  }
}
