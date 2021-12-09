import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  public apiURL = 'http://api.javanika.com/api';
  public uuid = '';
  public isProceedToBook = false;
  constructor(public http: HttpClient, private device: Device) {
    this.uuid = this.device.uuid; 
  }

}
