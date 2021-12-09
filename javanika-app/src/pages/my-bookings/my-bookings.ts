import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CommonProvider } from '../../providers/common/common';
/**
 * Generated class for the MyBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bookings',
  templateUrl: 'my-bookings.html',
})


export class MyBookingsPage {
  email = "";
  mode = "email";
  otp: Object = {
    email: '',
    otp: ''
  };
  my_orders = [];
  otp_loading = false;
  otp_gen_loader = false;
  otp_process = 'pending';
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient ,private common: CommonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookingsPage');
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }


  generateOTP() {
    this.otp_loading = true;
    this.http.post(this.common.apiURL + '/OTP', this.otp).subscribe((data: any) => {
      if (data.status == "OK") {
        this.mode = 'otp';
        this.email = this.otp['email'];
        this.otp_loading = false;
      }
    });
  }

  getOrders() {
    this.otp_gen_loader = true;
    this.http.post(this.common.apiURL + '/MyOrders', this.otp).subscribe((data: any) => {
      if (data.status == "OK") {
        this.my_orders = data.my_orders;
        this.otp_gen_loader = false;
        this.otp_process = 'done';
      }
    });
  }

  getTicket(orderID) {
    this.navCtrl.push('TicketPage', { orderID: orderID })
  }
}
