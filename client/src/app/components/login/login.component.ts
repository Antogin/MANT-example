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

  user = {
    email: '',
    password: ''
  };

  constructor (private authService: AuthService, private modalService: ModalService, private fileService: FileService) {
  }

  ngOnInit () {}

  authGoogle () {
    let fileToAdd = this.fileService.$files.getValue();

    // this.authService.emailLogin();
      // .then((user) => {
      //   this.fileService.addFiles(fileToAdd, user);
      //   this.modalService.closeModal();
      // });
  }

  login (email, password) {
    this.authService.emailLogin(email, password);


    // this.authService.googleLogin().then(() => {
    //   this.s ubscribeToAuthService();
    // });
  }

  sneak () {
    // this.authService.anonymousLogin();
  }

}
