import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingSummaryPage } from './booking-summary';

@NgModule({
  declarations: [
    BookingSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingSummaryPage),
  ],
})
export class BookingSummaryPageModule {}
