import { ElementRef, NgZone } from 'angular2/core';
import { Ion } from '../ion';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { ViewController } from '../nav/view-controller';
/**
 * @name Content
 * @description
 * The Content component provides an easy to use content area that can be configured to use Ionic's custom Scroll View, or the built in overflow scrolling of the browser.
 *
 * While we recommend using the custom Scroll features in Ionic in most cases, sometimes (for performance reasons) only the browser's native overflow scrolling will suffice, and so we've made it easy to toggle between the Ionic scroll implementation and overflow scrolling.
 *
 * You can implement pull-to-refresh with the [Refresher](../../scroll/Refresher) component.
 *
 * @usage
 * ```html
 * <ion-content id="myContent">
 *   Add your content here!
 * </ion-content>
 * ```
 *
 */
export declare class Content extends Ion {
    private _elementRef;
    private _config;
    private _app;
    private _zone;
    private _padding;
    private _onScroll;
    private _scrollTo;
    scrollElement: HTMLElement;
    /**
     * @param {ElementRef} elementRef  A reference to the component's DOM element.
     * @param {Config} config  The config object to change content's default settings.
     */
    constructor(_elementRef: ElementRef, _config: Config, _app: IonicApp, _zone: NgZone, viewCtrl: ViewController);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
    /**
     * Adds the specified scroll handler to the content' scroll element.
     *
     * ```ts
     * @Page({
     *   template: `<ion-content id="my-content"></ion-content>`
     * )}
     * export class MyPage{
     *    constructor(app: IonicApp){
     *        this.app = app;
     *    }
     *   // Need to wait until the component has been initialized
     *   ngAfterViewInit() {
     *     // Here 'my-content' is the ID of my ion-content
     *     this.content = this.app.getComponent('my-content');
     *     this.content.addScrollEventListener(this.myScroll);
     *   }
     *     myScroll() {
     *      console.info('They see me scrolling...');
     *    }
     * }
     * ```
     * @param {Function} handler  The method you want perform when scrolling
     * @returns {Function} A function that removes the scroll handler.
     */
    addScrollEventListener(handler: any): () => void;
    onScrollEnd(callback: any): void;
    /**
     * @private
     * Adds the specified touchmove handler to the content's scroll element.
     *
     * ```ts
     * @Page({
     *   template: `<ion-content id="my-content"></ion-content>`
     * )}
     * export class MyPage{
     *    constructor(app: IonicApp){
     *        this.app = app;
     *    }
     *   // Need to wait until the component has been initialized
     *   ngAfterViewInit() {
     *     // Here 'my-content' is the ID of my ion-content
     *     this.content = this.app.getComponent('my-content');
     *     this.content.addTouchMoveListener(this.touchHandler);
     *   }
     *    touchHandler() {
     *      console.log("I'm touching all the magazines!!");
     *    }
     * }
     * ```
     * @param {Function} handler  The method you want to perform when touchmove is firing
     * @returns {Function} A function that removes the touchmove handler.
     */
    addTouchMoveListener(handler: any): () => void;
    /**
     * Scroll to the specified position.
     *
     * ```ts
     * @Page({
     *   template: `<ion-content id="my-content">
     *      <button (click)="scrollTo()"> Down 500px</button>
     *   </ion-content>`
     * )}
     * export class MyPage{
     *    constructor(app: IonicApp){
     *        this.app = app;
     *    }
     *   // Need to wait until the component has been initialized
     *   ngAfterViewInit() {
     *     // Here 'my-content' is the ID of my ion-content
     *     this.content = this.app.getComponent('my-content');
     *   }
     *    scrollTo() {
     *      this.content.scrollTo(0, 500, 200);
     *    }
     * }
     * ```
     * @param {Number} x  The x-value to scroll to.
     * @param {Number} y  The y-value to scroll to.
     * @param {Number} duration  Duration of the scroll animation in ms.
     * @param {TODO} tolerance  TODO
     * @returns {Promise} Returns a promise when done
     */
    scrollTo(x: number, y: number, duration: number, tolerance?: number): Promise<any>;
    /**
     * Scroll to the specified position.
     *
     * ```ts
     * @Page({
     *   template: `<ion-content id="my-content">
     *      <button (click)="scrollTop()"> Down 500px</button>
     *   </ion-content>`
     * )}
     * export class MyPage{
     *    constructor(app: IonicApp){
     *        this.app = app;
     *    }
     *   // Need to wait until the component has been initialized
     *   ngAfterViewInit() {
     *     // Here 'my-content' is the ID of my ion-content
     *     this.content = this.app.getComponent('my-content');
     *   }
     *    scrollTop() {
     *      this.content.scrollTop();
     *    }
     * }
     * ```
     * @returns {Promise} Returns a promise when done
     */
    scrollToTop(): Promise<any>;
    /**
     * @private
     * Returns the content and scroll elements' dimensions.
     * @returns {Object} dimensions  The content and scroll elements' dimensions
     * {Number} dimensions.contentHeight  content offsetHeight
     * {Number} dimensions.contentTop  content offsetTop
     * {Number} dimensions.contentBottom  content offsetTop+offsetHeight
     * {Number} dimensions.contentWidth  content offsetWidth
     * {Number} dimensions.contentLeft  content offsetLeft
     * {Number} dimensions.contentRight  content offsetLeft + offsetWidth
     * {Number} dimensions.scrollHeight  scroll scrollHeight
     * {Number} dimensions.scrollTop  scroll scrollTop
     * {Number} dimensions.scrollBottom  scroll scrollTop + scrollHeight
     * {Number} dimensions.scrollWidth  scroll scrollWidth
     * {Number} dimensions.scrollLeft  scroll scrollLeft
     * {Number} dimensions.scrollRight  scroll scrollLeft + scrollWidth
     */
    getContentDimensions(): {
        contentHeight: number;
        contentTop: number;
        contentBottom: number;
        contentWidth: number;
        contentLeft: number;
        contentRight: number;
        scrollHeight: number;
        scrollTop: number;
        scrollBottom: number;
        scrollWidth: number;
        scrollLeft: number;
        scrollRight: number;
    };
    /**
     * @private
     * Adds padding to the bottom of the scroll element when the keyboard is open
     * so content below the keyboard can be scrolled into view.
     */
    addScrollPadding(newPadding: any): void;
}
