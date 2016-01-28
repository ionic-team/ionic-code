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
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var dom_1 = require('../../util/dom');
var view_controller_1 = require('../nav/view-controller');
var scroll_to_1 = require('../../animations/scroll-to');
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
var Content = (function (_super) {
    __extends(Content, _super);
    /**
     * @param {ElementRef} elementRef  A reference to the component's DOM element.
     * @param {Config} config  The config object to change content's default settings.
     */
    function Content(_elementRef, _config, _app, _zone, viewCtrl) {
        _super.call(this, _elementRef);
        this._elementRef = _elementRef;
        this._config = _config;
        this._app = _app;
        this._zone = _zone;
        this._padding = 0;
        if (viewCtrl) {
            viewCtrl.setContent(this);
            viewCtrl.setContentRef(_elementRef);
        }
    }
    /**
     * @private
     */
    Content.prototype.ngOnInit = function () {
        var self = this;
        self.scrollElement = self._elementRef.nativeElement.children[0];
        self._onScroll = function (ev) {
            self._app.setScrolling();
        };
        if (self._config.get('tapPolyfill') === true) {
            self._zone.runOutsideAngular(function () {
                self.scrollElement.addEventListener('scroll', self._onScroll);
            });
        }
    };
    /**
     * @private
     */
    Content.prototype.ngOnDestroy = function () {
        this.scrollElement.removeEventListener('scroll', this._onScroll);
    };
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
    Content.prototype.addScrollEventListener = function (handler) {
        var _this = this;
        if (!this.scrollElement) {
            return;
        }
        // ensure we're not creating duplicates
        this.scrollElement.removeEventListener('scroll', handler);
        this.scrollElement.addEventListener('scroll', handler);
        return function () {
            _this.scrollElement.removeEventListener('scroll', handler);
        };
    };
    Content.prototype.onScrollEnd = function (callback) {
        var lastScrollTop = null;
        var framesUnchanged = 0;
        var _scrollEle = this.scrollElement;
        function next() {
            var currentScrollTop = _scrollEle.scrollTop;
            if (lastScrollTop !== null) {
                if (Math.round(lastScrollTop) === Math.round(currentScrollTop)) {
                    framesUnchanged++;
                }
                else {
                    framesUnchanged = 0;
                }
                if (framesUnchanged > 9) {
                    return callback();
                }
            }
            lastScrollTop = currentScrollTop;
            dom_1.raf(function () {
                dom_1.raf(next);
            });
        }
        setTimeout(next, 100);
    };
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
    Content.prototype.addTouchMoveListener = function (handler) {
        var _this = this;
        if (!this.scrollElement) {
            return;
        }
        // ensure we're not creating duplicates
        this.scrollElement.removeEventListener('touchmove', handler);
        this.scrollElement.addEventListener('touchmove', handler);
        return function () {
            _this.scrollElement.removeEventListener('touchmove', handler);
        };
    };
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
    Content.prototype.scrollTo = function (x, y, duration, tolerance) {
        if (this._scrollTo) {
            this._scrollTo.dispose();
        }
        this._scrollTo = new scroll_to_1.ScrollTo(this.scrollElement);
        return this._scrollTo.start(x, y, duration, tolerance);
    };
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
    Content.prototype.scrollToTop = function () {
        if (this._scrollTo) {
            this._scrollTo.dispose();
        }
        this._scrollTo = new scroll_to_1.ScrollTo(this.scrollElement);
        return this._scrollTo.start(0, 0, 300, 0);
    };
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
    Content.prototype.getContentDimensions = function () {
        var _scrollEle = this.scrollElement;
        var parentElement = _scrollEle.parentElement;
        return {
            contentHeight: parentElement.offsetHeight,
            contentTop: parentElement.offsetTop,
            contentBottom: parentElement.offsetTop + parentElement.offsetHeight,
            contentWidth: parentElement.offsetWidth,
            contentLeft: parentElement.offsetLeft,
            contentRight: parentElement.offsetLeft + parentElement.offsetWidth,
            scrollHeight: _scrollEle.scrollHeight,
            scrollTop: _scrollEle.scrollTop,
            scrollBottom: _scrollEle.scrollTop + _scrollEle.scrollHeight,
            scrollWidth: _scrollEle.scrollWidth,
            scrollLeft: _scrollEle.scrollLeft,
            scrollRight: _scrollEle.scrollLeft + _scrollEle.scrollWidth,
        };
    };
    /**
     * @private
     * Adds padding to the bottom of the scroll element when the keyboard is open
     * so content below the keyboard can be scrolled into view.
     */
    Content.prototype.addScrollPadding = function (newPadding) {
        if (newPadding > this._padding) {
            void 0;
            this._padding = newPadding;
            this.scrollElement.style.paddingBottom = newPadding + 'px';
        }
    };
    Content = __decorate([
        core_1.Component({
            selector: 'ion-content',
            template: '<scroll-content>' +
                '<ng-content></ng-content>' +
                '</scroll-content>'
        }),
        __param(4, core_1.Optional()), 
        __metadata('design:paramtypes', [core_1.ElementRef, config_1.Config, app_1.IonicApp, core_1.NgZone, view_controller_1.ViewController])
    ], Content);
    return Content;
})(ion_1.Ion);
exports.Content = Content;
