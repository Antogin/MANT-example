import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../shared/modal/modal.service';
import {MODAL_NAME} from '../../shared/modal/modal-name';
import {FileService} from '../../services/file.service';
import {FileModel} from '../../models/file.model';
import {SocketService} from '../../services/socket.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  files: Array<FileModel> = [];

  constructor (private modalService: ModalService, private fileService: FileService, private socketService: SocketService) {
  }

  ngOnInit () {
    this.fileService.$files.subscribe((data) => {
      console.log(data);
      this.files = data;
    });
  }

  addFile () {
    this.modalService.openModal(MODAL_NAME.fileForm);
  }

  dlFile (file: FileModel) {
    // this.fileService.dlFile(file).then((data) => console.log(data));
  }

  removeDownloaded () {
    let filesToDelete = this.files.filter((files) => files.used).map((file) => file._id);
    this.fileService.deleteFiles(filesToDelete).subscribe(() => {});
  }
}
