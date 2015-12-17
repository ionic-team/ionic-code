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
var core_1 = require('angular2/core');
var app_1 = require('../app/app');
var menu_1 = require('./menu');
/**
* @name MenuClose
* @description
* Place `menuClose` on a button to automatically close an open menu. Note that the menu's id must be either
* `leftMenu` or `rightMenu`
*
* @usage
 * ```html
 * <ion-menu [content]="mycontent" id="leftMenu">
 *   <ion-content>
 *     <ion-list>
 *     <ion-item menuClose>Close the menu</ion-item>
 *     </ion-list>
 *   </ion-content>
 * </ion-menu>
 *
 * <ion-nav #mycontent [root]="rootPage"></ion-nav>
 * ```
* @demo /docs/v2/demos/menu/
* @see {@link /docs/v2/components#menus Menu Component Docs}
* @see {@link ../../menu/Menu Menu API Docs}
*/
var MenuClose = (function () {
    function MenuClose(app) {
        this.app = app;
    }
    /**
    * @private
    */
    MenuClose.prototype.close = function () {
        var menu = menu_1.Menu.getById(this.app, this.menuClose);
        menu && menu.close();
    };
    MenuClose = __decorate([
        core_1.Directive({
            selector: '[menuClose]',
            inputs: [
                'menuClose'
            ],
            host: {
                '(click)': 'close()'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof app_1.IonicApp !== 'undefined' && app_1.IonicApp) === 'function' && _a) || Object])
    ], MenuClose);
    return MenuClose;
    var _a;
})();
exports.MenuClose = MenuClose;