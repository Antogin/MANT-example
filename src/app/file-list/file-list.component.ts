import { Component, OnInit } from '@angular/core';
import {ModalService} from '../modal/modal.service';
import {MODAL_NAME} from '../modal/modal-name';
import {FileService} from '../file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  files;

  constructor(private modalService: ModalService, private fileService: FileService) { }

  ngOnInit() {
    this.fileService.$files.subscribe((data) => {
      this.files = data;
    });
  }

  addFile() {
    this.modalService.openModal(MODAL_NAME.fileForm);
  }
}
