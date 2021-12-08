webpackJsonp([3],{

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V1venuePageModule", function() { return V1venuePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__v1venue__ = __webpack_require__(302);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var V1venuePageModule = (function () {
    function V1venuePageModule() {
    }
    V1venuePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__v1venue__["a" /* V1venuePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__v1venue__["a" /* V1venuePage */]),
            ],
        })
    ], V1venuePageModule);
    return V1venuePageModule;
}());

//# sourceMappingURL=v1venue.module.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return V1venuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(51);
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
 * Generated class for the V1venuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var V1venuePage = (function () {
    function V1venuePage(navCtrl, navParams, http, device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.device = device;
        this.block1 = {};
        this.block2 = {};
        this.eventID = 0;
        this.seat_summary = {};
    }
    V1venuePage.prototype.ionViewDidLoad = function () {
        this.eventID = this.navParams.get('eventID');
        this.getSeats(this.eventID);
    };
    V1venuePage.prototype.getSeats = function (eventID) {
        var _this = this;
        this.http.post('http://javaapi.premiasolution.com/api/v1Venue', { eventID: eventID }).subscribe(function (data) {
            _this.block1 = data.block1;
            _this.block2 = data.block2;
        });
    };
    V1venuePage.prototype.selectSeat = function (event, seatID) {
        if (event.currentTarget.checked) {
            this.addSeat(seatID);
        }
        else {
            this.removeSeat(seatID);
        }
    };
    V1venuePage.prototype.addSeat = function (seatID) {
        var _this = this;
        this.http.post('http://javaapi.premiasolution.com/api/SelectSeat', { eventID: this.eventID, uuid: this.device.uuid, seatID: seatID }).subscribe(function (data) {
            _this.seat_summary = data;
        });
    };
    V1venuePage.prototype.removeSeat = function (seatID) {
        var _this = this;
        this.http.post('http://javaapi.premiasolution.com/api/RemoveSeat', { eventID: this.eventID, uuid: this.device.uuid, seatID: seatID }).subscribe(function (data) {
            _this.seat_summary = data;
        });
    };
    V1venuePage.prototype.proceedToBooking = function (eventID) {
        this.navCtrl.push('BookingSummaryPage', { eventID: eventID });
    };
    V1venuePage.prototype.openMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    V1venuePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-v1venue',template:/*ion-inline-start:"E:\Java Project\In development\JavaProject\src\pages\v1venue\v1venue.html"*/'<!--\n  Generated template for the V1venuePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>v1venue</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div style="overflow:scroll;height:auto;">\n    <ol id="V1L1B1" class="cabin fuselage" *ngIf="block1 != null">\n      <li class="row" *ngFor="let r of block1.SeatRows">\n        <ol class="seats" type="{{r.RowNumber}}">\n          <li class="seat" *ngFor="let s of r.Seats">\n            <input type="checkbox" id="{{s.SeatNumber}}" class="chkSeats" value="s.SeatID" (change)="selectSeat($event,s.SeatID)" *ngIf="s.Status == \'PRESENT\'" />\n            <label for="{{s.SeatNumber}}" *ngIf="s.Status == \'PRESENT\'">{{ s.SeatNumber  }}</label>\n            <div class="tooltip" *ngIf="s.tooltipText != \'\'">{{ s.tooltipText }}</div>\n          </li>\n        </ol>\n      </li>\n    </ol>\n\n    <ol id="V1L1B2" class="cabin fuselage" *ngIf="block2 != null">\n      <li class="row" *ngFor="let r of block2.SeatRows">\n        <ol class="seats" type="r.RowNumber">\n          <li class="seat" *ngFor="let s of r.Seats">\n            <input type="checkbox" id="{{s.SeatNumber}}" class="chkSeats" value="{{s.SeatID}}" *ngIf="s.Status == \'PRESENT\'" (change)="selectSeat($event,s.SeatID)" />\n            <label for="{{s.SeatNumber}}" *ngIf="s.Status == \'PRESENT\'">{{ s.SeatNumber  }}</label>\n            <div class="tooltip" *ngIf="s.tooltipText != \'\'">{{ s.tooltipText }}</div>\n          </li>\n        </ol>\n      </li>\n    </ol>\n  </div>\n  <div>\n    <button ion-button color="primary">Proceed</button>\n  </div>\n</ion-content>'/*ion-inline-end:"E:\Java Project\In development\JavaProject\src\pages\v1venue\v1venue.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */]])
    ], V1venuePage);
    return V1venuePage;
}());

//# sourceMappingURL=v1venue.js.map

/***/ })

});
//# sourceMappingURL=3.js.map