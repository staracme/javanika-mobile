import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CommonProvider } from '../../providers/common/common';
/**
 * Generated class for the EventspagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventspage',
  templateUrl: 'eventspage.html',
})
export class EventspagePage {
  past_events = [];
  upcoming_events = [];
  isComingFromMenu = true;
  viewMore = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private common: CommonProvider, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.viewMore = (this.navParams.get('viewMore') != undefined ? this.navParams.get('viewMore') : '');

    //This means coming from homepage view more button
    if (this.viewMore != '') {

      this.isComingFromMenu = false;
    }

    this.getEvents();
  }

  getEvents() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...',
      enableBackdropDismiss: false
    });

    loading.present();

    this.http.get(this.common.apiURL + '/Events').subscribe((data: any) => {
      this.upcoming_events = data.upcoming_events;
      this.past_events = data.past_events;

      loading.dismiss();
    });
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

  goToEvents(eventID) {
    this.navCtrl.push('EventsPage', { eventID: eventID });
  }

}
