import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
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
  selectedSeatsNos: any[] = [];
  showSeatContainer: boolean = false;
  hide: boolean = false;
  seatingChart: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private device: Device,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private common: CommonProvider,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.eventID = this.navParams.get('eventID');
    this.seatingChart = this.navParams.get('seatingChart');
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
              uuid: "unique-device-id", //this.device.uuid
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

  selectSeat(event, seatID, seatNumber) {
    var seatId = seatID;
    var seatNumber = seatNumber;
    if (event.currentTarget.checked) {
      let postData = {

        "uuid": "unique-device-id", //this.device.uuid,
        "seatID": seatID,
        "eventID": this.eventID
      };

      this.http.post(this.common.apiURL + '/SelectSeat', postData).subscribe((data: any) => {
        if (data.status == "OK") {
          //setSeatNumbers(seatNumber);
          //var noOfSeats = data.NoOfSeats;
          this.seat_summary = data;
          this.selected_seats.push(seatID);
          this.selectedSeatsNos.push(seatNumber);
          this.presentToast(seatNumber + " selected.");
        }
        else {
          //toastr.error(seatNumber + " is already taken, Please select another seat.");
          // console.log(seatNumber + " is already taken, Please select another seat.")
          this.presentToast(seatNumber + " is already taken, Please select another seat.");
          event.target.disabled = true;
          //document.getElementById(seatNumber).attributes('disabled', true);
        }
      });
    }
    else {
      this.http.post(this.common.apiURL + '/RemoveSeat', {
        eventID: this.eventID,
        uuid: "unique-device-id", //this.device.uuid,
        seatID: seatID
      }).subscribe((data: any) => {
        this.seat_summary = data;
        let index = this.removeCheckedFromArray(seatID);
        this.selected_seats.splice(index, 1);
        let i = this.selectedSeatsNos.findIndex(x => x === seatNumber);
        this.selectedSeatsNos.splice(i, 1);
        this.presentToast(seatNumber + " removed.");
      });
    }
  }


  setSeatNumbers(seatNumber) {
    //selectedSeats.push(seatNumber);
    //$("#seatNumbers").append("<div id='" + seatNumber + "'>" + seatNumber + ",</div>");
    ///$("#noSeatSelected").removeClass("d-block").addClass("d-none");
    //toastr.success(seatNumber + " Selected.");
    //console.log("on selecting: ", selectedSeats);
  }

  setRemoveSeatNumbers(seatNumber) {
    // selectedSeats.splice(selectedSeats.findIndex((s) => s === seatNumber), 1);
    // $("#seatNumbers #" + seatNumber).remove();
    // toastr.error(seatNumber + " Removed.");
    // if (selectedSeats.length == 0) {
    //     $("#noSeatSelected").removeClass("d-none").addClass("d-block");
    // }
    // console.log("on removing: ", selectedSeats);
  }

  //Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: String) {
    return this.selected_seats.findIndex((category) => {
      return category === checkbox;
    })
  }

  proceedToPreConfirm(eventID) {
    if (this.selected_seats.length > 0) {
      this.isProceedToBook = true;
      this.navCtrl.push('PreConfirmPage', {
        eventID: eventID,
        selected_seats: this.selected_seats,
        selectedSeatsNos: this.selectedSeatsNos,
        seat_summary: this.seat_summary,
        seatingChart: this.seatingChart
      });
    }
    else {
      alert("Please select seats to proceed.");
    }
  }

  proceedToBooking(eventID) {
    if (this.selected_seats.length > 0) {
      this.isProceedToBook = true;
      this.navCtrl.push('BookingSummaryPage', { eventID: eventID, seatingChart: this.seatingChart });
    }
    else {
      alert("Please select seats to proceed.");
    }
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  toggleViewSeats() {
    this.showSeatContainer = !this.showSeatContainer;
  }
}
