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
import { Component, ElementRef, DynamicComponentLoader } from 'angular2/angular2';
import { OverlayController } from './overlay-controller';
export let OverlayAnchor = class {
    constructor(overlayCtrl, elementRef, loader) {
        if (overlayCtrl.anchor) {
            throw ('An app should only have one <ion-overlay></ion-overlay>');
        }
        this.elementRef = elementRef;
        this.loader = loader;
        overlayCtrl.anchor = this;
    }
    append(componentType) {
        return this.loader.loadNextToLocation(componentType, this.elementRef).catch(err => {
            console.error(err);
        });
    }
};
OverlayAnchor = __decorate([
    Component({
        selector: 'ion-overlay',
        template: ''
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof OverlayController !== 'undefined' && OverlayController) === 'function' && _a) || Object, (typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof DynamicComponentLoader !== 'undefined' && DynamicComponentLoader) === 'function' && _c) || Object])
], OverlayAnchor);
var _a, _b, _c;