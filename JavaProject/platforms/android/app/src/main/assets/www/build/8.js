webpackJsonp([8],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JavanikaPageModule", function() { return JavanikaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__javanika__ = __webpack_require__(297);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var JavanikaPageModule = (function () {
    function JavanikaPageModule() {
    }
    JavanikaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__javanika__["a" /* JavanikaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__javanika__["a" /* JavanikaPage */]),
            ],
        })
    ], JavanikaPageModule);
    return JavanikaPageModule;
}());

//# sourceMappingURL=javanika.module.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JavanikaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_version__ = __webpack_require__(201);
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
 * Generated class for the JavanikaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var JavanikaPage = (function () {
    function JavanikaPage(navCtrl, navParams, http, common, loadingCtrl, appVersion, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.common = common;
        this.loadingCtrl = loadingCtrl;
        this.appVersion = appVersion;
        this.alertCtrl = alertCtrl;
        this.past_events = [];
        this.current_events = [];
        this.currentVersion = "";
        this.latestVersion = "";
        this.app_status = "";
    }
    JavanikaPage.prototype.ionViewDidLoad = function () {
        this.getHomePage();
    };
    JavanikaPage.prototype.getHomePage = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Loading...',
            enableBackdropDismiss: false
        });
        loading.present();
        this.http.get(this.common.apiURL + '/HomePage').subscribe(function (data) {
            _this.past_events = data.past_events;
            _this.current_events = data.current_events;
            _this.appVersion.getVersionNumber().then(function (version) {
                _this.currentVersion = version;
                _this.latestVersion = data.appVersion;
                if (_this.currentVersion != _this.latestVersion) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Update App',
                        message: 'Latest version of Javanika App is available. Kindly update same.',
                        enableBackdropDismiss: false,
                        buttons: [
                            {
                                text: 'Update',
                                handler: function () {
                                    location.href = "market://details?id=com.javanika";
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
            });
            loading.dismiss();
        });
    };
    JavanikaPage.prototype.goToVenue = function (eventID) {
        this.navCtrl.push('V5venuePage', { eventID: eventID });
    };
    JavanikaPage.prototype.goToEvents = function (eventID) {
        this.navCtrl.push('EventsPage', { eventID: eventID });
    };
    JavanikaPage.prototype.openMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    JavanikaPage.prototype.viewMore = function (type) {
        this.navCtrl.push('EventspagePage', { viewMore: type });
    };
    JavanikaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-javanika',template:/*ion-inline-start:"E:\Java Project\In development\JavaProject\src\pages\javanika\javanika.html"*/'<ion-header>\n  <div class="HeaderWrap">\n    <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n    <div class="PointsBlock">\n      <span class="PointsHigh">Javanika</span> Entertainments\n    </div>\n    <div class="clr"></div>\n  </div>\n  <div class="clr"></div>\n</ion-header>\n\n\n\n<ion-content style="margin: 60px 0 0 0;">\n\n  <div class="HomeHead">Welcome to Javanika Entertainments</div>\n\n  <div class="SliderWrap">\n    <ion-slides pager="true" autoplay="2000" loop="true" speed="600" *ngIf="current_events.length > 0">\n      <ion-slide  *ngFor="let b of current_events">\n        <img [src]=b.SliderImage />\n      </ion-slide>\n    </ion-slides>\n  </div>\n\n  <div class="EventsBlock">\n\n    <div>\n      <div class="EventsHomeHead">Upcoming Events</div>\n      <div class="EventMoreBtnWrap"><button class="EventMoreBtn" (click)="viewMore(\'upcoming\')">View More</button></div>\n      <div class="clr"></div>\n    </div>\n    <div class="EventsSlider">\n      <div class="EventsThumbWrap" *ngFor="let e of current_events">\n        <a class="EventBlocka" href="JavaScript:;" (click)="goToEvents(e.EventID)">\n          <img src="{{ e.image  }}" width="100%" />\n          <div class="EventDetHome">\n            <div class="EventNameHome">{{ e.EventName}}</div>\n            <div class="EventDateHome">Dated: {{ e.EventDate }}</div>\n          </div>\n        </a>\n      </div>\n      <div class="clr"></div>\n    </div>\n  </div>\n\n  <div class="Space"></div>\n\n  <div class="EventsBlock">\n\n    <div>\n      <div class="EventsHomeHead">Past Events</div>\n      <div class="EventMoreBtnWrap"><button class="EventMoreBtn" (click)="viewMore(\'past\')">View More</button></div>\n      <div class="clr"></div>\n    </div>\n\n    <div class="EventsSlider">\n      <div class="EventsThumbWrap" *ngFor="let e of past_events">\n        <a class="EventBlocka" href="JavaScript:;" (click)="goToEvents(e.EventID)">\n          <img src="{{ e.image  }}" width="100%" />\n          <div class="EventDetHome">\n            <div class="EventNameHome">{{ e.EventName }}</div>\n            <div class="EventDateHome">Dated: {{ e.EventDate }}</div>\n          </div>\n        </a>\n      </div>\n      <div class="clr"></div>\n    </div>\n  </div>\n\n  <div class="MainFooterWrap">\n    Copyright at Javanika Entertainment<br>\n\n  </div>\n</ion-content>'/*ion-inline-end:"E:\Java Project\In development\JavaProject\src\pages\javanika\javanika.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_version__["a" /* AppVersion */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], JavanikaPage);
    return JavanikaPage;
}());

//# sourceMappingURL=javanika.js.map

/***/ })

});
//# sourceMappingURL=8.js.map