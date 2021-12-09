import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CommonProvider } from '../../providers/common/common';
/**
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {
  ticket:object = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private loadingCtrl: LoadingController, private common: CommonProvider) {
  }

  ionViewDidLoad() {
    this.getTicket(this.navParams.get('orderID'));
  }

  getTicket(orderID) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...',
      enableBackdropDismiss: false
    });

    loading.present();

    this.http.post(this.common.apiURL + '/Ticket',{
        orderID : orderID
    }).subscribe((data: any) => {
      this.ticket = data;
      loading.dismiss();
    });
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }
}
