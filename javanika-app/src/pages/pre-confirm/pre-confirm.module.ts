import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreConfirmPage } from './pre-confirm';

@NgModule({
  declarations: [
    PreConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(PreConfirmPage),
  ],
})
export class PreConfirmPageModule {}
