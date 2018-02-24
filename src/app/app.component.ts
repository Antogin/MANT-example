import { Component } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  user: any = null;

  constructor(private authService: AuthService){
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
