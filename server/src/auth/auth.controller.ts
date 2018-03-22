import {Body, Controller, Post, Res} from '@nestjs/common';
import {SignUpDto} from './DTO/auth.dto';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('signup')
  signUp(@Res() res, @Body() signUpDto: SignUpDto) {
    console.log(this.authService);
    res.json('gg');
    // this.authService.createUser(body).then((user) => {
    //   res.json(user);
    // });
  }
}
