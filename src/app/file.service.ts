import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Subject} from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";

@Injectable()
export class FileService {

  $files: Subject<any> = new Subject();
  ref: AngularFirestoreCollection<any>;

  constructor (private http: HttpClient, private db: AngularFirestore) {
    this.ref = db.collection('files');
    this.ref.valueChanges()
      .subscribe((data) => {
        console.log(data);
        this.$files.next(data);
      });
  }

  uploadFile (file: File) {
    console.log(file);
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`https://file.io`, formData);
  }

  saveFileRef (data) {
    this.ref.add(data);
  }

}
