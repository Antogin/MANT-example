import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ApiController} from './api.controller';
import {FirebaseService} from './firebase.service';
import {DlController} from './dl.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {FileModule} from './file/file.module';
import {WebsocketService} from './websocket.service';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/file'), FileModule],
    controllers: [AppController, ApiController, DlController],
    components: [FirebaseService, WebsocketService],
})
export class ApplicationModule {
}
