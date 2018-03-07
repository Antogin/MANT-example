import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {WebsocketService} from '../websocket.service';
import {FileSchema} from '../file/file.schema';
import {DlController} from './dl.controller';
import {FileService} from '../file/file.service';
import {FileGateway} from '../file/file.gateway';

@Module({
  imports: [MongooseModule.forFeature([{name: 'File', schema: FileSchema}])],
  controllers: [DlController],
  components: [FileService, FileGateway, WebsocketService],
})
export class DlModule {
}
