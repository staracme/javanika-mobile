webpackJsonp([11],{

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsPageModule", function() { return DetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__details__ = __webpack_require__(294);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DetailsPageModule = (function () {
    function DetailsPageModule() {
    }
    DetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__details__["a" /* DetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__details__["a" /* DetailsPage */]),
            ],
        })
    ], DetailsPageModule);
    return DetailsPageModule;
}());

//# sourceMappingURL=details.module.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_paypal__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_common_common__ = __webpack_require__(102);
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
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailsPage = (function () {
    function DetailsPage(navCtrl, navParams, http, common, payPal, device, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.common = common;
        this.payPal = payPal;
        this.device = device;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.name = null;
        this.email = null;
        this.mobile = null;
        this.isProceedToBook = false;
        this.eventID = 0;
        this.uuid = "";
        this.event = {};
        this.form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email]),
            mobile: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required])
        });
    }
    DetailsPage.prototype.ionViewDidLoad = function () {
        this.eventID = this.navParams.get('eventID');
        this.uuid = this.device.uuid;
        this.getOrderSummary({
            eventID: this.eventID,
            sessionID: this.uuid
        });
    };
    DetailsPage.prototype.ionViewCanLeave = function () {
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
                                content: 'Please Wait...'
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
    DetailsPage.prototype.getOrderSummary = function (data) {
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
    DetailsPage.prototype.openMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    DetailsPage.prototype.addDetails = function (form) {
        var _this = this;
        this.isProceedToBook = true;
        this.payPal.init({
            PayPalEnvironmentProduction: 'AYZg72OmfeJnm88ghZQv7x4opaln2jZ1k6uHnhIYOaMl_RUPLGbutIGi0Gsp8b8NogkMEQuVbj5NBgvX',
            PayPalEnvironmentSandbox: ''
        }).then(function () {
            _this.payPal.prepareToRender('PayPalEnvironmentProduction', new __WEBPACK_IMPORTED_MODULE_5__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                var payment = new __WEBPACK_IMPORTED_MODULE_5__ionic_native_paypal__["c" /* PayPalPayment */](_this.event['TotalPrice'], 'USD', _this.event["event_name"], 'sale');
                _this.payPal.renderSinglePaymentUI(payment).then(function (data) {
                    // Successfully paid
                    var response = {
                        id: data.response.id,
                        state: data.response.state,
                        intent: data.response.intent,
                        sessionID: _this.device.uuid,
                        eventID: _this.eventID,
                        amount: _this.event['TotalPrice'],
                        name: _this.name,
                        email: _this.email,
                        mobile: _this.mobile
                    };
                    _this.placeOrder(response);
                }, function (err) {
                    // Error or render dialog closed without being successful
                    alert(err);
                });
            }, function (err) {
                // Error in configuration
                alert(err);
            });
        }, function (err) {
            // Error in initialization, maybe PayPal isn't supported or something else
            alert(err);
        });
    };
    DetailsPage.prototype.placeOrder = function (data) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Loading...',
            enableBackdropDismiss: false
        });
        loading.present();
        this.http.post(this.common.apiURL + '/PlaceOrder', data).subscribe(function (data) {
            if (data.status == "OK") {
                loading.dismiss();
                alert("Order placed successfully.");
                _this.common.isProceedToBook = false;
                _this.navCtrl.push('TicketPage', { orderID: data.orderID });
            }
        });
    };
    DetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-details',template:/*ion-inline-start:"E:\RAZAWORKS\Git\projects\javanika\javanika-mobile\JavaProject\src\pages\details\details.html"*/'<ion-header>\n  <div class="HeaderWrap">\n    <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n    <div class="PointsBlock">\n      <span class="PointsHigh">Javanika</span> Entertainments\n    </div>\n    <div class="clr"></div>\n  </div>\n  <div class="clr"></div>\n</ion-header>\n\n\n<ion-content style="margin: 60px 0 0 0;">\n\n  <div class="HomeHeadLabel">Details</div>\n  <form [formGroup]="form">\n    <div class="usernameblock1">Name *\n      <input class="cptxtstyle" type="text"  formControlName="name" [(ngModel)]="name"/>\n      <div class="erroremail" *ngIf="form.get(\'name\').touched && form.get(\'name\').hasError(\'required\')" >\n        Please enter name\n      </div>\n    </div>\n\n    <div class="usernameblock1">Email ID *\n      <input class="cptxtstyle" type="text" formControlName="email" [(ngModel)]="email" />\n      <div class="erroremail" *ngIf="form.get(\'email\').touched && form.get(\'email\').hasError(\'required\')">\n        Please enter email\n      </div>\n      <div class="erroremail" *ngIf="form.get(\'email\').touched && form.get(\'email\').hasError(\'email\')">\n        Please check email id format\n      </div>\n    </div>\n\n    <div class="usernameblock1">Mobile Number *\n      <input class="cptxtstyle" type="text"  formControlName="mobile" [(ngModel)]="mobile" />\n      <div class="erroremail" *ngIf="form.get(\'mobile\').touched && form.get(\'mobile\').hasError(\'required\')">\n        Please enter mobile\n      </div>\n    </div>\n\n    <div class="buttonblockcp">\n      <button class="CPbutton" [disabled]="!form.valid" (click)="addDetails(form)">Proceed</button>\n    </div>\n  </form>\n</ion-content>'/*ion-inline-end:"E:\RAZAWORKS\Git\projects\javanika\javanika-mobile\JavaProject\src\pages\details\details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_6__providers_common_common__["a" /* CommonProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_paypal__["a" /* PayPal */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], DetailsPage);
    return DetailsPage;
}());

//# sourceMappingURL=details.js.map

/***/ })

});
//# sourceMappingURL=11.js.map