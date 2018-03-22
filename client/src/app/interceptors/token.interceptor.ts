import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);
    if (req.url.indexOf('file.io') === -1) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.authService.accessToken}`
        }
      });
    }
    return next.handle((req));
  }
}
