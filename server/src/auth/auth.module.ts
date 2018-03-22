
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../user/user.schema';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: UserSchema }])],
  controllers: [AuthController],
  components: [AuthService, UserService],
})
export class AuthModule {}
