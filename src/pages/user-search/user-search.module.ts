import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSearchPage } from './user-search';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [UserSearchPage],
  imports: [ComponentsModule, IonicPageModule.forChild(UserSearchPage)],
})
export class UserSearchPageModule {}
