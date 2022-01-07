import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CommonProvider } from '../../providers/common/common';
import { AppVersion } from '@ionic-native/app-version';
/**
 * Generated class for the JavanikaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-javanika',
  templateUrl: 'javanika.html',
})
export class JavanikaPage {
  past_events = [];
  current_events = [];
  currentVersion = "";
  latestVersion = "";
  app_status = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private common: CommonProvider, private loadingCtrl: LoadingController, private appVersion: AppVersion, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getHomePage();
  }


  getHomePage() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading...',
      enableBackdropDismiss: false
    });

    loading.present();

    this.http.get(this.common.apiURL + '/HomePage').subscribe((data: any) => {
      this.past_events = data.past_events;
      this.current_events = data.current_events;


      // this.appVersion.getVersionNumber().then((version) => {
      //   this.currentVersion = version;
      //   this.latestVersion = data.appVersion;

      //   if (this.currentVersion != this.latestVersion) {
      //     let alert = this.alertCtrl.create({
      //       title: 'Update App',
      //       message: 'Latest version of Javanika App is available. Kindly update same.',
      //       enableBackdropDismiss: false,
      //       buttons: [
      //         {
      //           text: 'Update',
      //           handler: () => {
      //             location.href = "market://details?id=com.javanika";
      //           }
      //         }
      //       ]
      //     });
      //     alert.present();
      //   }
      // });

      loading.dismiss();
    });
  }

  goToVenue(eventID) {
    this.navCtrl.push('V5venuePage', { eventID: eventID });
  }

  goToEvents(eventID) {
    this.navCtrl.push('EventsPage', { eventID: eventID });
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

  viewMore(type) {
    this.navCtrl.push('EventspagePage', { viewMore: type });
  }

}
