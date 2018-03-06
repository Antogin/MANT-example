import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { ModalComponent } from './shared/modal/modal.component';
import { FileFormComponent } from './components/file-form/file-form.component';
import {ModalService} from './shared/modal/modal.service';
import {FormsModule} from '@angular/forms';
import {FileService} from './services/file.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import {AuthService} from './services/auth.service';
import { FromNowPipe } from './pipes/from-now.pipe';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import {SocketService} from './services/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    ModalComponent,
    FileFormComponent,
    LoginComponent,
    HeaderComponent,
    FromNowPipe,
    SanitizerPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFirestoreModule
  ],
  providers: [ModalService, FileService, HttpClientModule, AuthService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
