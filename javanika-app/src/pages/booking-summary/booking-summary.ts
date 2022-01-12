import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Device } from '@ionic-native/device';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { CommonProvider } from '../../providers/common/common';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
/**
 * Generated class for the BookingSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-summary',
  templateUrl: 'booking-summary.html',
})
export class BookingSummaryPage {
  seat_summary = {};
  eventID = 0;
  uuid = '';
  event = {};
  isProceedToBook = false;
  form: FormGroup;
  coupon_code = "";
  coupon_loading = false;
  seatingChart: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private device: Device, private payPal: PayPal, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private common: CommonProvider) {
    this.form = new FormGroup({
      coupon_code: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {
    this.eventID = this.navParams.get('eventID');
    this.seatingChart = this.navParams.get('seatingChart');

    this.getOrderSummary({
      eventID: this.eventID,
      sessionID: this.device.uuid
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
              content: 'Please Wait...',
              enableBackdropDismiss: false
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

  goToAddDetailsPage() {
    this.isProceedToBook = true;
    this.common.isProceedToBook = true;
    this.navCtrl.push('DetailsPage', { eventID: this.eventID, orderSummaryData: this.event });
  }

  openMenu() {
    this.navCtrl.push('JavanikaPage')
  }

  addCoupon(data) {

    this.coupon_loading = true;

    if(this.coupon_code != '') {

        this.http.post(this.common.apiURL + '/AddDiscountCoupon', {
          sessionID: this.device.uuid,
          eventID: this.eventID,
          coupon_code: this.coupon_code
        }).subscribe((data: any) => {
          if (data.status == "OK") {
            this.getOrderSummary({
              sessionID: this.device.uuid,
              eventID: this.eventID
            });

            this.coupon_loading = false;
            this.coupon_code = "";
          }
          else if (data.status == "USED") {

            let alert = this.alertCtrl.create({
              title: '',
              message: "<center>" + data.errorMessage + "</center>",
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.coupon_loading = false;
                  }
                }
              ]
            });

            alert.present();
          }
          else if (data.status == "NOT APPLICABLE") {

            let alert = this.alertCtrl.create({
              title: '',
              message: "<center>" + data.errorMessage + "</center>",
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.coupon_loading = false;
                  }
                }
              ]
            });

            alert.present();
          }
          else if (data.status == "INVALID") {
            let alert = this.alertCtrl.create({
              title: '',
              message: "<center>" + data.errorMessage + "</center>",
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.coupon_loading = false;
                  }
                }
              ]
            });
            alert.present();
          }
        });
    }
    else {
      let alert = this.alertCtrl.create({
        title: '',
        message: "<center>Please enter coupon code</center>",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.coupon_loading = false;
            }
          }
        ]
      });
      alert.present();
    }
  }

  removeCoupon(couponID) {
    let conf_alert = this.alertCtrl.create({
      title: '',
      message: "<center>Do you want to remove this coupon?</center>",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            
            this.http.post(this.common.apiURL + '/RemoveDiscountCoupon', {
              sessionID: this.device.uuid,
              eventID: this.eventID,
              couponID: couponID
            }).subscribe((data: any) => {
              if (data.status == "OK") {
                let alert = this.alertCtrl.create({
                  title: '',
                  message: "<center>Coupon has been removed successfully.</center>",
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.getOrderSummary({
                          sessionID: this.device.uuid,
                          eventID: this.eventID
                        });
                      }
                    }
                  ]
                });
                alert.present();
              }
              else if (data.status == "ERROR") {
        
                let alert = this.alertCtrl.create({
                  title: '',
                  message: "<center>Sorry, Something went wrong. Please try again after sometime.</center>",
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                      }
                    }
                  ]
                });
                alert.present();
              }
            });
          }
        }
      ]
    });
    conf_alert.present();
  }
}
