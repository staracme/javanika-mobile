webpackJsonp([6],{

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MenuPageModule = (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
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
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = (function () {
    function MenuPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MenuPage');
    };
    MenuPage.prototype.goToPage = function (page) {
        this.navCtrl.push(page);
    };
    MenuPage.prototype.openMenu = function () {
        this.navCtrl.push('MenuPage');
    };
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"E:\RAZAWORKS\Git\projects\javanika\javanika-mobile\JavaProject\src\pages\menu\menu.html"*/'<ion-header>\n    <div class="HeaderWrap">\n      <div class="MenuIcon"><a href="JavaScript:;" (click)="openMenu()"><img src="assets/MenuIcon.png"></a></div>\n      <div class="PointsBlock">\n        <span class="PointsHigh">Javanika</span> Entertainments\n      </div>\n      <div class="clr"></div>\n    </div>\n    <div class="clr"></div>\n  </ion-header>\n\n\n<ion-content style="margin: 60px 0 0 0;">\n   \n    <a>\n      <div class="MenuWrapBlock1SH" (click)="goToPage(\'JavanikaPage\')">\n        <div class="MenuIconSH">\n          <img src="assets/HomeIcon.png" width="30px">\n        </div>\n        <div class="MenuLabelSH">Home</div>\n        <div class="MenuArrowSH">\n          <img src="assets/ArrowIcon.png">\n        </div>\n        <div class="clr"></div>\n      </div>\n    </a>\n  \n \n    <a>\n      <div class="MenuWrapBlock1SH" (click)="goToPage(\'EventspagePage\')">\n        <div class="MenuIconSH">\n          <img src="assets/EventsIcon.png" width="30px">\n        </div>\n        <div class="MenuLabelSH">Events</div>\n        <div class="MenuArrowSH">\n          <img src="assets/ArrowIcon.png" >\n        </div>\n        <div class="clr"></div>\n      </div>\n    </a>\n  \n    <a (click)="goToPage(\'MyBookingsPage\')">\n      <div class="MenuWrapBlock1SH">\n        <div class="MenuIconSH">\n          <img src="assets/BookingsIcon.png" width="30px">\n        </div>\n        <div class="MenuLabelSH">My Bookings</div>\n        <div class="MenuArrowSH">\n          <img src="assets/ArrowIcon.png">\n        </div>\n        <div class="clr"></div>\n      </div>\n    </a>\n  \n\n  \n  \n   <a (click)="goToPage(\'TncPage\')">\n      <div class="MenuWrapBlock1SH">\n        <div class="MenuIconSH">\n          <img src="assets/AboutIcon.png" width="30px">\n        </div>\n        <div class="MenuLabelSH">About US</div>\n        <div class="MenuArrowSH">\n          <img src="assets/ArrowIcon.png">\n        </div>\n        <div class="clr"></div>\n      </div>\n    </a>\n   \n    <a (click)="goToPage(\'AboutusPage\')">\n      <div class="MenuWrapBlock1SH">\n        <div class="MenuIconSH">\n          <img src="assets/ContactIcon.png" width="25px">\n        </div>\n        <div class="MenuLabelSH">Contact Us</div>\n        <div class="MenuArrowSH">\n          <img src="assets/ArrowIcon.png">\n        </div>\n        <div class="clr"></div>\n      </div>\n    </a>\n\n\n    <a>\n      <div class="FBBtn"><img src="assets/FacebookIcon.png" width="200px"></div>\n    </a>\n  \n  </ion-content>\n'/*ion-inline-end:"E:\RAZAWORKS\Git\projects\javanika\javanika-mobile\JavaProject\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=6.js.map