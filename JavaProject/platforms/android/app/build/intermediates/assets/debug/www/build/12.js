webpackJsonp([12],{

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingSummaryPageModule", function() { return BookingSummaryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking_summary__ = __webpack_require__(293);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BookingSummaryPageModule = (function () {
    function BookingSummaryPageModule() {
    }
    BookingSummaryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__booking_summary__["a" /* BookingSummaryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__booking_summary__["a" /* BookingSummaryPage */]),
            ],
        })
    ], BookingSummaryPageModule);
    return BookingSummaryPageModule;
}());

//# sourceMappingURL=booking-summary.module.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingSummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_common_common__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the BookingSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookingSummaryPage = (function () {
    function BookingSummaryPage(navCtrl, navParams, http, device, payPal, alertCtrl, loadingCtrl, common) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.device = device;
        this.payPal = payPal;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.common = common;
        this.seat_summary = {};
        this.eventID = 0;
        this.uuid = '';
        this.event = {};
        this.isProceedToBook = false;
        this.coupon_code = "";
        this.coupon_loading = false;
        this.form = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormGroup */]({
            coupon_code: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required]),
        });
    }
    BookingSummaryPage.prototype.ionViewDidLoad = function () {
        this.eventID = this.navParams.get('eventID');
        this.getOrderSummary({
            eventID: this.eventID,
            sessionID: this.device.uuid
        });
    };
    BookingSummaryPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.isProceedToBook)
                return resolve(true);
            _this.alertCtrl.create({
                title: 'Confirm leaving',
                message: 'Do you want to exit this page?',
                enableBackdropDismiss: false,
                buttons: [{
                        text: 'Leave',
                        handler: function () {
                            //delete pending quiz data
                            var loading = _this.loadingCtrl.create({
                                spinner: 'crescent',
                                content: 'Please Wait...',
                                enableBackdropDismiss: false
                            });
                            loading.present();
                            _this.http.post(_this.common.apiURL + '/RemoveUnbookedSeats', {
                                eventID: _this.eventID,
                                uuid: _this.device.uuid,
                            }).subscribe(function (response) {
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
                        handler: function () {
                            resolve(false);
                        }
                    }]
            }).present();
        });
    };
    BookingSummaryPage.prototype.getOrderSummary = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Loading...',
            enableBackdropDismiss: false
        });
        loading.present();
        this.http.post(this.common.apiURL + '/OrderSummary', data).subscribe(function (data) {
            _this.event = data;
            loading.dismiss();
        });
    };
    BookingSummaryPage.prototype.goToAddDetailsPage = function () {
        this.isProceedToBook = true;
        this.common.isProceedToBook = true;
        this.navCtrl.push('DetailsPage', { eventID: this.eventID });
    };
    BookingSummaryPage.prototype.openMenu = function () {
        this.navCtrl.push('JavanikaPage');
    };
    BookingSummaryPage.prototype.addCoupon = function (data) {
        var _this = this;
        this.coupon_loading = true;
        if (this.coupon_code != '') {
            this.http.post(this.common.apiURL + '/AddDiscountCoupon', {
                sessionID: this.device.uuid,
                eventID: this.eventID,
                coupon_code: this.coupon_code
            }).subscribe(function (data) {
                if (data.status == "OK") {
                    _this.getOrderSummary({
                        sessionID: "test-2132134",
                        eventID: _this.eventID
                    });
                    _this.coupon_loading = false;
                    _this.coupon_code = "";
                }
                else if (data.status == "USED") {
                    var alert_1 = _this.alertCtrl.create({
                        title: '',
                        message: "<center>" + data.errorMessage + "</center>",
                        enableBackdropDismiss: false,
                        buttons: [
                            {
                                text: 'OK',
                                handler: function () {
                                    _this.coupon_loading = false;
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
                else if (data.status == "NOT APPLICABLE") {
                    var alert_2 = _this.alertCtrl.create({
                        title: '',
                        message: "<center>" + data.errorMessage + "</center>",
                        enableBackdropDismiss: false,
                        buttons: [
                            {
                                text: 'OK',
                                handler: function () {
                                    _this.coupon_loading = false;
                                }
                            }
                        ]
                    });
                    alert_2.present();
                }
                else if (data.status == "INVALID") {
                    var alert_3 = _this.alertCtrl.create({
                        title: '',
                        message: "<center>" + data.errorMessage + "</center>",
                        enableBackdropDismiss: false,
                        buttons: [
                            {
                                text: 'OK',
                                handler: function () {
                                    _this.coupon_loading = false;
                                }
                            }
                        ]
                    });
                    alert_3.present();
                }
            });
        }
        else {
            var alert_4 = this.alertCtrl.create({
                title: '',
                message: "<center>Please enter coupon code</center>",
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'OK',
                        handler: function () {
                            _this.coupon_loading = false;
                        }
                    }
                ]
            });
            alert_4.present();
        }
    };
    BookingSummaryPage.prototype.removeCoupon = function (couponID) {
        var _this = this;
        var conf_alert = this.alertCtrl.create({
            title: '',
            message: "<center>Do you want to remove this coupon?</center>",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        _this.http.post(_this.common.apiURL + '/RemoveDiscountCoupon', {
                            sessionID: _this.device.uuid,
                            eventID: _this.eventID,
                            couponID: couponID
                        }).subscribe(function (data) {
                            if (data.status == "OK") {
                                var alert_5 = _this.alertCtrl.create({
                                    title: '',
                                    message: "<center>Coupon has been removed successfully.</center>",
                                    enableBackdropDismiss: false,
                                    buttons: [
                                        {
                                            text: 'OK',
                                            handler: function () {
                                                _this.getOrderSummary({
                                                    sessionID: _this.device.uuid,
                                                    eventID: _this.eventID
                                                });
                                            }
                                        }
                                    ]
                                });
                                alert_5.present();
                            }
                            else if (data.status == "ERROR") {
                                var alert_6 = _this.alertCtrl.create({
                                    title: '',
                                    message: "<center>Sorry, Something went wrong. Please try again after sometime.</center>",
                                    enableBackdropDismiss: false,
                                    buttons: [
                                        {
                                            text: 'OK',
                                            handler: function () {
                                            }
                                        }
                                    ]
                                });
                                alert_6.present();
                            }
                        });
                    }
                }
            ]
        });
        conf_alert.present();
    };
    BookingSummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-booking-summary',template:/*ion-inline-start:"E:\Java Project\In development\JavaProject\src\pages\booking-summary\booking-summary.html"*/'<ion-header>\n  <div class="HeaderWrap">\n    <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n    <div class="PointsBlock">\n      <span class="PointsHigh">Javanika</span> Entertainments\n    </div>\n    <div class="clr"></div>\n  </div>\n  <div class="clr"></div>\n</ion-header>\n\n\n<ion-content style="margin: 60px 0 0 0;">\n  <div class="BookingHead">Order Summary</div>\n\n  <div class="ODBlock">\n    <div class="OBEventName">{{event.event_name}}</div>\n    <div class="OBEVentVenue">{{ event.event_details }}</div>\n    <div class="OBEVentDate">{{  event.event_date  }} | {{  event.event_time  }}</div>\n    <div class="OBEVentTickets">Number of Tickets: <span class="OBEventsTic">{{ event.NoOfSeats  }}</span></div>\n\n    <div class="OBSpace"></div>\n\n    <div class="OBAmt">\n      <div class="OBLeft">Sub-total</div>\n      <div class="OBright">$ {{ event.SubTotal }}</div>\n      <div class="clr"></div>\n    </div>\n\n    \n  \n    <div class="OBAmt" *ngIf="(event.coupon_code != null && event.coupon_code != \'\')">\n      <div class="OBLeft">Discount ({{ event.coupon_code }}) <a href="JavaScript:;" (click)="removeCoupon(event.couponID)"><b>X</b></a></div>\n      <div class="OBright">$ {{ event.Discount }}</div>\n      <div class="clr"></div>\n    </div>\n\n    <div class="OBAmt" *ngIf="(event.is_processing_fee != null && event.is_processing_fee == true)">\n      <div class="OBLeft">Service Fees</div>\n      <div class="OBright">$ {{ event.processing_fee }}</div>\n      <div class="clr"></div>\n    </div>\n\n\n    <div class="OBAmt">\n      <div class="OBLeft1">Final Total</div>\n      <div class="OBright1">$ {{  event.TotalPrice }}</div>\n      <div class="clr"></div>\n    </div>\n\n  </div>\n\n  <form [formGroup]="form" *ngIf="(event.coupon_code == null || event.coupon_code == \'\')">\n    <div class="ODBlock">\n      <div class="ODLabel">Do you have discount coupon? Please enter your coupon code below....</div>\n      <div>\n        <input type="text" placeholder="Add Discount Code here" class="OBDictxt" formControlName="coupon_code" [(ngModel)]="coupon_code">\n        <div class="erroremail" *ngIf="form.get(\'coupon_code\').touched && form.get(\'coupon_code\').hasError(\'required\')">\n          Please enter coupon code\n        </div>\n      </div>\n      <div><button (click)="addCoupon()" *ngIf="coupon_loading == false">Add Coupon</button><span *ngIf="coupon_loading == true">Please wait....</span></div>\n    </div>\n  </form>\n</ion-content>\n<ion-footer>\n  <div class="EventFootWrapOD" (click)="goToAddDetailsPage(eventID)">Book Tickets</div>\n</ion-footer>'/*ion-inline-end:"E:\Java Project\In development\JavaProject\src\pages\booking-summary\booking-summary.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__["a" /* PayPal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_common_common__["a" /* CommonProvider */]])
    ], BookingSummaryPage);
    return BookingSummaryPage;
}());

//# sourceMappingURL=booking-summary.js.map

/***/ })

});
//# sourceMappingURL=12.js.map