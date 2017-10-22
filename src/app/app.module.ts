import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { ClipboardModule } from 'ngx-clipboard';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { IonicStorageModule } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { Contacts } from '@ionic-native/contacts';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { MyApp } from './app.component';

import { StorageProvider } from '../providers/storage/storage';
import { ToastProvider } from '../providers/toast/toast';
import { BitpointDataProvider } from '../providers/bitpoint-data/bitpoint-data.provider';

import { AppReducer } from '../reducers/AppReducer';
import { ClipboardProvider } from '../providers/clipboard/clipboard.provider';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      preloadModules: true,
    }),
    IonicStorageModule.forRoot({
      name: '__bitdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    StoreModule.forRoot({counter: AppReducer}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ClipboardModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    Clipboard,
    ToastProvider,
    Contacts,
    AngularFireDatabase,
    BitpointDataProvider,
    ClipboardProvider,
    AuthProvider,
  ]
})
export class AppModule {}
