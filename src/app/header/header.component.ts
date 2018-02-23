import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ModalService} from '../modal/modal.service';
import {MODAL_NAME} from '../modal/modal-name';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = null;
  $user: Subscription = null;

  constructor (public authService: AuthService, private modalService: ModalService) {
  }

  ngOnInit () {
    this.subscribeToAuthService();
  }

  subscribeToAuthService () {
    this.$user = this.authService.user.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  login () {
    this.modalService.openModal(MODAL_NAME.loginForm);

    // this.authService.googleLogin().then(() => {
    //   this.subscribeToAuthService();
    // });
  }

  logout () {
    this.authService.logout();
  }
}
