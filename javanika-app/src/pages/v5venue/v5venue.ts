import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device';
import { CommonProvider } from '../../providers/common/common';
/**
 * Generated class for the V5venuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-v5venue',
  templateUrl: 'v5venue.html',
})
export class V5venuePage {
  block1 = {};
  eventID = 0;
  seat_summary = {};
  isProceedToBook = false;
  selected_seats = [];
  event_name = "";
  event_date = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private device: Device, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private common: CommonProvider) {
  }

  ionViewDidLoad() {
    this.eventID = this.navParams.get('eventID');
    this.getSeats(this.eventID);
  }


  ionViewWillLeave() {
    this.block1 = null;
    this.eventID = 0;
    this.seat_summary = null;
  }

  ionViewCanLeave(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.isProceedToBook) return resolve(true);

      this.alertCtrl.create({
        title: 'Confirm leaving',
        message: 'Do you want to exit this page?',
        enableBackdropDismiss: false,
        buttons: [{
          text: 'Leave',
          handler: () => {

            //delete pending quiz data
            let loading = this.loadingCtrl.create({
              spinner: 'crescent',
              content: 'Please Wait...'
            });

            loading.present();

            this.http.post(this.common.apiURL + '/RemoveUnbookedSeats', {
              eventID: this.eventID,
              uuid: this.device.uuid
            }).subscribe((response: any) => {
              if (response.status == "OK") {
                loading.dismiss();
                resolve(true);
              }
              else {
                loading.dismiss();
                resolve(false);
              }
            });
          }
        }, {
          text: 'Stay',
          handler: () => {
            resolve(false);
          }
        }]
      }).present();
    });
  }

  getSeats(eventID) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...',
      enableBackdropDismiss: false
    });

    loading.present();

    this.http.post(this.common.apiURL + '/v5Venue', { eventID: eventID }).subscribe((data: any) => {
      this.event_name = data.event_name;
      this.event_date = data.event_date;
      this.block1 = data.block1;

      loading.dismiss();
    });
  }

  selectSeat(event, seatID) {
    if (event.currentTarget.checked) {
      let postData = {

        "uuid": this.device.uuid,
        "seatID": seatID,
        "eventID": this.eventID
      };

      this.http.post(this.common.apiURL + '/SelectSeat', postData).subscribe((data: any) => {
        this.seat_summary = data;
        this.selected_seats.push(seatID);
      });
    }
    else {
      this.http.post(this.common.apiURL + '/RemoveSeat', { eventID: this.eventID, uuid: this.device.uuid, seatID: seatID }).subscribe((data: any) => {
        this.seat_summary = data;
        let index = this.removeCheckedFromArray(seatID);
        this.selected_seats.splice(index, 1);
      });
    }
  }

  //Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: String) {
    return this.selected_seats.findIndex((category) => {
      return category === checkbox;
    })
  }

  proceedToBooking(eventID) {
    if (this.selected_seats.length > 0) {
      this.isProceedToBook = true;
      this.navCtrl.push('BookingSummaryPage', { eventID: eventID });
    }
    else {
      alert("Please select seats to proceed.");
    }
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }
}
