import {Body, Component, Post} from '@nestjs/common';
import {UserModel} from '../user/user.models';
import {CredentialsModel} from './auth.models';
import * as bcrypt from 'bcryptjs';
import {sign, verify} from 'jsonwebtoken';
import {secretKey} from '../../env';

@Component()
export class AuthService {

  constructor() {}

  checkPassword(cred: CredentialsModel, user: UserModel) {
    return new Promise((resolve) => {
      bcrypt.compare(cred.password, user.password).then((res) => {
        delete user.password;
        const data = {
          user,
          valid: res
        };
        resolve(data);
      });
    });
  }

  createToken(userId: string): string {
    const accessToken = sign(
      {
        id: userId,
      },
      secretKey,
      {
        expiresIn: '24 hours',
        issuer: 'API League Team'
      }
    );

    return accessToken;
  }

  checkToken(token: string) {
  }
}
