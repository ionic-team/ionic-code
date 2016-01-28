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
 *   </ion-item-sliding>
 * </ion-list>
 * ```
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
var ItemSliding = (function () {
    function ItemSliding(_list, elementRef) {
        this._list = _list;
        _list.enableSlidingItems(true);
        elementRef.nativeElement.$ionSlide = ++slideIds;
    }
    /**
     * @private
     */
    ItemSliding.prototype.close = function () {
        this._list.closeSlidingItems();
    };
    ItemSliding = __decorate([
        core_1.Component({
            selector: 'ion-item-sliding',
            template: '<ng-content select="ion-item,[ion-item]"></ng-content>' +
                '<ng-content select="ion-item-options"></ng-content>'
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [list_1.List, core_1.ElementRef])
    ], ItemSliding);
    return ItemSliding;
})();
exports.ItemSliding = ItemSliding;
var slideIds = 0;
