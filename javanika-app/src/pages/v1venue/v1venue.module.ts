import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { V1venuePage } from './v1venue';

@NgModule({
  declarations: [
    V1venuePage,
  ],
  imports: [
    IonicPageModule.forChild(V1venuePage),
  ],
})
export class V1venuePageModule {}
