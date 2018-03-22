
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../user/user.schema';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: UserSchema }])],
  controllers: [AuthController],
  components: [AuthService],
})
export class AuthModule {}
