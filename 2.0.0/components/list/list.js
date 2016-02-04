var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ion_1 = require('../ion');
var virtual_1 = require('./virtual');
var item_sliding_gesture_1 = require('../item/item-sliding-gesture');
var util_1 = require('../../util');
/**
 * The List is a widely used interface element in almost any mobile app, and can include
 * content ranging from basic text all the way to buttons, toggles, icons, and thumbnails.
 *
 * Both the list, which contains items, and the list items themselves can be any HTML
 * element.
 *
 * Using the List and Item components make it easy to support various
 * interaction modes such as swipe to edit, drag to reorder, and removing items.
 * @demo /docs/v2/demos/list/
 * @see {@link /docs/v2/components#lists List Component Docs}
 *
 */
var List = (function (_super) {
    __extends(List, _super);
    function List(elementRef, zone) {
        _super.call(this, elementRef);
        this.zone = zone;
        this._enableSliding = false;
        this.ele = elementRef.nativeElement;
    }
    /**
     * @private
     */
    List.prototype.ngOnInit = function () {
        if (util_1.isDefined(this.virtual)) {
            void 0;
            void 0;
            void 0;
            this._initVirtualScrolling();
        }
    };
    /**
     * @private
     */
    List.prototype.ngOnDestroy = function () {
        this.ele = null;
        this.slidingGesture && this.slidingGesture.unlisten();
    };
    /**
     * @private
     */
    List.prototype._initVirtualScrolling = function () {
        if (!this.content) {
            return;
        }
        this._virtualScrollingManager = new virtual_1.ListVirtualScroll(this);
    };
    /**
     * @private
     */
    List.prototype.setItemTemplate = function (item) {
        this.itemTemplate = item;
    };
    /**
     * Enable sliding items if your page has them
     *
     * ```ts
     * export class MyClass {
     *    constructor(app: IonicApp){
     *      this.app = app;
     *      this.list = this.app.getComponent('my-list');
     *    }
     *    stopSliding(){
     *      this.list.enableSlidingItems(false);
     *    }
     * }
     * ```
     * @param {Boolean} shouldEnable whether the item-sliding should be enabled or not
     */
    List.prototype.enableSlidingItems = function (shouldEnable) {
        var _this = this;
        if (this._enableSliding !== shouldEnable) {
            this._enableSliding = shouldEnable;
            if (shouldEnable) {
                void 0;
                this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.slidingGesture = new item_sliding_gesture_1.ItemSlidingGesture(_this, _this.ele);
                    });
                });
            }
            else {
                this.slidingGesture && this.slidingGesture.unlisten();
            }
        }
    };
    /**
     * Enable sliding items if your page has
     *
     * ```ts
     * export class MyClass {
     *    constructor(app: IonicApp){
     *      this.app = app;
     *      this.list = this.app.getComponent('my-list');
     *    }
     *    // Here we have some method that will close the items
     *    // when called
     *    closeItmes(){
     *      this.list.closeSlidingItems();
     *    }
     * }
     * ```
     */
    List.prototype.closeSlidingItems = function () {
        this.slidingGesture && this.slidingGesture.closeOpened();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], List.prototype, "items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], List.prototype, "virtual", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], List.prototype, "content", void 0);
    List = __decorate([
        core_1.Directive({
            selector: 'ion-list'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], List);
    return List;
})(ion_1.Ion);
exports.List = List;
/**
 * @private
 */
var ListHeader = (function () {
    function ListHeader(_renderer, _elementRef, id) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._id = id;
    }
    Object.defineProperty(ListHeader.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'id', val);
        },
        enumerable: true,
        configurable: true
    });
    ListHeader = __decorate([
        core_1.Directive({
            selector: 'ion-list-header'
        }),
        __param(2, core_1.Attribute('id')), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, String])
    ], ListHeader);
    return ListHeader;
})();
exports.ListHeader = ListHeader;
