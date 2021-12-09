import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventspagePage } from './eventspage';

@NgModule({
  declarations: [
    EventspagePage,
  ],
  imports: [
    IonicPageModule.forChild(EventspagePage),
  ],
})
export class EventspagePageModule {}
