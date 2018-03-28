import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserSchema} from './user.schema';
import {Model} from 'mongoose';
import {UserDTO, UserModel} from './user.models';
// import { compare, genSalt, hash } from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
import {validateEmail} from '../utls/validations';

const saltRounds = 10;

@Component()
export class UserService {

  constructor (@InjectModel(UserSchema) private readonly userModel: Model<UserModel>) {
  }

  createUser (userDTO: UserDTO) {
    console.log(userDTO);
    return this.userModel.findOne({'email': userDTO.email}).exec().then((user) => {
      if (user) {
        throw new Error('Role "user" is missing.');
      }

      return bcrypt.hash(userDTO.password, 10).then(hash => {
        console.log(hash);
        userDTO.password = hash;
        const createdUser = new this.userModel(userDTO);
        return createdUser.save();
      });
    });
  }

  createAnonymousUser (userDTO) {
    return bcrypt.hash(userDTO.password, 10).then(hash => {
      console.log(hash);
      userDTO.password = hash;
      const createdUser = new this.userModel(userDTO);
      return createdUser.save();
    });
  }

  findUser (email: string): Promise<UserModel> {
    return this.userModel.findOne({'email': email}).exec();
  }

  validateUserDto (user: UserDTO) {
    return validateEmail(user.email);
  }
}
