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
import { Directive, Optional } from 'angular2/angular2';
import { NavController } from './nav-controller';
import { NavRegistry } from './nav-registry';
/**
 * Directive for declaratively linking to a new page instead of using
 * [NavController.push()](../NavController/#push). Similar to ui-router's `ui-sref`.
 *
 * Basic usage:
 * ```html
 * <button [nav-push]="pushPage"></button>
 * ```
 * To specify parameters you can use array syntax or the `nav-params` property:
 * ```html
 * <button [nav-push]="pushPage" [nav-params]="params"></button>
 * ```
 * Where `pushPage` and `params` are specified in your component, and `pushPage`
 * contains a reference to a [@Page component](../../../config/Page/):
 *
 * ```ts
 * import {LoginPage} from 'login';
 * @Page({
 *   template: `<button [nav-push]="pushPage" [nav-params]="params"></button>`
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
 * <button [nav-push]="[pushPage, params]"></button>
 * ```
 */
export let NavPush = class {
    /**
     * TODO
     * @param {NavController} nav  TODO
     */
    constructor(nav, registry) {
        this.nav = nav;
        this.registry = registry;
        if (!nav) {
            console.error('nav-push must be within a NavController');
        }
    }
    onClick() {
        let destination, params;
        if (this.instruction instanceof Array) {
            if (this.instruction.length > 2) {
                throw 'Too many [nav-push] arguments, expects [View, { params }]';
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
    }
};
NavPush = __decorate([
    Directive({
        selector: '[nav-push]',
        inputs: [
            'instruction: navPush',
            'params: navParams'
        ],
        host: {
            '(click)': 'onClick()',
            'role': 'link'
        }
    }),
    __param(0, Optional()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a) || Object, (typeof (_b = typeof NavRegistry !== 'undefined' && NavRegistry) === 'function' && _b) || Object])
], NavPush);
/**
 * TODO
 */
export let NavPop = class {
    /**
     * TODO
     * @param {NavController} nav  TODO
     */
    constructor(nav) {
        this.nav = nav;
        if (!nav) {
            console.error('nav-pop must be within a NavController');
        }
    }
    onClick() {
        this.nav && this.nav.pop();
    }
};
NavPop = __decorate([
    Directive({
        selector: '[nav-pop]',
        host: {
            '(click)': 'onClick()',
            'role': 'link'
        }
    }),
    __param(0, Optional()), 
    __metadata('design:paramtypes', [(typeof (_c = typeof NavController !== 'undefined' && NavController) === 'function' && _c) || Object])
], NavPop);
var _a, _b, _c;