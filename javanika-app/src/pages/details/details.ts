import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
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
  event: any = {};
  orderSummaryData: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private common: CommonProvider, private payPal: PayPal, private device: Device, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required])
    });
  }

  ionViewDidLoad() {
    this.eventID = this.navParams.get('eventID');
    this.uuid = "unique-devide-id"; //this.device.uuid;

    this.orderSummaryData = this.navParams.get('orderSummaryData');
    this.event = this.orderSummaryData;
    console.log("orderSummaryData from bookingSummaryPage: ", this.orderSummaryData);
    // this.getOrderSummary({
    //   eventID: this.eventID,
    //   sessionID: this.uuid
    // });
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
      console.log("data after api call: ", data);
      loading.dismiss();
    });
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

  overridePP() {
    // Successfully paid
    var response = {
      id: 7777,
      state: '',
      intent: '',
      sessionID: "unique-device-id", //this.device.uuid,
      eventID: this.eventID,
      amount: this.event['TotalPrice'],
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      ticketType: this.event.isEarlyBird,
      actualPrice: this.event.ActualPrice,
      discountedAmount: this.event.discountedAmount,
      priceAfterDiscount: this.event.price,
      processingFee: this.event.processing_fee
    };

    this.placeOrder(response);
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
            mobile: this.mobile,
            ticketType: this.event.isEarlyBird,
            actualPrice: this.event.ActualPrice,
            discountedAmount: this.event.discountedAmount,
            priceAfterDiscount: this.event.price,
            processingFee: this.event.processing_fee
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
        this.presentToast("Order placed successfully.");
        this.common.isProceedToBook = false;
        this.navCtrl.push('TicketPage', { orderID: data.orderID });
      } else if (data.status == "FAILED") {
        this.presentToast("failed.");
      } else if (data.status == "FATAL") {
        this.presentToast("Something went wrong.");
      }
      loading.dismiss();
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}
