import {Body, Controller, HttpException, HttpStatus, Post, Res, Response} from '@nestjs/common';
import {UserDTO} from './user.models';
import {UserService} from './user.service';

@Controller('user')
export class UserController {

  constructor (private userService: UserService) {
  }

  @Post()
  createUser (@Res() res, @Body() userDTO: UserDTO) {
    if (this.userService.validateUserDto(userDTO)) {
      this.userService.createUser(userDTO).then((user) => {
        res.json(user);
      }).catch((e) => {
        res.status(400);
        res.json('duplicate');
      });
    } else {
      res.status(400);
      res.json('Bad request');
    }
  }
}
