webpackJsonp([10],{

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsPageModule", function() { return EventsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(295);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EventsPageModule = (function () {
    function EventsPageModule() {
    }
    EventsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__events__["a" /* EventsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__events__["a" /* EventsPage */]),
            ],
        })
    ], EventsPageModule);
    return EventsPageModule;
}());

//# sourceMappingURL=events.module.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsPage; });
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
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EventsPage = (function () {
    function EventsPage(navCtrl, navParams, http, common, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.common = common;
        this.loadingCtrl = loadingCtrl;
        this.event = {};
        this.seatingChart = '';
        this.eventID = 0;
    }
    EventsPage.prototype.ionViewDidLoad = function () {
        this.eventID = this.navParams.get('eventID');
        this.getEventDetails(this.navParams.get('eventID'));
    };
    EventsPage.prototype.getEventDetails = function (eventID) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Loading...',
            enableBackdropDismiss: false
        });
        loading.present();
        this.http.post(this.common.apiURL + '/EventDetails', { eventID: eventID }).subscribe(function (data) {
            _this.event = data;
            _this.seatingChart = data.SeatingChart;
            _this.eventID = data.EventID;
            loading.dismiss();
        });
    };
    EventsPage.prototype.goToVenue = function () {
        this.navCtrl.push(this.seatingChart, { eventID: this.eventID });
    };
    EventsPage.prototype.openMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    EventsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-events',template:/*ion-inline-start:"E:\Java Project\In development\JavaProject\src\pages\events\events.html"*/'<ion-header>\n  <div class="HeaderWrap">\n    <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n    <div class="PointsBlock">\n      <span class="PointsHigh">Javanika</span> Entertainments\n    </div>\n    <div class="clr"></div>\n  </div>\n  <div class="clr"></div>\n</ion-header>\n\n\n\n<ion-content style="margin: 60px 0 0 0;">\n\n  \n\n  <div class="SliderWrap">\n    <div><img src="{{  event.Banner }}" width="100%" /></div>\n  </div>\n  <div class="EventHead">{{ event.EventName }}</div>\n\n  <div class="EventLabel1">\n    <span>{{ event.EventType }}</span> | <span>Age : {{ event.AgeGroup }}</span> | <span>{{ event.EventPlayTime  }}</span>\n  </div>\n\n  <div class="EventLabel2">\n      <span>{{  event.EventDate    }} at {{  event.ShowTime  }}</span> | <span>${{ event.Price }} Onwards</span>\n    </div>\n\n  <div>\n    <div class="EvtBlock">\n      <div class="Symbol"><img src="assets/VenueSymbol.png" width="20px"></div>\n      <div class="Locat">{{ event.VenueName  }}</div>\n      <div class="clr"></div>\n    </div>\n  </div>\n\n  <div class="EventDesc">\n\n    <div class="EveDecHead">Event Description</div>\n\n    <div [innerHTML]="event.Description"></div>\n  </div>\n\n  <div class="EventArtistWrap">\n    <div>Artists</div>\n    <div *ngFor="let a of event.Artists">\n        <div class="ArtistBlock"><img src="{{ a.Image }}"  /><div class="ArtName">{{ a.ArtistName }}</div></div>\n    </div>\n    <div class="clr"></div>\n  </div>\n<div>\n  <br> <br> <br> <br> <br><br>\n</div>\n</ion-content>\n\n<ion-footer *ngIf="event.isPastEvent == false">\n  <div class="EventFootWrap" (click)="goToVenue()">Book Tickets</div>\n</ion-footer>\n'/*ion-inline-end:"E:\Java Project\In development\JavaProject\src\pages\events\events.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], EventsPage);
    return EventsPage;
}());

//# sourceMappingURL=events.js.map

/***/ })

});
//# sourceMappingURL=10.js.map