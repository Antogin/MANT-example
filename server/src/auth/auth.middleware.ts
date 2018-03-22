import {Middleware, NestMiddleware} from '@nestjs/common';

import {verify} from 'jsonwebtoken';
import {secretKey} from '../../env';

@Middleware()
export class AuthMiddleware implements NestMiddleware {

  constructor() {
  }

  resolve() {

    return (req, res, next) => {

      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];

        console.log(token);

        verify(token, secretKey, function (err, payload) {
          if (!err) {
            req.payload = payload;
            next();
          } else {
            return res.status(403).json(err);
          }
        });
      } else {
        return res.status(401).json('You must provide a valid authenticated access token.');
      }
    };
  }
}
