System.register("ionic/components/item/item-sliding", ["angular2/angular2", "../list/list"], function (_export) {
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
    "use strict";

    var Component, ElementRef, Optional, List, __decorate, __metadata, __param, ItemSliding, slideIds, _a, _b;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            ElementRef = _angular2Angular2.ElementRef;
            Optional = _angular2Angular2.Optional;
        }, function (_listList) {
            List = _listList.List;
        }],
        execute: function () {
            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
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

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            __param = undefined && undefined.__param || function (paramIndex, decorator) {
                return function (target, key) {
                    decorator(target, key, paramIndex);
                };
            };

            ItemSliding = (function () {
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

            _export("ItemSliding", ItemSliding);

            _export("ItemSliding", ItemSliding = __decorate([Component({
                selector: 'ion-item-sliding',
                template: '<ng-content select="ion-item,[ion-item]"></ng-content>' + '<ng-content select="ion-item-options"></ng-content>'
            }), __param(0, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof List !== 'undefined' && List) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object])], ItemSliding));
            slideIds = 0;
        }
    };
});