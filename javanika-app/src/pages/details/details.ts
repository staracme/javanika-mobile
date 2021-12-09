import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { CommonProvider } from '../../providers/common/common';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  form: FormGroup;
  name: string = null;
  email: string = null;
  mobile: string = null;
  isProceedToBook = false;
  eventID = 0;
  uuid = "";
  event = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private common: CommonProvider, private payPal: PayPal, private device: Device, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required])
    });
  }

  ionViewDidLoad() {
    this.eventID = this.navParams.get('eventID');
    this.uuid = this.device.uuid;

    this.getOrderSummary({
      eventID: this.eventID,
      sessionID: this.uuid
    });
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
              uuid: this.device.uuid,
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

  getOrderSummary(data) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...',
      enableBackdropDismiss: false
    });

    loading.present();

    this.http.post(this.common.apiURL + '/OrderSummary', data).subscribe((data: any) => {
      this.event = data;

      loading.dismiss();
    });
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

  addDetails(form) {

    this.isProceedToBook = true;
    
    this.payPal.init({
      PayPalEnvironmentProduction: 'AYZg72OmfeJnm88ghZQv7x4opaln2jZ1k6uHnhIYOaMl_RUPLGbutIGi0Gsp8b8NogkMEQuVbj5NBgvX',
      PayPalEnvironmentSandbox: ''
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({

      })).then(() => {
        let payment = new PayPalPayment(this.event['TotalPrice'], 'USD', this.event["event_name"], 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((data) => {

          // Successfully paid
          var response = {
            id: data.response.id,
            state: data.response.state,
            intent: data.response.intent,
            sessionID: this.device.uuid,
            eventID: this.eventID,
            amount: this.event['TotalPrice'],
            name: this.name,
            email: this.email,
            mobile: this.mobile
          };

          this.placeOrder(response);

        }, (err) => {
          // Error or render dialog closed without being successful
          alert(err);
        });
      }, (err) => {
        // Error in configuration
        alert(err);
      });
    }, (err) => {
      // Error in initialization, maybe PayPal isn't supported or something else
      alert(err);
    });
  }

  placeOrder(data) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...',
      enableBackdropDismiss: false
    });

    loading.present();

    this.http.post(this.common.apiURL + '/PlaceOrder', data).subscribe((data: any) => {
      if (data.status == "OK") {
        loading.dismiss();
        alert("Order placed successfully.");
        this.common.isProceedToBook = false;
        this.navCtrl.push('TicketPage', {orderID: data.orderID});
      }
    });
  }
}
