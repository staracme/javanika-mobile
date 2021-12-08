webpackJsonp([9],{

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventspagePageModule", function() { return EventspagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eventspage__ = __webpack_require__(296);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventspagePageModule = (function () {
    function EventspagePageModule() {
    }
    EventspagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__eventspage__["a" /* EventspagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__eventspage__["a" /* EventspagePage */]),
            ],
        })
    ], EventspagePageModule);
    return EventspagePageModule;
}());

//# sourceMappingURL=eventspage.module.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventspagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(102);
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
 * Generated class for the EventspagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventspagePage = (function () {
    function EventspagePage(navCtrl, navParams, http, common, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.common = common;
        this.loadingCtrl = loadingCtrl;
        this.past_events = [];
        this.upcoming_events = [];
        this.isComingFromMenu = true;
        this.viewMore = '';
    }
    EventspagePage.prototype.ionViewDidLoad = function () {
        this.viewMore = (this.navParams.get('viewMore') != undefined ? this.navParams.get('viewMore') : '');
        //This means coming from homepage view more button
        if (this.viewMore != '') {
            this.isComingFromMenu = false;
        }
        this.getEvents();
    };
    EventspagePage.prototype.getEvents = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Loading...',
            enableBackdropDismiss: false
        });
        loading.present();
        this.http.get(this.common.apiURL + '/Events').subscribe(function (data) {
            _this.upcoming_events = data.upcoming_events;
            _this.past_events = data.past_events;
            loading.dismiss();
        });
    };
    EventspagePage.prototype.openMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    EventspagePage.prototype.goToEvents = function (eventID) {
        this.navCtrl.push('EventsPage', { eventID: eventID });
    };
    EventspagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-eventspage',template:/*ion-inline-start:"E:\Java Project\In development\JavaProject\src\pages\eventspage\eventspage.html"*/'<ion-header>\n  <div class="HeaderWrap">\n    <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n    <div class="PointsBlock">\n      <span class="PointsHigh">Javanika</span> Entertainments\n    </div>\n    <div class="clr"></div>\n  </div>\n  <div class="clr"></div>\n</ion-header>\n\n\n<ion-content style="margin: 60px 0 0 0;">\n  <div class="EventsBlock" *ngIf="isComingFromMenu || viewMore == \'upcoming\'">\n\n    <div>\n      <div class="EventsHomeHead">Upcoming Events</div>\n     \n      <div class="clr"></div>\n    </div>\n    <div class="EventsSlider">\n      <div class="EventsThumbWrap" *ngFor="let e of upcoming_events">\n        <a class="EventBlocka" href="JavaScript:;" (click)="goToEvents(e.EventID)">\n          <img src="{{ e.image  }}" width="100%" />\n          <div class="EventDetHome">\n            <div class="EventNameHome">{{ e.EventName}}</div>\n            <div class="EventDateHome">Dated: {{ e.EventDate }}</div>\n          </div>\n        </a>\n      </div>\n      <div class="clr"></div>\n    </div>\n  </div>\n\n  <div class="EventsBlock" *ngIf="isComingFromMenu || viewMore == \'past\'">\n\n    <div>\n      <div class="EventsHomeHead">Past Events</div>\n     \n      <div class="clr"></div>\n    </div>\n    <div class="EventsSlider">\n      <div class="EventsThumbWrap" *ngFor="let e of past_events">\n        <a class="EventBlocka" href="JavaScript:;" (click)="goToEvents(e.EventID)">\n          <img src="{{ e.image  }}" width="100%" />\n          <div class="EventDetHome">\n            <div class="EventNameHome">{{ e.EventName}}</div>\n            <div class="EventDateHome">Dated: {{ e.EventDate }}</div>\n          </div>\n        </a>\n      </div>\n      <div class="clr"></div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\Java Project\In development\JavaProject\src\pages\eventspage\eventspage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], EventspagePage);
    return EventspagePage;
}());

//# sourceMappingURL=eventspage.js.map

/***/ })

});
//# sourceMappingURL=9.js.map