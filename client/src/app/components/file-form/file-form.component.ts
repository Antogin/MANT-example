import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../services/file.service';
import {ModalService} from '../../shared/modal/modal.service';
import {last} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('dlLinkInput') dlLinkInput: ElementRef;
  fileForm = {
    name: '',
    expireUnit: 'd',
    expireValue: 14,
    file: null
  };

  file: File = null;
  uploadPercentage = 0;
  dlLink: string = null;

  constructor (private fileService: FileService, private modalService: ModalService) {
  }

  ngOnInit () {
  }

  fileChange (e) {
    let fileList: FileList = e.target.files;
    if (fileList.length) {
      this.file = fileList[0];
    }
  }

  copyLink() {
    this.dlLinkInput.nativeElement.select();
    document.execCommand('copy');
  }

  uploadFile () {
    const name = this.fileForm.name;
    const file = this.fileInput.nativeElement.files[0];
    const expireValue = this.fileForm.expireValue;
    const expireUnit = this.fileForm.expireUnit;
    const upload = this.fileService.uploadFile(file, name, expireValue, expireUnit);

    upload.filter((event) => event.type === 1)
      .subscribe((val: any) => {
        let percentage = (val.loaded / val.total) * 100;
        console.log(percentage);
        this.uploadPercentage = percentage;
      });

    upload.pipe(last())
      .subscribe(
        (lastVal: any) => {
          const link = `${environment.domain}dl/${lastVal.body.key}`;
          this.dlLink = link;
          setTimeout(() => {
            this.dlLinkInput.nativeElement.select();
          }, 0);
        }
      );

    this.uploadPercentage = 1;
  }
}
