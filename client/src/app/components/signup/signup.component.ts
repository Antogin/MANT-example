import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ModalService} from '../../shared/modal/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: '',
    displayName: ''
  };
  errorMessage = null;

  constructor (private authService: AuthService, private modalService: ModalService) {
  }

  ngOnInit () {
  }

  signUp (email, displayName, password) {
    this.authService.signUp(email, displayName, password).subscribe(() => {
        this.modalService.closeModal();
      },
      (error) => {
        this.errorMessage = error.error;
      });
  }
}
