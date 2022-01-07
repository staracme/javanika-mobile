import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import {DomSanitizer} from '@angular/platform-browser';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { ViewImagePage } from './../view-image/view-image';
import { ViewImageComponent } from '../../components/view-image/view-image';
declare var Masonry: any; //outer scope

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  events: any = [];
  viewImagePath: string = "";
  pastEventImages: any = [];
  layoutOptions: NgxMasonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: 200,
    gutter: 15
  }
  updateMasonryLayout: boolean = true;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private common: CommonProvider,
    public domSanitizer: DomSanitizer,
    private modal: ModalController
  ) {
    this.viewImagePath = this.common.viewImagePath;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad a GalleryPage');
    // this.getEvents();
    this.pastEventImages = this.navParams.get('pastEventImages');
    if (this.pastEventImages == null || this.pastEventImages == undefined) {
      this.navCtrl.pop();
    } else {
      console.log("ok");
    }
  }

  getImageUrl(ev) {
    return this.domSanitizer.bypassSecurityTrustUrl("http://localhost:2745/PastEventImages/"+ev.EventID+"/"+ev.ImagePath);
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
      // setTimeout(() => {
      //   loading.dismiss();
      // }, 1000);
    });
  }
showImage: boolean = false;
imgUrl: any = "";
  viewImage(ev) {
    // let modal = this.modal.create(ViewImageComponent, {src: "imageSourceUrl"});
    // modal.present();
    this.imgUrl = this.getImageUrl(ev);
    this.showImage = true;
  }

  showGallery() {
    this.imgUrl = "";
    this.showImage = false;
  }

  openMenu() {
    this.navCtrl.push('MenuPage')
  }

  doStuff(e) {
    console.log(e);
  }

}
