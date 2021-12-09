import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the V1venuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-v1venue',
  templateUrl: 'v1venue.html',
})
export class V1venuePage {
  block1 = {};
  block2 = {};
  eventID = 0;
  seat_summary = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient, private device: Device) {
  }

 
  ionViewDidLoad() {
    this.eventID = this.navParams.get('eventID');
    this.getSeats(this.eventID);
  }

  getSeats(eventID){
    this.http.post('http://javaapi.premiasolution.com/api/v1Venue', { eventID: eventID }).subscribe((data: any) => {
      this.block1 = data.block1;
      this.block2 = data.block2;
    });
  }



  selectSeat(event, seatID) {
    if (event.currentTarget.checked) {
      this.addSeat(seatID);
    }
    else {
      this.removeSeat(seatID);
    }
  }

  addSeat(seatID) {
    this.http.post('http://javaapi.premiasolution.com/api/SelectSeat', { eventID: this.eventID, uuid: this.device.uuid, seatID: seatID }).subscribe((data: any) => {
      this.seat_summary = data;
    });
  }

  removeSeat(seatID) {
    this.http.post('http://javaapi.premiasolution.com/api/RemoveSeat', { eventID: this.eventID, uuid: this.device.uuid, seatID: seatID }).subscribe((data: any) => {
      this.seat_summary = data;
    });
  }

  proceedToBooking(eventID) {
      this.navCtrl.push('BookingSummaryPage', {eventID: eventID})
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

}
