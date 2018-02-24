import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ModalService} from "../modal/modal.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (private authService: AuthService, private modalService: ModalService) {
  }

  ngOnInit () {
  }

  authGoogle () {
    this.authService.googleLogin()
      .then(() => {
        this.modalService.closeModal();
      });
  }

  authGithub () {
    console.log('authGithub');
    this.authService.githubLogin();
  }

}
