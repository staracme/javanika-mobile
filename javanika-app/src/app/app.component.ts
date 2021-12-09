import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { HttpClient } from '@angular/common/http';
import { CommonProvider } from '../providers/common/common';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'JavanikaPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private device: Device, private http: HttpClient, private common: CommonProvider) {
    this.http.post(this.common.apiURL + '/IsMaintainence', {
      uuid: this.device.uuid,
    }).subscribe((response: any) => {
      if (response == true) {
        this.rootPage = 'MaintainencePage'
      }
      else {
        this.rootPage = 'JavanikaPage';
      }
    });

    platform.ready().then(() => {
      
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    platform.pause.subscribe(e => {
      if (this.common.isProceedToBook == false) {
        this.http.post(this.common.apiURL + '/AppClosed', {
          uuid: this.device.uuid,
        }).subscribe((response: any) => {
          if (response.status == "OK") {
          }
          else {
          }
        });
      }
    });



  }
}

