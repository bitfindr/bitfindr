import { QrCodeModalPage } from '../pages/qr-code-modal/qr-code-modal';
import { ContactDetailPage } from '../pages/contact-detail/contact-detail';
import { ComponentsModule } from '../components/components.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { Contacts } from '@ionic-native/contacts';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { ToastProvider } from '../providers/toast/toast';

import { NgxQRCodeModule } from 'ngx-qrcode3';

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
    ComponentsModule
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
