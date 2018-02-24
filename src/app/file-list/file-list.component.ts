import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from '../modal/modal.service';
import {MODAL_NAME} from '../modal/modal-name';
import {FileService} from '../file.service';
import {FileModel} from '../file-list.model';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  files: Array<FileModel> = [];

  constructor(private modalService: ModalService, private fileService: FileService) { }

  ngOnInit() {
    this.fileService.$files.subscribe((data) => {
      this.files = data;
    });
  }

  addFile() {
    this.modalService.openModal(MODAL_NAME.fileForm);
  }

  dlFile(file: FileModel) {
    this.fileService.dlFile(file).then((data) => console.log(data));
  }

  removeDownloaded() {
    let filesToDelete = this.files.filter((files) => files.used);
    this.fileService.deleteFiles(filesToDelete);
  }
}
