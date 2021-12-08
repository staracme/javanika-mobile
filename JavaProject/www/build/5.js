webpackJsonp([5],{

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyBookingsPageModule", function() { return MyBookingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_bookings__ = __webpack_require__(300);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MyBookingsPageModule = (function () {
    function MyBookingsPageModule() {
    }
    MyBookingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__my_bookings__["a" /* MyBookingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__my_bookings__["a" /* MyBookingsPage */]),
            ],
        })
    ], MyBookingsPageModule);
    return MyBookingsPageModule;
}());

//# sourceMappingURL=my-bookings.module.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyBookingsPage; });
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
 * Generated class for the MyBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyBookingsPage = (function () {
    function MyBookingsPage(navCtrl, navParams, http, common) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.common = common;
        this.email = "";
        this.mode = "email";
        this.otp = {
            email: '',
            otp: ''
        };
        this.my_orders = [];
        this.otp_loading = false;
        this.otp_gen_loader = false;
        this.otp_process = 'pending';
    }
    MyBookingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyBookingsPage');
    };
    MyBookingsPage.prototype.openMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    MyBookingsPage.prototype.generateOTP = function () {
        var _this = this;
        this.otp_loading = true;
        this.http.post(this.common.apiURL + '/OTP', this.otp).subscribe(function (data) {
            if (data.status == "OK") {
                _this.mode = 'otp';
                _this.email = _this.otp['email'];
                _this.otp_loading = false;
            }
        });
    };
    MyBookingsPage.prototype.getOrders = function () {
        var _this = this;
        this.otp_gen_loader = true;
        this.http.post(this.common.apiURL + '/MyOrders', this.otp).subscribe(function (data) {
            if (data.status == "OK") {
                _this.my_orders = data.my_orders;
                _this.otp_gen_loader = false;
                _this.otp_process = 'done';
            }
        });
    };
    MyBookingsPage.prototype.getTicket = function (orderID) {
        this.navCtrl.push('TicketPage', { orderID: orderID });
    };
    MyBookingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-bookings',template:/*ion-inline-start:"E:\RAZAWORKS\Git\projects\javanika\javanika-mobile\JavaProject\src\pages\my-bookings\my-bookings.html"*/'<ion-header>\n    <div class="HeaderWrap">\n      <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n      <div class="PointsBlock">\n        <span class="PointsHigh">Javanika</span> Entertainments\n      </div>\n      <div class="clr"></div>\n    </div>\n    <div class="clr"></div>\n</ion-header>\n\n\n<ion-content style="margin: 60px 0 0 0;">\n\n    <div class="HomeHeadLabel">My Bookings</div>\n\n\n    <div class="MBLabel" *ngIf="otp_process == \'pending\'">\n      Please validate your credentials....\n      <div class="MBInp"><input type="text" class="MBTxt" [disabled]="mode == \'otp\'" [(ngModel)]="otp.email" placeholder="Enter your Email ID"><br><span *ngIf="mode == \'email\'"><input type="button" value="Submit" (click)="generateOTP();" *ngIf="otp_loading == false" /></span><span *ngIf="otp_loading == true" >Please wait....</span></div>\n      <div class="MBInp"  *ngIf="mode == \'otp\'"><input type="text" class="MBTxt" [(ngModel)]="otp.otp" placeholder="Enter OTP"><br><span><input type="button" value="Submit" (click)="getOrders();" *ngIf="otp_gen_loader == false" /></span><span *ngIf="otp_gen_loader == true">Please wait....</span></div>\n    </div>\n\n    <div class="MBWrap" *ngFor="let o of my_orders">\n      <div class="MBName">{{o.event_name}}</div>\n      <div class="MBLocation">{{o.venue_name}}</div>\n      <div class="MBDate">{{ o.event_date }} | {{ o.event_time }}</div>\n      <div class="MBClick"><a class="MBLink" (click)="getTicket(o.orderID)">View Ticket</a></div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"E:\RAZAWORKS\Git\projects\javanika\javanika-mobile\JavaProject\src\pages\my-bookings\my-bookings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */]])
    ], MyBookingsPage);
    return MyBookingsPage;
}());

//# sourceMappingURL=my-bookings.js.map

/***/ })

});
//# sourceMappingURL=5.js.map