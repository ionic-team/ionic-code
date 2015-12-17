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
var list_1 = require('../list/list');
/**
 * @name ItemSliding
 *
 * @description
 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item-sliding *ngFor="#item of items">
 *     <ion-item (click)="itemTapped(item)">
 *       {{item.title}}
 *     </ion-item>
 *     <ion-item-options>
 *       <button (click)="favorite(item)">Favorite</button>
 *       <button (click)="share(item)">Share</button>
 *     </ion-item-options>
 *   </ion-item>
 * </ion-list>
 * ```
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
var ItemSliding = (function () {
    function ItemSliding(list, elementRef) {
        this.list = list;
        list.enableSlidingItems(true);
        elementRef.nativeElement.$ionSlide = ++slideIds;
    }
    /**
     * @private
     */
    ItemSliding.prototype.close = function () {
        this.list.closeSlidingItems();
    };
    ItemSliding = __decorate([
        core_1.Component({
            selector: 'ion-item-sliding',
            template: '<ng-content select="ion-item,[ion-item]"></ng-content>' +
                '<ng-content select="ion-item-options"></ng-content>'
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof list_1.List !== 'undefined' && list_1.List) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object])
    ], ItemSliding);
    return ItemSliding;
    var _a, _b;
})();
exports.ItemSliding = ItemSliding;
var slideIds = 0;