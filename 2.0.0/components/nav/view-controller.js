var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var nav_params_1 = require('./nav-params');
/**
 * @name ViewController
 * @description
 * Access various features and information about the current view
 * @usage
 *  ```ts
 *  import {Page, ViewController} from 'ionic/ionic';
 *  @Page....
 *  export class MyPage{
 *   constructor(viewCtrl: ViewController){
 *     this.viewCtrl = viewCtrl;
 *   }
 *  }
 *  ```
 */
var ViewController = (function () {
    function ViewController(componentType, data) {
        if (data === void 0) { data = {}; }
        this.componentType = componentType;
        this.data = data;
        this._destroys = [];
        this._hdAttr = null;
        this._leavingOpts = null;
        this._loaded = false;
        this._onDismiss = null;
        /**
         * @private
         */
        this.instance = {};
        /**
         * @private
         */
        this.state = '';
        /**
         * @private
         */
        this.viewType = '';
        this._emitter = new core_1.EventEmitter();
    }
    ViewController.prototype.subscribe = function (callback) {
        this._emitter.subscribe(callback);
    };
    /**
     * @private
     */
    ViewController.prototype.emit = function (data) {
        this._emitter.emit(data);
    };
    ViewController.prototype.onDismiss = function (callback) {
        this._onDismiss = callback;
    };
    ViewController.prototype.dismiss = function (data) {
        this._onDismiss && this._onDismiss(data);
        return this._nav.remove(this._nav.indexOf(this), 1, this._leavingOpts);
    };
    /**
     * @private
     */
    ViewController.prototype.setNav = function (navCtrl) {
        this._nav = navCtrl;
    };
    /**
     * @private
     */
    ViewController.prototype.getTransitionName = function (direction) {
        return this._nav && this._nav.config.get('pageTransition');
    };
    /**
     * @private
     */
    ViewController.prototype.getNavParams = function () {
        return new nav_params_1.NavParams(this.data);
    };
    /**
     * @private
     */
    ViewController.prototype.setLeavingOpts = function (opts) {
        this._leavingOpts = opts;
    };
    /**
     * Check to see if you can go back in the navigation stack
     * @param {boolean} Check whether or not you can go back from this page
     * @returns {boolean} Returns if it's possible to go back from this Page.
     */
    ViewController.prototype.enableBack = function () {
        // update if it's possible to go back from this nav item
        if (this._nav) {
            var previousItem = this._nav.getPrevious(this);
            // the previous view may exist, but if it's about to be destroyed
            // it shouldn't be able to go back to
            return !!(previousItem);
        }
        return false;
    };
    /**
     * @private
     */
    ViewController.prototype.setInstance = function (instance) {
        this.instance = instance;
    };
    Object.defineProperty(ViewController.prototype, "name", {
        /**
         * @private
         */
        get: function () {
            return this.componentType ? this.componentType['name'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "index", {
        /**
         * You can find out the index of the current view is in the current navigation stack
         *
         * ```typescript
         *  export class Page1 {
         *    constructor(view: ViewController){
         *      this.view = view;
         *      // Just log out the index
         *      console.log(this.view.index);
         *    }
         *  }
         * ```
         *
         * @returns {number} Returns the index of this page within its NavController.
         */
        get: function () {
            return (this._nav ? this._nav.indexOf(this) : -1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns {boolean} Returns if this Page is the root page of the NavController.
     */
    ViewController.prototype.isRoot = function () {
        return (this.index === 0);
    };
    /**
     * @private
     */
    ViewController.prototype.addDestroy = function (destroyFn) {
        this._destroys.push(destroyFn);
    };
    /**
     * @private
     */
    ViewController.prototype.destroy = function () {
        for (var i = 0; i < this._destroys.length; i++) {
            this._destroys[i]();
        }
        this._destroys = [];
    };
    /**
     * @private
     */
    ViewController.prototype.domCache = function (shouldShow, renderer) {
        // using hidden element attribute to display:none and not render views
        // renderAttr of '' means the hidden attribute will be added
        // renderAttr of null means the hidden attribute will be removed
        // doing checks to make sure we only make an update to the element when needed
        if (this._pgRef &&
            (shouldShow && this._hdAttr === '' ||
                !shouldShow && this._hdAttr !== '')) {
            this._hdAttr = (shouldShow ? null : '');
            renderer.setElementAttribute(this._pgRef.nativeElement, 'hidden', this._hdAttr);
            var navbarRef = this.navbarRef();
            if (navbarRef) {
                renderer.setElementAttribute(navbarRef.nativeElement, 'hidden', this._hdAttr);
            }
        }
    };
    /**
     * @private
     */
    ViewController.prototype.setZIndex = function (zIndex, renderer) {
        if (this._pgRef && zIndex !== this.zIndex) {
            this.zIndex = zIndex;
            renderer.setElementStyle(this._pgRef.nativeElement, 'z-index', zIndex.toString());
        }
    };
    /**
     * @private
     */
    ViewController.prototype.setNavbarTemplateRef = function (templateRef) {
        this._nbTmpRef = templateRef;
    };
    /**
     * @private
     */
    ViewController.prototype.getNavbarTemplateRef = function () {
        return this._nbTmpRef;
    };
    /**
     * @private
     */
    ViewController.prototype.getNavbarViewRef = function () {
        return this._nbVwRef;
    };
    /**
     * @private
     */
    ViewController.prototype.setNavbarViewRef = function (viewContainerRef) {
        this._nbVwRef = viewContainerRef;
    };
    /**
     * @private
     */
    ViewController.prototype.setPageRef = function (elementRef) {
        this._pgRef = elementRef;
    };
    /**
     * @private
     * @returns {ElementRef} Returns the Page's ElementRef
     */
    ViewController.prototype.pageRef = function () {
        return this._pgRef;
    };
    /**
     * @private
     */
    ViewController.prototype.setContentRef = function (elementRef) {
        this._cntRef = elementRef;
    };
    /**
     * @private
     * @returns {ElementRef} Returns the Page's Content ElementRef
     */
    ViewController.prototype.contentRef = function () {
        return this._cntRef;
    };
    /**
     * @private
     */
    ViewController.prototype.setContent = function (directive) {
        this._cntDir = directive;
    };
    /**
     * @private
     * @returns {Component} Returns the Page's Content component reference.
     */
    ViewController.prototype.getContent = function () {
        return this._cntDir;
    };
    /**
     * @private
     */
    ViewController.prototype.setNavbar = function (directive) {
        this._nbDir = directive;
    };
    /**
     * @private
     */
    ViewController.prototype.getNavbar = function () {
        return this._nbDir;
    };
    /**
     * You can find out of the current view has a Navbar or not. Be sure to wrap this in an `onPageWillEnter` method in order to make sure the view has rendered fully.
     *
     * ```typescript
     * export class Page1 {
     *  constructor(view: ViewController) {
     *    this.view = view
     *  }
     *  onPageWillEnter(){
     *    console.log('Do we have a Navbar?', this.view.hasNavbar());
     *  }
     *}
     * ```
     *
     * @returns {boolean} Returns a boolean if this Page has a navbar or not.
     */
    ViewController.prototype.hasNavbar = function () {
        return !!this.getNavbar();
    };
    /**
     * @private
     */
    ViewController.prototype.navbarRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getElementRef();
    };
    /**
     * @private
     */
    ViewController.prototype.titleRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getTitleRef();
    };
    /**
     * @private
     */
    ViewController.prototype.navbarItemRefs = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getItemRefs();
    };
    /**
     * @private
     */
    ViewController.prototype.backBtnRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getBackButtonRef();
    };
    /**
     * @private
     */
    ViewController.prototype.backBtnTextRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getBackButtonTextRef();
    };
    /**
     * @private
     */
    ViewController.prototype.navbarBgRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getBackgroundRef();
    };
    /**
     * You can change the text of the back button on a view-by-view basis.
     *
     * ```ts
     * export class MyClass{
     *  constructor(viewCtrl: ViewController){
     *    this.viewCtrl = viewCtrl
     *  }
     *  onPageWillEnter() {
     *    this.viewCtrl.setBackButtonText('Previous');
     *  }
     * }
     * ```
     * Make sure you use the view events when calling this method, otherwise the back-button will not have been created
     *
     * @param {string} backButtonText Set the back button text.
     */
    ViewController.prototype.setBackButtonText = function (val) {
        var navbar = this.getNavbar();
        if (navbar) {
            navbar.setBackButtonText(val);
        }
    };
    /**
     * Set if the back button for the current view is visible or not. Be sure to wrap this in `onPageWillEnter` to make sure the has been compleltly rendered.
     * @param {boolean} Set if this Page's back button should show or not.
     */
    ViewController.prototype.showBackButton = function (shouldShow) {
        var navbar = this.getNavbar();
        if (navbar) {
            navbar.hideBackButton = !shouldShow;
        }
    };
    /**
     * @private
     */
    ViewController.prototype.isLoaded = function () {
        return this._loaded;
    };
    /**
     * @private
     * The view has loaded. This event only happens once per view being
     * created. If a view leaves but is cached, then this will not
     * fire again on a subsequent viewing. This method is a good place
     * to put your setup code for the view; however, it is not the
     * recommended method to use when a view becomes active.
     */
    ViewController.prototype.loaded = function () {
        this._loaded = true;
        ctrlFn(this, 'onPageLoaded');
    };
    /**
     * @private
     * The view is about to enter and become the active view.
     */
    ViewController.prototype.willEnter = function () {
        ctrlFn(this, 'onPageWillEnter');
    };
    /**
     * @private
     * The view has fully entered and is now the active view. This
     * will fire, whether it was the first load or loaded from the cache.
     */
    ViewController.prototype.didEnter = function () {
        var navbar = this.getNavbar();
        navbar && navbar.didEnter();
        ctrlFn(this, 'onPageDidEnter');
    };
    /**
     * @private
     * The view has is about to leave and no longer be the active view.
     */
    ViewController.prototype.willLeave = function () {
        ctrlFn(this, 'onPageWillLeave');
    };
    /**
     * @private
     * The view has finished leaving and is no longer the active view. This
     * will fire, whether it is cached or unloaded.
     */
    ViewController.prototype.didLeave = function () {
        ctrlFn(this, 'onPageDidLeave');
    };
    /**
     * @private
     * The view is about to be destroyed and have its elements removed.
     */
    ViewController.prototype.willUnload = function () {
        ctrlFn(this, 'onPageWillUnload');
    };
    /**
     * @private
     * The view has been destroyed and its elements have been removed.
     */
    ViewController.prototype.didUnload = function () {
        ctrlFn(this, 'onPageDidUnload');
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ViewController.prototype, "_emitter", void 0);
    return ViewController;
})();
exports.ViewController = ViewController;
function ctrlFn(viewCtrl, fnName) {
    if (viewCtrl.instance && viewCtrl.instance[fnName]) {
        try {
            viewCtrl.instance[fnName]();
        }
        catch (e) {
            void 0;
        }
    }
}
