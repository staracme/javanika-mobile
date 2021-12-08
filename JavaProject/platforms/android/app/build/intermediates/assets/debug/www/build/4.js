webpackJsonp([4],{

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicketPageModule", function() { return TicketPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ticket__ = __webpack_require__(301);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TicketPageModule = (function () {
    function TicketPageModule() {
    }
    TicketPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__ticket__["a" /* TicketPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__ticket__["a" /* TicketPage */]),
            ],
        })
    ], TicketPageModule);
    return TicketPageModule;
}());

//# sourceMappingURL=ticket.module.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketPage; });
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
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TicketPage = (function () {
    function TicketPage(navCtrl, navParams, http, loadingCtrl, common) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.common = common;
        this.ticket = null;
    }
    TicketPage.prototype.ionViewDidLoad = function () {
        this.getTicket(this.navParams.get('orderID'));
    };
    TicketPage.prototype.getTicket = function (orderID) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Loading...',
            enableBackdropDismiss: false
        });
        loading.present();
        this.http.post(this.common.apiURL + '/Ticket', {
            orderID: orderID
        }).subscribe(function (data) {
            _this.ticket = data;
            loading.dismiss();
        });
    };
    TicketPage.prototype.openMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    TicketPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ticket',template:/*ion-inline-start:"E:\Java Project\In development\JavaProject\src\pages\ticket\ticket.html"*/'<!--\n  Generated template for the TicketPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <div class="HeaderWrap">\n    <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n    <div class="PointsBlock">\n      <span class="PointsHigh">Javanika</span> Entertainments\n    </div>\n    <div class="clr"></div>\n  </div>\n  <div class="clr"></div>\n</ion-header>\n\n\n\n<ion-content style="margin: 60px 0 0 0;">\n\n  <div class="TicketWrap" *ngIf="ticket != null">\n    <div class="EventName">{{ ticket.event_name }}</div>\n\n    <div>\n      <div class="EventBanner"><img src="{{ ticket.event_banner }}" width="100%" /></div>\n      <div class="EventInfoWrap">\n        <div class="DateTime">\n          Serial No.<br />\n          <span class="High1">{{ ticket.srNo }}</span>\n        </div>\n        <div class="DateTime">\n          Date : Time<br />\n          <span class="High">{{ ticket.event_date }}, {{ ticket.event_time }}</span>\n        </div>\n        <div class="DateTime">\n          Venue<br />\n          <span class="High">{{ ticket.venue_name }}</span>\n        </div>\n\n        <div class="DateTime">\n          Seats<br />\n          <span class="High">{{ ticket.seats }}</span>\n        </div>\n\n        <div class="QRCodeWrap">\n            <img src="{{ ticket.qrCode }}" />\n        </div>\n\n      </div>\n      <div class="clr"></div>\n    </div>\n\n\n    <div class="TNC">\n      <b>Terms & Conditions:</b><br />\n      <ol>\n        <li>All tickets are non-refundable and non-transferable once purchased.</li>\n        <li>You will see a charge from Javanika.com on your credit card statement for this order.</li>\n        <li>Please present a printed copy of this page along with your Photo ID to collect your tickets at the venue.\n          Please do carry a valid Photo ID along with you to the event.</li>\n        <li>In case of cancellation or reschedule of the event you can claim for the refund. but ticket purchased\n          Service Fee is (non-refundable).</li>\n      </ol>\n    </div>\n\n  </div>\n</ion-content>'/*ion-inline-end:"E:\Java Project\In development\JavaProject\src\pages\ticket\ticket.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */]])
    ], TicketPage);
    return TicketPage;
}());

//# sourceMappingURL=ticket.js.map

/***/ })

});
//# sourceMappingURL=4.js.map