import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AboutPage),
  ],
})
export class AboutPageModule {}
