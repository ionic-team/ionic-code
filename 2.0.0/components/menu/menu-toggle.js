var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
        this.withinNavbar = !!navbar;
        // Deprecation warning
        if (this.withinNavbar && elementRef.nativeElement.tagName === 'A') {
            console.warn('Menu toggles within a navbar should use <button menuToggle> instead of <a menu-toggle>');
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
    MenuToggle = __decorate([
        core_1.Directive({
            selector: '[menuToggle]',
            inputs: [
                'menuToggle'
            ],
            host: {
                '(click)': 'toggle()',
                '[hidden]': 'isHidden',
                'menuToggle': '' //ensures the attr is there for css when using [menuToggle]
            }
        }),
        __param(2, core_1.Optional()),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof view_controller_1.ViewController !== 'undefined' && view_controller_1.ViewController) === 'function' && _c) || Object, (typeof (_d = typeof navbar_1.Navbar !== 'undefined' && navbar_1.Navbar) === 'function' && _d) || Object])
    ], MenuToggle);
    return MenuToggle;
    var _a, _b, _c, _d;
})();
exports.MenuToggle = MenuToggle;