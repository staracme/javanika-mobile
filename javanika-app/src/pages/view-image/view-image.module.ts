import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewImagePage } from './view-image';

@NgModule({
  entryComponents: [
    ViewImagePage
  ],
  declarations: [
    ViewImagePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewImagePage),
  ],
  exports: [
    ViewImagePage
  ]
})
export class ViewImagePageModule { }
