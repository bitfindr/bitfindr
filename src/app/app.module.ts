import { MyApp } from './app.component';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StoreModule } from '@ngrx/store';
import { NgxQRCodeModule } from 'ngx-qrcode3';

import { Clipboard } from '@ionic-native/clipboard';
import { Contacts } from '@ionic-native/contacts';

import {
  AboutPage,
  HomePage,
  TabsPage,
  QrCodeModalPage,
  ContactDetailPage,
} from '../pages/pages'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { ToastProvider } from '../providers/toast/toast';

import { AppReducer } from '../reducers/AppReducer';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ContactDetailPage,
    QrCodeModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
    }),
    IonicStorageModule.forRoot({
      name: '__bitdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    NgxQRCodeModule,
    ComponentsModule,
    StoreModule.forRoot({counter: AppReducer})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ContactDetailPage,
    QrCodeModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    Clipboard,
    ToastProvider,
    Contacts
  ]
})
export class AppModule {}
