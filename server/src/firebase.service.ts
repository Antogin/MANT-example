import {Component} from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as moment from 'moment';
import Database = admin.database.Database;

const SERVICE_ACCOUNT = require('./file-io-admin.json');

@Component()
export class FirebaseService {

  db: Database;
  filesCollection;

  constructor () {
    admin.initializeApp({
      credential: admin.credential.cert(SERVICE_ACCOUNT),
      databaseURL: 'https://file-io.firebaseio.com'
    });
    let db = admin.firestore();
    this.filesCollection = db.collection('files');
  }

  markFileAsUsed (key: string) {
    this.filesCollection.where('key', '==', key).get().then((res) => {
      res.forEach((doc) => {
        let file = doc.data();
        file.used = true;
        file.dlTime = moment().format('X');
        doc.ref.set(file);
      });
    });
  }
}
