System.register("ionic/components/item/item", ["angular2/angular2"], function (_export) {
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
    "use strict";

    var Component, ElementRef, Renderer, __decorate, __metadata, Item, _a, _b;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            ElementRef = _angular2Angular2.ElementRef;
            Renderer = _angular2Angular2.Renderer;
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

            Item = function Item(elementRef, renderer) {
                _classCallCheck(this, Item);

                renderer.setElementClass(elementRef, 'item', true);
            };

            _export("Item", Item);

            _export("Item", Item = __decorate([Component({
                selector: 'ion-item,[ion-item]',
                template: '<ng-content select="[item-left]"></ng-content>' + '<ng-content select="[item-right]"></ng-content>' + '<ion-item-content>' + '<ng-content></ng-content>' + '</ion-item-content>'
            }), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Renderer !== 'undefined' && Renderer) === 'function' && _b || Object])], Item));
        }
    };
});