import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from '@ionic-native/device';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the PreConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-confirm',
  templateUrl: 'pre-confirm.html',
})
export class PreConfirmPage {
  eventID = 0;
  selected_seats: any;
  selectedSeatsNos: any;
  seat_summary: any;

  isProceedToBook = false;

  form: FormGroup;
  coupon_code = "";
  coupon_loading = false;
  isCouponApplied: boolean = false;

  seatingChart: string = "";

  couponData: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private device: Device,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private common: CommonProvider
  ) {
    this.form = new FormGroup({
      coupon_code: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {
    this.eventID = this.navParams.get('eventID');
    this.selected_seats = this.navParams.get('selected_seats');
    this.selectedSeatsNos = this.navParams.get('selectedSeatsNos');
    this.seat_summary = this.navParams.get('seat_summary');
    this.seatingChart = this.navParams.get('seatingChart');
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

  addCoupon(data) {

    this.coupon_loading = true;

    if (this.coupon_code != '') {

      this.http.post(this.common.apiURL + '/AddDiscountCoupon', {
        sessionID: this.device.uuid,
        eventID: this.eventID,
        coupon_code: this.coupon_code
      }).subscribe((data: any) => {
        if (data.status == "OK") {
          // this.getOrderSummary({
          //   sessionID: this.device.uuid,
          //   eventID: this.eventID
          // });
          this.couponData = data;
          this.isCouponApplied = true;
          this.coupon_loading = false;
          this.coupon_code = "";
          this.form.reset();
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
              couponID: this.couponData.CouponID
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
                        // this.getOrderSummary({
                        //   sessionID: this.device.uuid,
                        //   eventID: this.eventID
                        // });
                        this.isCouponApplied = false;
                        this.couponData = null;
                        this.coupon_loading = false;
                        this.coupon_code = "";
                        this.form.reset();
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

  proceedToBooking(eventID) {
    if (this.selected_seats.length > 0) {
      this.isProceedToBook = true;
      this.navCtrl.push('BookingSummaryPage', {
        eventID: eventID,
        seatingChart: this.seatingChart
      });
    }
    else {
      alert("Please select seats to proceed.");
      this.navCtrl.push(this.seatingChart, { eventID: this.eventID, seatingChart: this.seatingChart });
    }
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

}
