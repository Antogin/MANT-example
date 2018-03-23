import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserModel} from '../models/user.model';


@Injectable()
export class AuthService {

  user: BehaviorSubject<UserModel>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.user = new BehaviorSubject(null);
  }

  public init() {
    // const user = sessionStorage.getItem('user');

    // console.log(user);

    // if (user) {
    //   const parsedUser = JSON.parse(user);
    //   this.updateUserData(parsedUser);
    // } else {
      this.anonymousLogin();
    // }
  }

  public googleLogin() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // return this.oAuthLogin(provider);
  }

  public signUp(email, displayName, password) {
    const payload = {email, displayName, password, anonymous: false};

    this.http.post('http://localhost:3000/user', payload)
      .subscribe((data) => {
        this.emailLogin(email, password);
        this.updateUserData(data);
      });
  }

  public anonymousLogin() {
    this.http.get('http://localhost:3000/auth/anonymous')
      .subscribe((data) => {
        this.updateUserData(data);
      });
  }

  get accessToken() {
    const user = this.user.getValue();
    return user ? user.accessToken : null;
  }

  public emailLogin(email: string, password: string) {
    const payload = {email, password};

    const req = this.http.post('http://localhost:3000/auth/sign-in', payload);

    req
      .subscribe((data) => {
        this.updateUserData(data);
      });

    return req
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
        this.updateUserData(cred.user);
        return cred.user;
      });
  }

  private updateUserData(user, anonymous?) {
    this.user.next(user);
    // sessionStorage.setItem('user', JSON.stringify(user));
    // this.user = ref.valueChanges();
    // return ref.set(user);
  }

  public logout() {
    this.anonymousLogin();
  }
}
