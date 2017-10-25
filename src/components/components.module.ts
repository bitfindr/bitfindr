import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ContactComponent } from './contact/contact';
import { WalletItemComponent } from './wallet-item/wallet-item';
@NgModule({
  declarations: [ContactComponent, WalletItemComponent],
  imports: [IonicModule],
  exports: [ContactComponent, WalletItemComponent],
})
export class ComponentsModule {}
