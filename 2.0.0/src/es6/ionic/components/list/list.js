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
import { Directive, ElementRef, NgZone } from 'angular2/angular2';
import { Ion } from '../ion';
import { Config } from '../../config/config';
import { ListVirtualScroll } from './virtual';
import { ItemSlidingGesture } from '../item/item-sliding-gesture';
import * as util from 'ionic/util';
/**
 * The List is a widely used interface element in almost any mobile app, and can include
 * content ranging from basic text all the way to buttons, toggles, icons, and thumbnails.
 *
 * Both the list, which contains items, and the list items themselves can be any HTML
 * element.
 *
 * Using the List and Item components make it easy to support various
 * interaction modes such as swipe to edit, drag to reorder, and removing items.
 *
 */
export let List = class extends Ion {
    constructor(elementRef, config, zone) {
        super(elementRef, config);
        this.zone = zone;
        this.ele = elementRef.nativeElement;
        this._enableSliding = false;
    }
    /**
     * @private
     */
    onInit() {
        super.onInit();
        if (util.isDefined(this.virtual)) {
            console.log('Content', this.content);
            console.log('Virtual?', this.virtual);
            console.log('Items?', this.items.length, 'of \'em');
            this._initVirtualScrolling();
        }
    }
    /**
     * @private
     */
    onDestroy() {
        this.ele = null;
        this.slidingGesture && this.slidingGesture.unlisten();
    }
    /**
     * @private
     */
    _initVirtualScrolling() {
        if (!this.content) {
            return;
        }
        this._virtualScrollingManager = new ListVirtualScroll(this);
    }
    /**
     * @private
     */
    setItemTemplate(item) {
        this.itemTemplate = item;
    }
    enableSlidingItems(shouldEnable) {
        if (this._init) {
            if (this._enableSliding !== shouldEnable) {
                this._enableSliding = shouldEnable;
                if (shouldEnable) {
                    console.debug('enableSlidingItems');
                    this.zone.runOutsideAngular(() => {
                        setTimeout(() => {
                            this.slidingGesture = new ItemSlidingGesture(this, this.ele);
                        });
                    });
                }
                else {
                    this.slidingGesture && this.slidingGesture.unlisten();
                }
            }
        }
    }
    closeSlidingItems() {
        this.slidingGesture && this.slidingGesture.closeOpened();
    }
    /**
     * @private
     */
    afterViewInit() {
        this._init = true;
        if (this._enableSliding) {
            this.enableSlidingItems(true);
        }
    }
};
List = __decorate([
    Directive({
        selector: 'ion-list',
        inputs: [
            'items',
            'virtual',
            'content'
        ]
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object, (typeof (_c = typeof NgZone !== 'undefined' && NgZone) === 'function' && _c) || Object])
], List);
export let ListHeader = class {
};
ListHeader = __decorate([
    Directive({
        selector: 'ion-list-header',
        inputs: [
            'id'
        ],
        host: {
            '[attr.id]': 'id'
        }
    }), 
    __metadata('design:paramtypes', [])
], ListHeader);
var _a, _b, _c;