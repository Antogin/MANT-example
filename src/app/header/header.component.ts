import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ModalService} from '../modal/modal.service';
import {MODAL_NAME} from '../modal/modal-name';
import {Subscription} from 'rxjs/Subscription';
import {first} from 'rxjs/operators';
import {FileService} from "../file.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = null;
  $user: Subscription = null;
  loading = true;

  constructor (public authService: AuthService, private modalService: ModalService, private fileService: FileService) {
  }

  ngOnInit () {
    this.subscribeToAuthService();
  }

  subscribeToAuthService () {
    this.$user = this.authService.user
      .subscribe((user) => {
        console.log('ga =>', user);
        if (!user) {
          this.authService.anonymousLogin();
        }
        this.user = user;
      });
    this.authService.user.pipe(first(() => this.loading = false)).subscribe();
  }

  login () {
    this.modalService.openModal(MODAL_NAME.loginForm);

    // this.authService.googleLogin().then(() => {
    //   this.s ubscribeToAuthService();
    // });
  }

  logout () {
    this.authService.logout().then(() => {
      this.fileService.resetFile();
    });
  }
}
