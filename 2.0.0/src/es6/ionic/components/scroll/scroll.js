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
import { Component, ElementRef } from 'angular2/angular2';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or
 * vertically.
 */
export let Scroll = class extends Ion {
    constructor(elementRef, Config) {
        super(elementRef, Config);
        this.maxScale = 3;
        this.zoomDuration = 250;
    }
    /**
     * @private
     */
    onInit() {
        this.scrollElement = this.getNativeElement().children[0];
    }
    /**
     * Add a scroll event handler to the scroll element if it exists.
     * @param {Function} handler  The scroll handler to add to the scroll element.
     * @returns {?Function} a function to remove the specified handler, otherwise
     * undefined if the scroll element doesn't exist.
     */
    addScrollEventListener(handler) {
        if (!this.scrollElement) {
            return;
        }
        this.scrollElement.addEventListener('scroll', handler);
        return () => {
            this.scrollElement.removeEventListener('scroll', handler);
        };
    }
};
Scroll = __decorate([
    Component({
        selector: 'ion-scroll',
        inputs: [
            'scrollX', 'scrollY', 'zoom', 'maxZoom'
        ],
        host: {
            '[class.scroll-x]': 'scrollX',
            '[class.scroll-y]': 'scrollY'
        },
        template: '<scroll-content>' +
            '<div class="scroll-zoom-wrapper">' +
            '<ng-content></ng-content>' +
            '</div>' +
            '</scroll-content>'
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object])
], Scroll);
var _a, _b;