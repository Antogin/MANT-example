import {BadRequestException, Body, Controller, Get, Post, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CredentialsModel} from './auth.models';
import {UserService} from '../user/user.service';
import {sign, verify} from 'jsonwebtoken';
import {UserDTO, UserModel} from '../user/user.models';
import {secretKey} from '../../env';

const KEY = 'DF5yttD11yMMTVKq6hegkAI44LqRM5WUmE0KIP1kWWjHGe7rMU8MPd3KVgkHta9GOeEGVlhk73Zl9mBXaqdAt60V1e5g' +
  '8h_AwFt9Faap0Go9Zyysml2D-gBedVhaF' +
  'lKyOSFuRZtYjiuHxYoCPipG6T8gJ-Lir7CFpVYd0fASFWDHGRUobZr9au0M5TBYK-0luHI3HDCtTyrXZZ1hK-oOh_wvaZfqA' +
  'g77bhRavgfmKNE7uYBmIkb3ecwHfcaPA9deobfyjO_LIfePAR-c6K57b7Yxz33GU5_dWPM3C66WsLpqnZc2rfXiyLURYvd4NbcdgRnbVdtclQ2fLs0XNfE0sQ';

@Controller('auth')
export class AuthController {

  constructor(private userService: UserService, private authService: AuthService) {
  }

  @Post('sign-in')
  signIn(@Res() res, @Body() credentials: CredentialsModel) {
    let userId: string;

    console.log('cred');
    console.log(credentials);

    this.userService.findUser(credentials.email).then(user => {
      console.log(user);
      if (!user) {
        res.status(401).json('Email address does not exist.');
        return;
      }
      userId = user._id;
      return this.authService.checkPassword(credentials, user);
    }).then((data: { user: UserModel, valid: boolean }) => {
      const {displayName, email, _id} = data.user;
      if (data.valid) {
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
        res.json({accessToken, displayName, email, _id});
      } else {
        res.status(400);
        res.json('Wrong password user combination');
      }
    }).catch((error) => {
      res.status(400);
      res.json('no user');
    });
  }

  @Get('anonymous')
  anonymousSignIn(@Res() res) {
    const user: UserDTO = {
      displayName: '',
      email: '',
      password: '',
      anonymous: true
    };
    this.userService.createAnonymousUser(user).then((createdUser: UserModel) => {
      const {displayName, email, _id, anonymous} = createdUser;
      const accessToken = this.authService.createToken(_id);
      res.json({accessToken, displayName, email, _id, anonymous});
    });
  }

}
