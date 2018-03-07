import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AuthService} from './auth.service';
import {FileModel} from '../models/file.model';
import * as moment from 'moment';
import {last} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserModel} from '../models/user.model';

const UNIT_FULL_NAME = {
  'd': 'days',
  'w': 'week',
  'm': 'month',
};

@Injectable()
export class FileService {

  $files: BehaviorSubject<Array<FileModel>> = new BehaviorSubject(null);
  ref: AngularFirestoreCollection<any>;
  user: UserModel = null;

  constructor (private http: HttpClient, private db: AngularFirestore, private authService: AuthService) {
    this.subscribeToAuthService();
  }

  subscribeToAuthService () {
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.getToFileList();
      }
    });
  }

  getToFileList () {
    const userId = this.user.uid;
    const headers = new HttpHeaders().append('userId', userId);

    this.http.get('http://localhost:3000/file', {headers}).subscribe((data: FileModel[]) => {
      this.$files.next(data);
    });
  }

  uploadFile (file: File, name: string, expireValue: number, expireUnit: string) {
    const userId = this.user ? this.user.uid : null;
    let formData: FormData = new FormData();
    const expires = expireValue + expireUnit;
    formData.append('file', file, file.name);
    const params = new HttpParams().set('expires', expires);
    const expiresTimeStamp = moment().add(UNIT_FULL_NAME[expireUnit], expireValue).format('X');

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
          item.name = name ? name : item.key;
          item.used = false;
          item.link = `${environment.domain}dl/${item.key}`;
          item.expires = expiresTimeStamp;
          return this.http.post('http://localhost:3000/file/', item).subscribe((data) => {
            console.log('add file', data);
          });
          // return ref.add(item);
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

  addFiles (files: FileModel[], user) {
    let ref = this.db.collection('files');
    files.forEach((file) => {
      file.userId = user.uid;
      ref.add(file);
    });
  }

  fileAdded (file: FileModel) {
    let value = this.$files.getValue();
    value.push(file);
    this.$files.next(value);
  }

  fileChanged (file: FileModel) {
    const files = this.$files.getValue().map((item) => {
      if (item._id === file._id) {
        item = file;
      }
      return item;
    });

    this.$files.next(files);
  }

  filesDeleted (ids: string[]) {
    const files = this.$files.getValue();

    const newFiles = files.filter((file) => {
      return ids.every((id) => {
        return id !== file._id;
      });
    });
    this.$files.next(newFiles);
  }

  resetFile () {
    this.$files.next([]);
  }

  dlFile (file: FileModel) {
    file.used = true;
    file.dlTime = moment().format('X');
    return this.db.collection('files').doc(file._id).set(file);
  }

  deleteFiles (ids: string[]) {
    const userId = this.user.uid;
    const headers = new HttpHeaders().append('userId', userId);
    const options = {
      body: ids,
      headers
    };
    return this.http.delete(environment.domain + 'file/', options);
    // files.forEach((file) => {
    //   this.db.collection('files').doc(file._id).delete();
    // });
  }

}
