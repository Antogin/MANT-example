import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  user: any = null;

  constructor(private authService: AuthService) {
    this.authService.init();
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
