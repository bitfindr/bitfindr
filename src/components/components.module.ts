import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ContactComponent } from './contact/contact';
@NgModule({
	declarations: [ContactComponent],
	imports: [IonicModule],
	exports: [ContactComponent]
})
export class ComponentsModule {}
