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
var common_1 = require('angular2/common');
var content_1 = require('../content/content');
var icon_1 = require('../icon/icon');
var util_1 = require('../../util/util');
var dom_1 = require('../../util/dom');
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
var Refresher = (function () {
    function Refresher(content, element) {
        this.content = content;
        this.isDragging = false;
        this.isOverscrolling = false;
        this.dragOffset = 0;
        this.lastOverscroll = 0;
        this.ptrThreshold = 0;
        this.activated = false;
        this.scrollTime = 500;
        this.canOverscroll = true;
        this.pulling = new core_1.EventEmitter();
        this.refresh = new core_1.EventEmitter();
        this.starting = new core_1.EventEmitter();
        this.ele = element.nativeElement;
        this.ele.classList.add('content');
    }
    /**
     * @private
     */
    Refresher.prototype.ngOnInit = function () {
        var sp = this.content.getNativeElement();
        var sc = this.content.scrollElement;
        this.startY = null;
        this.deltaY = null;
        this.scrollHost = sp;
        this.scrollChild = sc;
        util_1.defaults(this, {
            pullingIcon: 'md-arrow-down',
            refreshingIcon: 'ionic'
        });
        this.showSpinner = !util_1.isDefined(this.refreshingIcon) && this.spinner != 'none';
        this.showIcon = util_1.isDefined(this.refreshingIcon);
        this._touchMoveListener = this._handleTouchMove.bind(this);
        this._touchEndListener = this._handleTouchEnd.bind(this);
        this._handleScrollListener = this._handleScroll.bind(this);
        sc.addEventListener('touchmove', this._touchMoveListener);
        sc.addEventListener('touchend', this._touchEndListener);
        sc.addEventListener('scroll', this._handleScrollListener);
    };
    /**
     * @private
     */
    Refresher.prototype.ngOnDestroy = function () {
        var sc = this.content.scrollElement;
        sc.removeEventListener('touchmove', this._touchMoveListener);
        sc.removeEventListener('touchend', this._touchEndListener);
        sc.removeEventListener('scroll', this._handleScrollListener);
    };
    /**
     * @private
     * @param {TODO} val  TODO
     */
    Refresher.prototype.overscroll = function (val) {
        this.scrollChild.style[dom_1.CSS.transform] = 'translateY(' + val + 'px)';
        this.lastOverscroll = val;
    };
    /**
     * @private
     * @param {TODO} target  TODO
     * @param {TODO} newScrollTop  TODO
     */
    Refresher.prototype.nativescroll = function (target, newScrollTop) {
        // creates a scroll event that bubbles, can be cancelled, and with its view
        // and detail property initialized to window and 1, respectively
        target.scrollTop = newScrollTop;
        var e = document.createEvent("UIEvents");
        e.initUIEvent("scroll", true, true, window, 1);
        target.dispatchEvent(e);
    };
    /**
     * @private
     * @param {TODO} enabled  TODO
     */
    Refresher.prototype.setScrollLock = function (enabled) {
        var _this = this;
        // set the scrollbar to be position:fixed in preparation to overscroll
        // or remove it so the app can be natively scrolled
        if (enabled) {
            dom_1.raf(function () {
                _this.scrollChild.classList.add('overscroll');
                _this.show();
            });
        }
        else {
            dom_1.raf(function () {
                _this.scrollChild.classList.remove('overscroll');
                _this.hide();
                _this.deactivate();
            });
        }
    };
    /**
     * @private
     */
    Refresher.prototype.activate = function () {
        //this.ele.classList.add('active');
        this.isActive = true;
        //this.starting.next();
    };
    /**
     * @private
     */
    Refresher.prototype.deactivate = function () {
        var _this = this;
        // give tail 150ms to finish
        setTimeout(function () {
            _this.isActive = false;
            _this.isRefreshing = false;
            _this.isRefreshingTail = false;
            // deactivateCallback
            if (_this.activated)
                _this.activated = false;
        }, 150);
    };
    /**
     * @private
     */
    Refresher.prototype.start = function () {
        // startCallback
        this.isRefreshing = true;
        this.refresh.next(this);
        //$scope.$onRefresh();
    };
    /**
     * @private
     */
    Refresher.prototype.show = function () {
        // showCallback
        this.ele.classList.remove('invisible');
    };
    /**
     * @private
     */
    Refresher.prototype.hide = function () {
        // showCallback
        this.ele.classList.add('invisible');
    };
    /**
     * @private
     */
    Refresher.prototype.tail = function () {
        // tailCallback
        this.ele.classList.add('refreshing-tail');
    };
    /**
     * @private
     */
    Refresher.prototype.complete = function () {
        var _this = this;
        setTimeout(function () {
            dom_1.raf(_this.tail.bind(_this));
            // scroll back to home during tail animation
            _this.scrollTo(0, _this.scrollTime, _this.deactivate.bind(_this));
            // return to native scrolling after tail animation has time to finish
            setTimeout(function () {
                if (_this.isOverscrolling) {
                    _this.isOverscrolling = false;
                    _this.setScrollLock(false);
                }
            }, _this.scrollTime);
        }, this.scrollTime);
    };
    /**
     * @private
     * @param {TODO} Y  TODO
     * @param {TODO} duration  TODO
     * @param {Function} callback  TODO
     */
    Refresher.prototype.scrollTo = function (Y, duration, callback) {
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        var start = Date.now(), from = this.lastOverscroll;
        if (from === Y) {
            callback && callback();
            return; /* Prevent scrolling to the Y point if already there */
        }
        // decelerating to zero velocity
        function easeOutCubic(t) {
            return (--t) * t * t + 1;
        }
        // scroll loop
        function scroll() {
            var currentTime = Date.now(), time = Math.min(1, ((currentTime - start) / duration)), 
            // where .5 would be 50% of time on a linear scale easedT gives a
            // fraction based on the easing method
            easedT = easeOutCubic(time);
            this.overscroll(Math.round((easedT * (Y - from)) + from));
            if (time < 1) {
                dom_1.raf(scroll.bind(this));
            }
            else {
                if (Y < 5 && Y > -5) {
                    this.isOverscrolling = false;
                    this.setScrollLock(false);
                }
                callback && callback();
            }
        }
        // start scroll loop
        dom_1.raf(scroll.bind(this));
    };
    /**
     * @private
     * TODO
     * @param {Event} e  TODO
     */
    Refresher.prototype._handleTouchMove = function (e) {
        //console.log('TOUCHMOVE', e);
        // if multitouch or regular scroll event, get out immediately
        if (!this.canOverscroll || e.touches.length > 1) {
            return;
        }
        //if this is a new drag, keep track of where we start
        if (this.startY === null) {
            this.startY = parseInt(e.touches[0].screenY, 10);
        }
        // how far have we dragged so far?
        this.deltaY = parseInt(e.touches[0].screenY, 10) - this.startY;
        // if we've dragged up and back down in to native scroll territory
        if (this.deltaY - this.dragOffset <= 0 || this.scrollHost.scrollTop !== 0) {
            if (this.isOverscrolling) {
                this.isOverscrolling = false;
                this.setScrollLock(false);
            }
            if (this.isDragging) {
                this.nativescroll(this.scrollHost, Math.round(this.deltaY - this.dragOffset) * -1);
            }
            // if we're not at overscroll 0 yet, 0 out
            if (this.lastOverscroll !== 0) {
                this.overscroll(0);
            }
            return;
        }
        else if (this.deltaY > 0 && this.scrollHost.scrollTop === 0 && !this.isOverscrolling) {
            // starting overscroll, but drag started below scrollTop 0, so we need to offset the position
            this.dragOffset = this.deltaY;
        }
        // prevent native scroll events while overscrolling
        e.preventDefault();
        // if not overscrolling yet, initiate overscrolling
        if (!this.isOverscrolling) {
            this.isOverscrolling = true;
            this.setScrollLock(true);
        }
        this.isDragging = true;
        // overscroll according to the user's drag so far
        this.overscroll(Math.round((this.deltaY - this.dragOffset) / 3));
        // Pass an incremental pull amount to the EventEmitter
        this.pulling.next(this.lastOverscroll);
        // update the icon accordingly
        if (!this.activated && this.lastOverscroll > this.ptrThreshold) {
            this.activated = true;
            dom_1.raf(this.activate.bind(this));
        }
        else if (this.activated && this.lastOverscroll < this.ptrThreshold) {
            this.activated = false;
            dom_1.raf(this.deactivate.bind(this));
        }
    };
    /**
     * @private
     * TODO
     * @param {Event} e  TODO
     */
    Refresher.prototype._handleTouchEnd = function (e) {
        void 0;
        // if this wasn't an overscroll, get out immediately
        if (!this.canOverscroll && !this.isDragging) {
            return;
        }
        // reset Y
        this.startY = null;
        // the user has overscrolled but went back to native scrolling
        if (!this.isDragging) {
            this.dragOffset = 0;
            this.isOverscrolling = false;
            this.setScrollLock(false);
        }
        else {
            this.isDragging = false;
            this.dragOffset = 0;
            // the user has scroll far enough to trigger a refresh
            if (this.lastOverscroll > this.ptrThreshold) {
                this.start();
                this.scrollTo(this.ptrThreshold, this.scrollTime);
            }
            else {
                this.scrollTo(0, this.scrollTime, this.deactivate.bind(this));
                this.isOverscrolling = false;
            }
        }
    };
    /**
     * @private
     * TODO
     * @param {Event} e  TODO
     */
    Refresher.prototype._handleScroll = function (e) {
        void 0;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Refresher.prototype, "pullingIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Refresher.prototype, "pullingText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Refresher.prototype, "refreshingIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Refresher.prototype, "refreshingText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Refresher.prototype, "spinner", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Refresher.prototype, "pulling", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Refresher.prototype, "refresh", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Refresher.prototype, "starting", void 0);
    Refresher = __decorate([
        core_1.Component({
            selector: 'ion-refresher',
            host: {
                '[class.active]': 'isActive',
                '[class.refreshing]': 'isRefreshing',
                '[class.refreshingTail]': 'isRefreshingTail'
            },
            template: '<div class="refresher-content" [class.refresher-with-text]="pullingText || refreshingText">' +
                '<div class="icon-pulling">' +
                '<ion-icon [name]="pullingIcon"></ion-icon>' +
                '</div>' +
                '<div class="text-pulling" [innerHTML]="pullingText" *ngIf="pullingText"></div>' +
                '<div class="icon-refreshing">' +
                '<ion-icon [name]="refreshingIcon"></ion-icon>' +
                '</div>' +
                '<div class="text-refreshing" [innerHTML]="refreshingText" *ngIf="refreshingText"></div>' +
                '</div>',
            directives: [common_1.NgIf, common_1.NgClass, icon_1.Icon]
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [content_1.Content, core_1.ElementRef])
    ], Refresher);
    return Refresher;
})();
exports.Refresher = Refresher;
