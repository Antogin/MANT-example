import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';


interface User {
  uid: string;
  displayName: string;
  anonymous: boolean;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  public anonymousLogin() {
    console.log('anon');
    this.afAuth.auth.signInAnonymously().then((cred) => {
      console.log(cred);
      this.updateUserData(cred, true);
    });
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
      console.log(cred);
        this.updateUserData(cred.user);
        return cred.user;
      });
  }

  private updateUserData(user, anonymous?) {
    const ref = this.afStore.doc<User>(`users/${user.uid}`);

    this.user = ref.valueChanges();

    const userData = {
      displayName: user.displayName,
      uid: user.uid,
      anonymous: !!anonymous
    };
    return ref.set(userData);
  }

  public logout() {
     return this.afAuth.auth.signOut().then(() => {
       this.anonymousLogin();
     });
  }
}
