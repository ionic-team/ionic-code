var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var app_1 = require('../app/app');
var view_controller_1 = require('../nav/view-controller');
var navbar_1 = require('../navbar/navbar');
var menu_1 = require('./menu');
/**
* @name MenuToggle
* @description
* Toggle a menu by placing this directive on any item.
* Note that the menu's id must be either `leftMenu` or `rightMenu`
*
* @usage
 * ```html
 *<ion-content>
 *  <h3>Page 1</h3>
 *  <button menuToggle>Toggle Menu</button>
 *</ion-content>
 *
 * ```
* @demo /docs/v2/demos/menu/
* @see {@link /docs/v2/components#menus Menu Component Docs}
* @see {@link ../../menu/Menu Menu API Docs}
*/
var MenuToggle = (function () {
    function MenuToggle(app, elementRef, viewCtrl, navbar) {
        this.app = app;
        this.viewCtrl = viewCtrl;
        this.navbar = navbar;
        this.withinNavbar = !!navbar;
        // Deprecation warning
        if (this.withinNavbar && elementRef.nativeElement.tagName === 'A') {
            void 0;
        }
    }
    /**
    * @private
    */
    MenuToggle.prototype.toggle = function () {
        var menu = menu_1.Menu.getById(this.app, this.menuToggle);
        menu && menu.toggle();
    };
    Object.defineProperty(MenuToggle.prototype, "isHidden", {
        /**
        * @private
        */
        get: function () {
            if (this.withinNavbar && this.viewCtrl) {
                return !this.viewCtrl.isRoot();
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuToggle.prototype, "menuToggle", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MenuToggle.prototype, "toggle", null);
    MenuToggle = __decorate([
        core_1.Directive({
            selector: '[menuToggle]',
            host: {
                '[hidden]': 'isHidden',
                'menuToggle': '' //ensures the attr is there for css when using [menuToggle]
            }
        }),
        __param(2, core_1.Optional()),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [app_1.IonicApp, core_1.ElementRef, view_controller_1.ViewController, navbar_1.Navbar])
    ], MenuToggle);
    return MenuToggle;
})();
exports.MenuToggle = MenuToggle;
