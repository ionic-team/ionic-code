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
import { ChangeDetectorRef, Component, ElementRef, Compiler, AppViewManager, NgZone, Renderer } from 'angular2/angular2';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
import { OverlayController } from './overlay-controller';
import { NavController } from '../nav/nav-controller';
export let OverlayNav = class extends NavController {
    constructor(overlayCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
        super(null, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd);
        if (overlayCtrl.anchor) {
            throw ('An app should only have one <ion-overlay></ion-overlay>');
        }
        overlayCtrl.nav = this;
    }
};
OverlayNav = __decorate([
    Component({
        selector: 'ion-overlay',
        template: '<template #contents></template>'
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof OverlayController !== 'undefined' && OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _b) || Object, (typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c) || Object, (typeof (_d = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _d) || Object, (typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e) || Object, (typeof (_f = typeof Compiler !== 'undefined' && Compiler) === 'function' && _f) || Object, (typeof (_g = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _g) || Object, (typeof (_h = typeof NgZone !== 'undefined' && NgZone) === 'function' && _h) || Object, (typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j) || Object, (typeof (_k = typeof ChangeDetectorRef !== 'undefined' && ChangeDetectorRef) === 'function' && _k) || Object])
], OverlayNav);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;