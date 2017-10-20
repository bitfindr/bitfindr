import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  priority: 'high'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'UserSearchPage';

  constructor() {

  }
}
