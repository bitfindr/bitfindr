import { BitfindrDataProvider } from '../providers/bitfindr-data/bitfindr-data.provider';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { ClipboardModule } from 'ngx-clipboard';

import { IonicStorageModule } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { Contacts } from '@ionic-native/contacts';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';

import { MyApp } from './app.component';

import { StorageProvider } from './../providers/storage/storage';
import { ToastProvider } from './../providers/util/toast/toast';
import { ClipboardProvider } from './../providers/clipboard/clipboard.provider';
import { AuthProvider } from './../providers/auth/auth.provider';
import { AlertService } from '../providers/util/alert/alert';

import {
  ROOT_REDUCER,
  META_REDUCERS,
  AuthFacade,
  ProfileFacade,
} from './../state';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      preloadModules: true,
    }),
    IonicStorageModule.forRoot({
      name: '__bitdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    }),
    StoreModule.forRoot(ROOT_REDUCER, { metaReducers: META_REDUCERS }),
    EffectsModule.forRoot([AuthFacade, ProfileFacade]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    ClipboardModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StorageProvider,
    Clipboard,
    ToastProvider,
    Contacts,
    Facebook,
    BitfindrDataProvider,
    ClipboardProvider,
    AuthProvider,
    AuthFacade,
    AlertService,
  ],
})
export class AppModule {}
