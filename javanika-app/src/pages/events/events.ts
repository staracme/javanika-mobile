import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CommonProvider } from '../../providers/common/common';
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  event = {};
  seatingChart = '';
  eventID: number = 0;
  isPastEvent: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private common: CommonProvider, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.eventID = this.navParams.get('eventID');
    this.getEventDetails(this.navParams.get('eventID'));
  }


  getEventDetails(eventID) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...',
      enableBackdropDismiss: false
    });

    loading.present();

    this.http.post(this.common.apiURL + '/EventDetails', { eventID: eventID }).subscribe((data: any) => {
      this.event = data;
      this.seatingChart = data.SeatingChart;
      this.eventID = data.EventID;
      this.isPastEvent = data.isPastEvent;
      loading.dismiss();
    });
  }

  goToVenue() {
    this.navCtrl.push(this.seatingChart, { eventID: this.eventID, seatingChart: this.seatingChart });
  }
  

  goBack() {
    this.navCtrl.push('JavanikaPage');
  }
  openMenu() {
    this.navCtrl.push('MenuPage')
  }
}
