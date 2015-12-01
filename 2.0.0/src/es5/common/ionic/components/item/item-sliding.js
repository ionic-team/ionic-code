"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _listList = require('../list/list');

/**
 * @description
 * Creates a list-item that can easily be swiped,
 * deleted, reordered, edited, and more.
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item-sliding *ng-for="#item of items">
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
 */
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
var ItemSliding = (function () {
    function ItemSliding(list, elementRef) {
        _classCallCheck(this, ItemSliding);

        this.list = list;
        list.enableSlidingItems(true);
        elementRef.nativeElement.$ionSlide = ++slideIds;
    }

    _createClass(ItemSliding, [{
        key: "close",
        value: function close() {
            this.list.closeSlidingItems();
        }
    }]);

    return ItemSliding;
})();
exports.ItemSliding = ItemSliding;
exports.ItemSliding = ItemSliding = __decorate([(0, _angular2Angular2.Component)({
    selector: 'ion-item-sliding',
    template: '<ng-content select="ion-item,[ion-item]"></ng-content>' + '<ng-content select="ion-item-options"></ng-content>'
}), __param(0, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [typeof (_a = typeof _listList.List !== 'undefined' && _listList.List) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object])], ItemSliding);
var slideIds = 0;
var _a, _b;