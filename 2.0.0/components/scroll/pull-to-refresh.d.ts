import { ElementRef } from 'angular2/core';
import { Content } from '../content/content';
/**
 * @name Refresher
 * @description
 * Allows you to add pull-to-refresh to an Content component.
 * Place it as the first child of your Content or Scroll element.
 *
 * When refreshing is complete, call `refresher.complete()` from your controller.
 *
 *  @usage
 *  ```html
 *  <ion-content>
 *    <ion-refresher (starting)="doStarting()"
 *                   (refresh)="doRefresh($event, refresher)"
 *                   (pulling)="doPulling($event, amt)">
 *    </ion-refresher>
 *
 *  </ion-content>

 *  ```
 *
 *  ```ts
 *  export class MyClass {
 *  constructor(){}
 *    doRefresh(refresher) {
 *      console.log('Refreshing!', refresher);
 *
 *      setTimeout(() => {
 *        console.log('Pull to refresh complete!', refresher);
 *        refresher.complete();
 *      })
 *    }
 *
 *    doStarting() {
 *      console.log('Pull started!');
 *    }
 *
 *    doPulling(amt) {
 *      console.log('You have pulled', amt);
 *    }
 *  }
 *  ```
 *  @demo /docs/v2/demos/refresher/
 *
 *  @property {string} [pullingIcon] - the icon you want to display when you begin to pull down
 *  @property {string} [pullingText] - the text you want to display when you begin to pull down
 *  @property {string} [refreshingIcon] - the icon you want to display when performing a refresh
 *  @property {string} [refreshingText] - the text you want to display when performing a refresh
 *
 *  @property {any} (refresh) - the methond on your class you want to perform when you refreshing
 *  @property {any} (starting) - the methond on your class you want to perform when you start pulling down
 *  @property {any} (pulling) - the methond on your class you want to perform when you are pulling down
 *
 */
export declare class Refresher {
    /**
     * @private
     * @param {Content} content  TODO
     * @param {ElementRef} elementRef  TODO
     */
    constructor(content: Content, element: ElementRef);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     * Initialize touch and scroll event listeners.
     */
    initEvents(): void;
    /**
     * @private
     */
    onDehydrate(): void;
    /**
     * @private
     * @param {TODO} val  TODO
     */
    overscroll(val: any): void;
    /**
     * @private
     * @param {TODO} target  TODO
     * @param {TODO} newScrollTop  TODO
     */
    nativescroll(target: any, newScrollTop: any): void;
    /**
     * @private
     * @param {TODO} enabled  TODO
     */
    setScrollLock(enabled: any): void;
    /**
     * @private
     */
    activate(): void;
    /**
     * @private
     */
    deactivate(): void;
    /**
     * @private
     */
    start(): void;
    /**
     * @private
     */
    show(): void;
    /**
     * @private
     */
    hide(): void;
    /**
     * @private
     */
    tail(): void;
    /**
     * @private
     */
    complete(): void;
    /**
     * @private
     * @param {TODO} Y  TODO
     * @param {TODO} duration  TODO
     * @param {Function} callback  TODO
     */
    scrollTo(Y: any, duration: any, callback: any): void;
    /**
     * @private
     * TODO
     * @param {Event} e  TODO
     */
    _handleTouchMove(e: any): void;
    /**
     * @private
     * TODO
     * @param {Event} e  TODO
     */
    _handleTouchEnd(e: any): void;
    /**
     * @private
     * TODO
     * @param {Event} e  TODO
     */
    _handleScroll(e: any): void;
}
