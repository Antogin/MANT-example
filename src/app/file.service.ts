import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Subject} from 'rxjs/Subject';
import {AuthService} from './auth.service';
import {FileModel} from './file-list.model';
import * as moment from 'moment';
import {last} from "rxjs/operators";

const UNIT_FULL_NAME = {
  'd': 'days',
  'w': 'week',
  'm': 'month',
};

@Injectable()
export class FileService {

  $files: Subject<any> = new Subject();
  ref: AngularFirestoreCollection<any>;
  user: any = null;

  constructor (private http: HttpClient, private db: AngularFirestore, private authService: AuthService) {
    this.subscribeToAuthService();
  }

  subscribeToAuthService () {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.subscribeToFileList();
      }
    });
  }

  subscribeToFileList () {
    this.ref = this.db.collection('files', ref => {
      let userId = this.user.uid;
      return ref.where('userId', '==', userId).orderBy('expires');
    });

    this.ref.snapshotChanges()
      .map(snaps => {
        let items = snaps.map(snap => {
          let item = snap.payload.doc.data();
          item.id = snap.payload.doc.id;
          return item;
        });
        console.log(items);
        return items;
      })
      .subscribe((data) => {
        console.log(data);
        this.$files.next(data);
      });
  }

  uploadFile (file: File, name: string, expireValue: number, expireUnit: string) {
    let userId = this.user ? this.user.uid : null;
    let formData: FormData = new FormData();
    const expires = expireValue + expireUnit;
    formData.append('file', file, file.name);
    let ref = this.db.collection('files');
    let params = new HttpParams().set('expires', expires);
    let expiresTimeStamp = moment().add(UNIT_FULL_NAME[expireUnit], expireValue).format('X');

    const req = new HttpRequest('POST', `https://file.io`, formData, {
      params,
      reportProgress: true,
    });

    const upload = this.http.request(req).share();

    upload.pipe(last())
      .subscribe(
        (lastVal: any) => {
          let item = lastVal.body;
          item.userId = userId;
          item.name = name;
          item.used = false;
          item.link = 'http://localhost:3000/dl/' + item.key;
          item.expires = expiresTimeStamp;
          return ref.add(item);
        }
      );

    return upload;
    // return this.http.post(`https://file.io`, formData, {params})
    //   .map((item: FileModel) => {
    //     // console.log(item);
    //     item.userId = userId;
    //     item.name = name;
    //     item.used = false;
    //     item.expires = expiresTimeStamp;
    //     return ref.add(item);
    //   });
  }

  dlFile (file: FileModel) {
    file.used = true;
    file.dlTime = moment().format('X');
    return this.db.collection('files').doc(file.id).set(file);
  }

  deleteFiles (files: Array<FileModel>) {
    console.log('delete', files);
    files.forEach((file) => {
      this.db.collection('files').doc(file.id).delete();
    });
  }

}
