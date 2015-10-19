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
import { Component, ElementRef, Renderer } from 'angular2/angular2';
/**
 * Creates a list-item that can easily be swiped,
 * deleted, reordered, edited, and more.
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item *ng-for="#item of items" (click)="itemTapped($event, item)">
 *     {{item.title}}
 *     <ion-note item-right>
 *       {{item.note}}
 *     </ion-note>
 *   </ion-item>
 * </ion-list>
 *  ```
 */
export let Item = class {
    constructor(elementRef, renderer) {
        renderer.setElementClass(elementRef, 'item', true);
    }
};
Item = __decorate([
    Component({
        selector: 'ion-item,[ion-item]',
        template: '<ng-content select="[item-left]"></ng-content>' +
            '<ng-content select="[item-right]"></ng-content>' +
            '<ion-item-content>' +
            '<ng-content></ng-content>' +
            '</ion-item-content>'
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Renderer !== 'undefined' && Renderer) === 'function' && _b) || Object])
], Item);
var _a, _b;