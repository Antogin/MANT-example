import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap () {
  const app = await NestFactory.create(ApplicationModule);
  app.use(bodyParser.json());
  app.use(express.static('front-end'));
  app.use(cors());
  app.engine('html', require('ejs').renderFile);
  await app.listen(3000);
}

bootstrap();
