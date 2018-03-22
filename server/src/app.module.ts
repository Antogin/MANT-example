import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ApiController} from './api.controller';
import {FirebaseService} from './firebase.service';
import {MongooseModule} from '@nestjs/mongoose';
import {FileModule} from './file/file.module';
import {WebsocketService} from './websocket.service';
import {DlModule} from './dl/dl.module';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/file'), FileModule, DlModule, UserModule, AuthModule],
  controllers: [AppController, ApiController],
  components: [FirebaseService, WebsocketService],
})
export class ApplicationModule {
}
