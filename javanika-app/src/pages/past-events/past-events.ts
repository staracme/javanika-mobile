import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { GalleryPage } from '../gallery/gallery';
declare var Masonry: any; //outer scope

@IonicPage()
@Component({
  selector: 'page-past-events',
  templateUrl: 'past-events.html',
})
export class PastEventsPage {
  events: any = [];
  viewImagePath: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private common: CommonProvider
  ) {
    this.viewImagePath = this.common.viewImagePath;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PastEventsPage');
    this.getEvents();
  }

  msnry: any;
  setLayout() {
    setTimeout(() => {
      var elem = document.querySelector("#grid");
      this.msnry = new Masonry(elem, {
        // options
        itemSelector: ".grid-item",
        columnWidth: 100,
        gutterWidth: 15
      });
    }, 100);
  }

  refreshLayout() {
    this.msnry.layout();
  }

  getEvents() {
    this.http.get(this.common.apiURL + '/Gallery/getPastEvents').subscribe((data: any) => {
      // let resp = JSON.parse(data);
      if (data.length > 0) {
        this.events = data;
      }
      console.log(this.events);
      // setTimeout(() => {
      //   loading.dismiss();
      // }, 1000);
    });
  }

  viewGallery(eventID) {
    this.http.post(this.common.apiURL + '/Gallery/getPastEventImages', { eventID: eventID }).subscribe((data: any) => {

      console.log(data);
      if (data.length > 0) {
        this.navCtrl.push('GalleryPage', { pastEventImages: data });
      } else {
        console.log("No Images Available!");
      }
      // setTimeout(() => {
      //   loading.dismiss();
      // }, 1000);
    });
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

}
