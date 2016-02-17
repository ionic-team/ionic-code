import { ElementRef, Renderer, NgZone } from 'angular2/core';
import { Ion } from '../ion';
import { ItemSlidingGesture } from '../item/item-sliding-gesture';
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
export declare class List extends Ion {
    private zone;
    private _enableSliding;
    private _virtualScrollingManager;
    ele: HTMLElement;
    itemTemplate: any;
    slidingGesture: ItemSlidingGesture;
    items: any;
    virtual: any;
    content: any;
    constructor(elementRef: ElementRef, zone: NgZone);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
    /**
     * @private
     */
    _initVirtualScrolling(): void;
    /**
     * @private
     */
    setItemTemplate(item: any): void;
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
    enableSlidingItems(shouldEnable: boolean): void;
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
    closeSlidingItems(): void;
}
/**
 * @private
 */
export declare class ListHeader {
    private _renderer;
    private _elementRef;
    private _id;
    constructor(_renderer: Renderer, _elementRef: ElementRef, id: string);
    id: string;
}
