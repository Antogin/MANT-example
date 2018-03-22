import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  signUp(email, displayName, password) {
    this.authService.signUp(email, displayName, password);
  }
}
