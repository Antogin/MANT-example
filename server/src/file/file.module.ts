import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {FileController} from './file.controller';
import {FileSchema} from './file.schema';
import {FileService} from './file.service';
import {FileGateway} from './file.gateway';
import {WebsocketService} from '../websocket.service';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import {AuthMiddleware} from '../auth/auth.middleware';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'File', schema: FileSchema }])],
    controllers: [FileController],
    components: [FileService, FileGateway, WebsocketService],
})
export class FileModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(FileController);
  }
}
