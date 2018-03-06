import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ModalService} from '../../shared/modal/modal.service';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (private authService: AuthService, private modalService: ModalService, private fileService: FileService) {
  }

  ngOnInit () {}

  authGoogle () {
    let fileToAdd = this.fileService.$files.getValue();

    this.authService.googleLogin()
      .then((user) => {
        this.fileService.addFiles(fileToAdd, user);
        this.modalService.closeModal();
      });
  }

  sneak () {
    this.authService.anonymousLogin();
  }

}
