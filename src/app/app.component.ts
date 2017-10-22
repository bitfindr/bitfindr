import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthFacade } from './../state';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authFacade: AuthFacade
  ) {

    // This observable only emits when the Firebase authentication
    // state has been checked. Only takes the first value to decide
    // what rootPage should be loaded. Actual Navigation is handled
    // on a Page by Page basis through Side Effects.
    authFacade.authUser$
      .take(1)
      .subscribe(authUser => (this.rootPage = authUser ? 'TabsPage' : 'LoginPage'));

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
