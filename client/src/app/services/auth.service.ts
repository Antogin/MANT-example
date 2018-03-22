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
        console.log(data);
        this.emailLogin(email, password);
        this.updateUserData(data);
      });
  }

  public anonymousLogin() {
    this.http.get('http://localhost:3000/auth/anonymous')
      .subscribe((data) => {
        console.log('anon', data);
        this.updateUserData(data);
      });
  }

  get accessToken() {
    const user = this.user.getValue();
    return user ? user.accessToken : null;
  }

  public emailLogin(email: string, password: string) {
    const payload = {email, password};

    this.http.post('http://localhost:3000/auth/sign-in', payload)
      .subscribe((data) => {
        console.log(data);
        this.updateUserData(data);
      });
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
        this.updateUserData(cred.user);
        return cred.user;
      });
  }

  private updateUserData(user, anonymous?) {
    console.log(user);
    this.user.next(user);
    // sessionStorage.setItem('user', JSON.stringify(user));
    // this.user = ref.valueChanges();
    // return ref.set(user);
  }

  public logout() {
    this.anonymousLogin();
  }
}
