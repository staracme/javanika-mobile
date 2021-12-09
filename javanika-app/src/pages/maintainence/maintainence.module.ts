import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintainencePage } from './maintainence';

@NgModule({
  declarations: [
    MaintainencePage,
  ],
  imports: [
    IonicPageModule.forChild(MaintainencePage),
  ],
})
export class MaintainencePageModule {}
