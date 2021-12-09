import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { Device } from '@ionic-native/device';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { CommonProvider } from '../providers/common/common';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    AppVersion
  ]
})
export class AppModule {}
