import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FileListComponent } from './file-list/file-list.component';
import { ModalComponent } from './modal/modal.component';
import { FileFormComponent } from './file-form/file-form.component';
import {ModalService} from './modal/modal.service';
import {FormsModule} from '@angular/forms';
import {FileService} from './file.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from './auth.service';
import { FromNowPipe } from './from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    ModalComponent,
    FileFormComponent,
    LoginComponent,
    HeaderComponent,
    FromNowPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFirestoreModule
  ],
  providers: [ModalService, FileService, HttpClientModule, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
