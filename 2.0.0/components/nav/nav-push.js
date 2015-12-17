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
var nav_controller_1 = require('./nav-controller');
var nav_registry_1 = require('./nav-registry');
/**
 * @name NavPush
 * @description
 * Directive for declaratively linking to a new page instead of using
 * {@link ../NavController/#push NavController.push}. Similar to ui-router's `ui-sref`.
 *
 * @usage
 * ```html
 * <button [navPush]="pushPage"></button>
 * ```
 * To specify parameters you can use array syntax or the `nav-params` property:
 * ```html
 * <button [navPush]="pushPage" [navParams]="params"></button>
 * ```
 * Where `pushPage` and `params` are specified in your component, and `pushPage`
 * contains a reference to a [@Page component](../../../config/Page/):
 *
 * ```ts
 * import {LoginPage} from 'login';
 * @Page({
 *   template: `<button [navPush]="pushPage" [navParams]="params"></button>`
 * })
 * class MyPage {
 *   constructor(){
 *     this.pushPage = LoginPage;
 *     this.params = { id: 42 };
 *   }
 * }
 * ```
 *
 * ### Alternate syntax
 * You can also use syntax similar to Angular2's router, passing an array to
 * NavPush:
 * ```html
 * <button [navPush]="[pushPage, params]"></button>
 * ```
 * @demo /docs/v2/demos/nav-push-pop/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavPop NavPop API Docs}
 */
var NavPush = (function () {
    /**
     * TODO
     * @param {NavController} nav  TODO
     */
    function NavPush(nav, registry) {
        this.nav = nav;
        this.registry = registry;
        if (!nav) {
            console.error('nav-push must be within a NavController');
        }
    }
    /**
     * @private
     */
    NavPush.prototype.onClick = function () {
        var destination, params;
        if (this.instruction instanceof Array) {
            if (this.instruction.length > 2) {
                throw 'Too many [navPush] arguments, expects [View, { params }]';
            }
            destination = this.instruction[0];
            params = this.instruction[1] || this.params;
        }
        else {
            destination = this.instruction;
            params = this.params;
        }
        if (typeof destination === "string") {
            destination = this.registry.get(destination);
        }
        this.nav && this.nav.push(destination, params);
    };
    NavPush = __decorate([
        core_1.Directive({
            selector: '[navPush]',
            inputs: [
                'instruction: navPush',
                'params: navParams'
            ],
            host: {
                '(click)': 'onClick()',
                'role': 'link'
            }
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _a) || Object, (typeof (_b = typeof nav_registry_1.NavRegistry !== 'undefined' && nav_registry_1.NavRegistry) === 'function' && _b) || Object])
    ], NavPush);
    return NavPush;
    var _a, _b;
})();
exports.NavPush = NavPush;
/**
 * @name NavPop
 * @description
 * Directive for declaratively pop the current page off from the navigation stack.
 *
 * @usage
 * ```html
 * <ion-content>
 *  <div block button nav-pop>go back</div>
 * </ion-content>
 * ```
 * This will go back one page in the navigation stack
 *
 * Similar to {@link /docs/v2/api/components/nav/NavPush/ `NavPush` }
 * @demo /docs/v2/demos/nav-push-pop/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavPush NavPush API Docs}
 */
var NavPop = (function () {
    /**
     * TODO
     * @param {NavController} nav  TODO
     */
    function NavPop(nav) {
        this.nav = nav;
        if (!nav) {
            console.error('nav-pop must be within a NavController');
        }
    }
    /**
     * @private
     */
    NavPop.prototype.onClick = function () {
        this.nav && this.nav.pop();
    };
    NavPop = __decorate([
        core_1.Directive({
            selector: '[nav-pop]',
            host: {
                '(click)': 'onClick()',
                'role': 'link'
            }
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof nav_controller_1.NavController !== 'undefined' && nav_controller_1.NavController) === 'function' && _a) || Object])
    ], NavPop);
    return NavPop;
    var _a;
})();
exports.NavPop = NavPop;