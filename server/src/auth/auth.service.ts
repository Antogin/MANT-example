import {Body, Component, Post} from '@nestjs/common';
import {SignUpDto} from './DTO/auth.dto';
import {InjectModel} from '@nestjs/mongoose';
import {UserSchema} from '../user/user.schema';
import {UserModel} from './user.model';
import {Model} from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';

@Component()
export class AuthService {

  constructor(@InjectModel(UserSchema) private readonly userModel: Model<UserModel>) {}

  createUser(signUpDto: SignUpDto) {
    signUpDto.password = genSalt().then(s => hash(signUpDto.password, s));
    const createdUser = new this.userModel(signUpDto);
    return createdUser.save();
  }
}
