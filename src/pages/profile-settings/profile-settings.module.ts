import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileSettingsPage } from './profile-settings';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ProfileSettingsPage],
  imports: [ComponentsModule, IonicPageModule.forChild(ProfileSettingsPage)],
})
export class ProfileSettingsPageModule {}
