webpackJsonp([0],{

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V7venuePageModule", function() { return V7venuePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__v7venue__ = __webpack_require__(305);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var V7venuePageModule = (function () {
    function V7venuePageModule() {
    }
    V7venuePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__v7venue__["a" /* V7venuePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__v7venue__["a" /* V7venuePage */]),
            ],
        })
    ], V7venuePageModule);
    return V7venuePageModule;
}());

//# sourceMappingURL=v7venue.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return V7venuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_common__ = __webpack_require__(102);
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
 * Generated class for the V7venuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var V7venuePage = (function () {
    function V7venuePage(navCtrl, navParams, http, device, alertCtrl, loadingCtrl, common) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.device = device;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.common = common;
        this.eventID = 0;
        this.seat_summary = null;
        this.block1 = null;
        this.block2 = null;
        this.block3 = null;
        this.block4 = null;
        this.block5 = null;
        this.block6 = null;
        this.isProceedToBook = false;
        this.selected_seats = [];
        this.event_name = "";
        this.event_date = "";
    }
    V7venuePage.prototype.ionViewDidLoad = function () {
        var eventID = this.navParams.get('eventID');
        this.getSeats(eventID);
    };
    V7venuePage.prototype.ionViewCanLeave = function () {
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
                                if (response == "OK") {
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
    V7venuePage.prototype.ionViewWillLeave = function () {
        this.block1 = null;
        this.block2 = null;
        this.block3 = null;
        this.block4 = null;
        this.block5 = null;
        this.block6 = null;
        this.eventID = 0;
        this.seat_summary = null;
    };
    V7venuePage.prototype.getSeats = function (eventID) {
        var _this = this;
        this.http.post(this.common.apiURL + '/v7Venue', { eventID: eventID }).subscribe(function (data) {
            _this.eventID = data.eventID;
            _this.block1 = data.block1;
            _this.block2 = data.block2;
            _this.block3 = data.block3;
            _this.block4 = data.block4;
            _this.block5 = data.block5;
            _this.block6 = data.block6;
        });
    };
    V7venuePage.prototype.selectSeat = function (event, seatID) {
        var _this = this;
        if (event.currentTarget.checked) {
            var postData = {
                "uuid": this.device.uuid,
                "seatID": seatID,
                "eventID": this.eventID
            };
            this.http.post(this.common.apiURL + '/SelectSeat', postData).subscribe(function (data) {
                _this.seat_summary = data;
                _this.selected_seats.push(seatID);
            });
        }
        else {
            this.http.post(this.common.apiURL + '/RemoveSeat', { eventID: this.eventID, uuid: this.device.uuid, seatID: seatID }).subscribe(function (data) {
                _this.seat_summary = data;
                var index = _this.removeCheckedFromArray(seatID);
                _this.selected_seats.splice(index, 1);
            });
        }
    };
    //Removes checkbox from array when you uncheck it
    V7venuePage.prototype.removeCheckedFromArray = function (checkbox) {
        return this.selected_seats.findIndex(function (category) {
            return category === checkbox;
        });
    };
    V7venuePage.prototype.proceedToBooking = function (eventID) {
        if (this.selected_seats.length > 0) {
            this.isProceedToBook = true;
            this.navCtrl.push('BookingSummaryPage', { eventID: eventID });
        }
        else {
            alert("Please select seats to proceed.");
        }
    };
    V7venuePage.prototype.addSeat = function (seatID, eventID) {
        var _this = this;
        var postData = {
            "uuid": this.device.uuid,
            "seatID": seatID,
            "eventID": this.eventID
        };
        this.http.post(this.common.apiURL + '/SelectSeat', postData).subscribe(function (data) {
            _this.seat_summary = data;
        });
    };
    V7venuePage.prototype.removeSeat = function (seatID) {
        var _this = this;
        this.http.post(this.common.apiURL + '/RemoveSeat', { eventID: this.eventID, uuid: this.device.uuid, seatID: seatID }).subscribe(function (data) {
            _this.seat_summary = data;
        });
    };
    V7venuePage.prototype.openMenu = function () {
        this.navCtrl.push('JavanikaPage');
    };
    V7venuePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-v7venue',template:/*ion-inline-start:"E:\Java Project\In development\JavaProject\src\pages\v7venue\v7venue.html"*/'<ion-header>\n  <div class="HeaderWrap">\n    <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n    <div class="PointsBlock">\n      <span class="PointsHigh">Javanika</span> Entertainments\n    </div>\n    <div class="clr"></div>\n  </div>\n  <div class="clr"></div>\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="EventHead">Hellaro</div>\n  <div class="EventHead">{{ event_name }}</div>\n  <div class="EventLabel2">\n    <span>Show time : {{event_date}}</span>\n  </div>\n<br>\n  <div >\n    <div>\n      <div class="Screen">Screen this side</div>\n      <div>\n        <div class="Drag1">Drag towards right to view seats</div>\n        <div class="Drag2"><img src="assets/DragArrow.png" width="20px" ></div>\n        <div class="clr"></div>\n      </div>\n    </div>\n    <ol id="V7B1" class="cabin fuselage" *ngIf="block1 != null">\n      <li class="row" *ngFor="let r of block1.SeatRows">\n        <ol class="seats" type="A">\n          <li class="seat" *ngFor="let s of r.Seats">\n            <input type="checkbox" id="{{s.SeatNumber}}" class="chkSeats" value="{{s.SeatID}}"\n              (change)="selectSeat($event,s.SeatID, eventID)" [disabled]="s.isBooked" *ngIf="s.Status == \'PRESENT\'" />\n            <label for="{{s.SeatNumber}}" *ngIf="s.Status == \'PRESENT\'">{{s.SeatNumber}}</label>\n          </li>\n        </ol>\n      </li>\n    </ol>\n\n    <ol id="V7B2" class="cabin fuselage" *ngIf="block2 != null">\n      <li class="row" *ngFor="let r of block2.SeatRows">\n        <ol class="seats" type="A">\n          <li class="seat" *ngFor="let s of r.Seats">\n            <input type="checkbox" id="{{s.SeatNumber}}" class="chkSeats" value="{{s.SeatID}}"\n              (change)="selectSeat($event,s.SeatID, eventID)" [disabled]="s.isBooked" *ngIf="s.Status == \'PRESENT\'" />\n            <label for="{{s.SeatNumber}}" *ngIf="s.Status == \'PRESENT\'">{{s.SeatNumber}}</label>\n          </li>\n        </ol>\n      </li>\n    </ol>\n\n    <ol id="V7B3" class="cabin fuselage" *ngIf="block3 != null">\n      <li class="row" *ngFor="let r of block3.SeatRows">\n        <ol class="seats" type="A">\n          <li class="seat" *ngFor="let s of r.Seats">\n            <input type="checkbox" id="{{s.SeatNumber}}" class="chkSeats" value="{{s.SeatID}}"\n              (change)="selectSeat($event,s.SeatID, eventID)" [disabled]="s.isBooked" *ngIf="s.Status == \'PRESENT\'" />\n            <label for="{{s.SeatNumber}}" *ngIf="s.Status == \'PRESENT\'">{{s.SeatNumber}}</label>\n          </li>\n        </ol>\n      </li>\n    </ol>\n\n    <ol id="V7B4" class="cabin fuselage" *ngIf="block4 != null">\n      <li class="row" *ngFor="let r of block4.SeatRows">\n        <ol class="seats" type="A">\n          <li class="seat" *ngFor="let s of r.Seats">\n            <input type="checkbox" id="{{s.SeatNumber}}" class="chkSeats" value="{{s.SeatID}}"\n              (change)="selectSeat($event,s.SeatID, eventID)" [disabled]="s.isBooked" *ngIf="s.Status == \'PRESENT\'" />\n            <label for="{{s.SeatNumber}}" *ngIf="s.Status == \'PRESENT\'">{{s.SeatNumber}}</label>\n          </li>\n        </ol>\n      </li>\n    </ol>\n    <br>\n		<br>\n    <ol id="V7B5" class="cabin fuselage" *ngIf="block5 != null">\n      <li class="row" *ngFor="let r of block5.SeatRows">\n        <ol class="seats" type="A">\n          <li class="seat" *ngFor="let s of r.Seats">\n            <input type="checkbox" id="{{s.SeatNumber}}" class="chkSeats" value="{{s.SeatID}}"\n              (change)="selectSeat($event,s.SeatID, eventID)" [disabled]="s.isBooked" *ngIf="s.Status == \'PRESENT\'" />\n            <label for="{{s.SeatNumber}}" *ngIf="s.Status == \'PRESENT\'">{{s.SeatNumber}}</label>\n          </li>\n        </ol>\n      </li>\n    </ol>\n    <br>\n		<br>\n    <ol id="V7B6" class="cabin fuselage" *ngIf="block6 != null">\n      <li class="row" *ngFor="let r of block6.SeatRows">\n        <ol class="seats" type="A">\n          <li class="seat" *ngFor="let s of r.Seats">\n            <input type="checkbox" id="{{s.SeatNumber}}" class="chkSeats" value="{{s.SeatID}}"\n              (change)="selectSeat($event,s.SeatID, eventID)" [disabled]="s.isBooked" *ngIf="s.Status == \'PRESENT\'" />\n            <label for="{{s.SeatNumber}}" *ngIf="s.Status == \'PRESENT\'">{{s.SeatNumber}}</label>\n          </li>\n        </ol>\n      </li>\n    </ol>\n  <br> <br> <br><br> <br> <br>\n  <div class="EventFootWrap1" *ngIf="seat_summary !=null">\n    <table class="TierTbl" border="1">\n      <tr>\n        <th>Total Seats</th>\n        <th>Total Cost</th>\n      </tr>\n      <tbody id="tbody">\n        <tr>\n          <td colspan="2" class="TierClass" *ngIf="seat_summary.NoOfSeats == 0">No Bookings Yet</td>\n          <td class="TierClass"  *ngIf="seat_summary.NoOfSeats > 0">{{ seat_summary.NoOfSeats }}</td>\n          <td class="TierClass"  *ngIf="seat_summary.NoOfSeats > 0">{{ seat_summary.TotalPrice }}</td>\n        </tr>\n      </tbody>\n    </table>\n    \n  </div>\n  \n</div>\n\n\n</ion-content>\n<ion-footer>\n\n  <div class="EventFootWrap"  (click)="proceedToBooking(eventID)">Confirm Booking</div>\n</ion-footer>\n\n \n\n\n'/*ion-inline-end:"E:\Java Project\In development\JavaProject\src\pages\v7venue\v7venue.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_common_common__["a" /* CommonProvider */]])
    ], V7venuePage);
    return V7venuePage;
}());

//# sourceMappingURL=v7venue.js.map

/***/ })

});
//# sourceMappingURL=0.js.map