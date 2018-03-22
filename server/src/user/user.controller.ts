import {Body, Controller, Post, Res} from '@nestjs/common';
import {UserDTO} from './user.models';
import {UserService} from './user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post()
  createUser(@Res() res, @Body() userDTO: UserDTO) {
    console.log(this.userService);
    console.log(this);
    res.json('gg');
  }
}
