import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactDetailPage } from './contact-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ContactDetailPage],
  imports: [ComponentsModule, IonicPageModule.forChild(ContactDetailPage)],
})
export class ContactDetailPageModule {}
