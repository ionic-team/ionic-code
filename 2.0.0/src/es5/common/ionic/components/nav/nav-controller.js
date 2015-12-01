'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x12, _x13, _x14) { var _again = true; _function: while (_again) { var object = _x12, property = _x13, receiver = _x14; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x12 = parent; _x13 = property; _x14 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _angular2Angular2 = require('angular2/angular2');

var _ion = require('../ion');

var _viewController = require('./view-controller');

var _animationsAnimation = require('../../animations/animation');

var _swipeBack = require('./swipe-back');

var _utilUtil = require('../../util/util');

var _utilDom = require('../../util/dom');

/**
 * _For examples on the basic usage of NavController, check out the
 * [Navigation section](../../../../components/#navigation) of the Component
 * docs._
 *
 * NavController is the base class for navigation controller components like
 * [`Nav`](../Nav/) and [`Tab`](../../Tabs/Tab/). You use navigation controllers
 * to navigate to [pages](#creating_pages) in your app. At a basic level, a
 * navigation controller is an array of pages representing a particular history
 * (of a Tab for example). This array can be manipulated to navigate throughout
 * an app by pushing and popping pages or inserting and removing them at
 * arbitrary locations in history.
 *
 * The current page is the last one in the array, or the top of the stack if we
 * think of it that way.  [Pushing](#push) a new page onto the top of the
 * navigation stack causes the new page to be animated in, while [popping](#pop)
 * the current page will navigate to the previous page in the stack.
 *
 * Unless you are using a directive like [NavPush](../NavPush/), or need a
 * specific NavController, most times you will inject and use a reference to the
 * nearest NavController to manipulate the navigation stack.
 *
 * <h3 id="injecting_nav_controller">Injecting NavController</h3>
 * Injecting NavController will always get you an instance of the nearest
 * NavController, regardless of whether it is a Tab or a Nav.
 *
 * Behind the scenes, when Ionic instantiates a new NavController, it creates an
 * injector with NavController bound to that instance (usually either a Nav or
 * Tab) and adds the injector to its own providers.  For more information on
 * providers and dependency injection, see [Providers and DI]().
 *
 * Instead, you can inject NavController and know that it is the correct
 * navigation controller for most situations (for more advanced situations, see
 * [Menu](../../Menu/Menu/) and [Tab](../../Tab/Tab/)).
 *
 * ```ts
 *  class MyComponent {
 *    constructor(nav: NavController) {
 *      this.nav = nav;
 *    }
 *  }
 * ```
 *
 * <h2 id="creating_pages">Page creation</h2>
 * _For more information on the `@Page` decorator see the [@Page API
 * reference](../../../config/Page/)._
 *
 * Pages are created when they are added to the navigation stack.  For methods
 * like [push()](#push), the NavController takes any component class that is
 * decorated with `@Page` as its first argument.  The NavController then
 * compiles that component, adds it to the app and animates it into view.
 *
 * By default, pages are cached and left in the DOM if they are navigated away
 * from but still in the navigation stack (the exiting page on a `push()` for
 * example).  They are destroyed when removed from the navigation stack (on
 * [pop()](#pop) or [setRoot()](#setRoot)).
 *
 *
 * <h2 id="Lifecycle">Lifecycle events</h2>
 * Lifecycle events are fired during various stages of navigation.  They can be
 * defined in any `@Page` decorated component class.
 *
 * ```ts
 * @Page({
 *   template: 'Hello World'
 * })
 * class HelloWorld {
 *   onPageLoaded() {
 *     console.log("I'm alive!");
 *   }
 *   onPageWillLeave() {
 *     console.log("Looks like I'm about to leave :(");
 *   }
 * }
 * ```
 *
 *
 *
 * - `onPageLoaded` - Runs when the page has loaded. This event only happens once per page being created and added to the DOM. If a page leaves but is cached, then this event will not fire again on a subsequent viewing. The `onPageLoaded` event is good place to put your setup code for the page.
 * - `onPageWillEnter` - Runs when the page is about to enter and become the active page.
 * - `onPageDidEnter` - Runs when the page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.
 * - `onPageWillLeave` - Runs when the page is about to leave and no longer be the active page.
 * - `onPageDidLeave` - Runs when the page has finished leaving and is no longer the active page.
 * - `onPageWillUnload` - Runs when the page is about to be destroyed and have its elements removed.
 * - `onPageDidUnload` - Runs after the page has been destroyed and its elements have been removed.
 *
 */

var NavController = (function (_Ion) {
    _inherits(NavController, _Ion);

    function NavController(parentnavCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
        _classCallCheck(this, NavController);

        _get(Object.getPrototypeOf(NavController.prototype), 'constructor', this).call(this, elementRef, config);
        this.parent = parentnavCtrl;
        this.app = app;
        this.config = config;
        this.keyboard = keyboard;
        this._compiler = compiler;
        this._viewManager = viewManager;
        this._zone = zone;
        this._renderer = renderer;
        this._cd = cd;
        this._views = [];
        this._trnsTime = 0;
        this._sbTrans = null;
        this._sbEnabled = config.get('swipeBackEnabled') || false;
        this._sbThreshold = config.get('swipeBackThreshold') || 40;
        this.id = ++ctrlIds;
        this._ids = -1;
        // build a new injector for child ViewControllers to use
        this.providers = _angular2Angular2.Injector.resolve([(0, _angular2Angular2.provide)(NavController, { useValue: this })]);
    }

    /** @internal */

    /**
     * Boolean if the nav controller is actively transitioning or not.
     * @private
     * @return {bool}
     */

    _createClass(NavController, [{
        key: 'isTransitioning',
        value: function isTransitioning() {
            return this._trnsTime > Date.now();
        }

        /**
         * Boolean if the nav controller is actively transitioning or not.
         * @private
         * @return {bool}
         */
    }, {
        key: 'setTransitioning',
        value: function setTransitioning(isTransitioning) {
            var fallback = arguments.length <= 1 || arguments[1] === undefined ? 700 : arguments[1];

            this._trnsTime = isTransitioning ? Date.now() + fallback : 0;
        }

        /**
         * Push is how we can pass components and navigate to them. We push the component we want to navigate to on to the navigation stack.
         *
         * ```typescript
         * class MyClass{
         *    constructor(nav:NavController){
         *      this.nav = nav;
         *    }
         *
         *    pushPage(){
         *      this.nav.push(SecondView);
         *    }
         * }
         * ```
         *
         * We can also pass along parameters to the next view, such as data that we have on the current view. This is a similar concept to to V1 apps with `$stateParams`.
         *
         * ```typescript
         * class MyClass{
         *    constructor(nav:NavController){
         *      this.nav = nav;
         *    }
         *
         *    pushPage(user){
         *      this.nav.push(SecondView,{
         *       // user is an object we have in our view
         *       // typically this comes from an ngFor or some array
         *       // here we can create an object with a property of
         *       // paramUser, and set it's value to the user object we passed in
         *       paramUser: user
         *      });
         *    }
         * }
         * ```
         *
         * We'll look at how we can access that data in the `SecondView` in the navParam docs
         *
         * We can also pass any options to the transtion from that same method
         *
         * ```typescript
         * class MyClass{
         *    constructor(nav:NavController){
         *      this.nav = nav;
         *    }
         *
         *    pushPage(user){
         *      this.nav.push(SecondView,{
         *       // user is an object we have in our view
         *       // typically this comes from an ngFor or some array
         *       // here we can create an object with a property of
         *       // paramUser, and set it's value to the user object we passed in
         *       paramUser: user
         *      },{
         *       // here we can configure things like the animations direction or
         *       // or if the view should animate at all.
         *       animate: true,
         *       direction: back
         *      });
         *    }
         * }
         * ```
         * @param {Any} component The name of the component you want to push on the navigation stack
         * @param {Object} [params={}] Any nav-params you want to pass along to the next view
         * @param {Object} [opts={}] Any options you want to use pass to transtion
         * @returns {Promise} Returns a promise when the transition is completed
         */
    }, {
        key: 'push',
        value: function push(componentType, params, opts, callback) {
            if (params === undefined) params = {};
            if (opts === undefined) opts = {};

            if (!componentType) {
                return Promise.reject('invalid componentType to push');
            }
            if (typeof componentType !== 'function') {
                throw 'Loading component must be a component class, not "' + componentType.toString() + '"';
            }
            if (this.isTransitioning()) {
                return Promise.reject('nav controller actively transitioning');
            }
            this.setTransitioning(true, 500);
            var promise = null;
            if (!callback) {
                promise = new Promise(function (res) {
                    callback = res;
                });
            }
            // do not animate if this is the first in the stack
            if (!this._views.length && !opts.animateFirst) {
                opts.animate = false;
            }
            // default the direction to "forward"
            opts.direction = opts.direction || 'forward';
            // the active view is going to be the leaving one (if one exists)
            var leavingView = this.getActive() || new _viewController.ViewController();
            leavingView.shouldCache = (0, _utilUtil.isBoolean)(opts.cacheLeavingView) ? opts.cacheLeavingView : true;
            leavingView.shouldDestroy = !leavingView.shouldCache;
            if (leavingView.shouldDestroy) {
                leavingView.willUnload();
            }
            // create a new ViewController
            var enteringView = new _viewController.ViewController(this, componentType, params);
            enteringView.shouldDestroy = false;
            enteringView.shouldCache = false;
            enteringView.pageType = opts.pageType;
            enteringView.handle = opts.handle || null;
            // add the view to the stack
            this._add(enteringView);
            if (this.router) {
                // notify router of the state change
                this.router.stateChange('push', enteringView, params);
            }
            // start the transition
            this._transition(enteringView, leavingView, opts, callback);
            return promise;
        }

        /**
         * If you wanted to navigate back from a current view, you can use the back-button or programatically call `pop()`
         * Similar to `push()`, you can pass animation options.
         *
         * ```typescript
         * class SecondView{
         *    constructor(nav:NavController){
         *      this.nav = nav;
         *    }
         *
         *    goBack(){
         *      this.nav.pop({
         *       animate: true,
         *       direction: back
         *      });
         *    }
         * }
         * ```
         *
         * @param {Object} [opts={}] Any options you want to use pass to transtion
         * @returns {Promise} Returns a promise when the transition is completed
         */
    }, {
        key: 'pop',
        value: function pop() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (!opts.animateFirst && !this.canGoBack()) {
                return Promise.reject('pop cannot go back');
            }
            if (this.isTransitioning()) {
                return Promise.reject('nav controller actively transitioning');
            }
            this.setTransitioning(true, 500);
            var resolve = null;
            var promise = new Promise(function (res) {
                resolve = res;
            });
            // default the direction to "back"
            opts.direction = opts.direction || 'back';
            // get the active view and set that it is staged to be leaving
            // was probably the one popped from the stack
            var leavingView = this.getActive() || new _viewController.ViewController();
            leavingView.shouldCache = (0, _utilUtil.isBoolean)(opts.cacheLeavingView) ? opts.cacheLeavingView : false;
            leavingView.shouldDestroy = !leavingView.shouldCache;
            if (leavingView.shouldDestroy) {
                leavingView.willUnload();
            }
            // the entering view is now the new last view
            // Note: we might not have an entering view if this is the
            // only view on the history stack.
            var enteringView = this.getPrevious(leavingView);
            if (this.router) {
                // notify router of the state change
                this.router.stateChange('pop', enteringView);
            }
            // start the transition
            this._transition(enteringView, leavingView, opts, resolve);
            return promise;
        }

        /**
         * @private
         * Pop to a specific view in the history stack
         * @param view {ViewController} to pop to
         * @param {Object} [opts={}] Any options you want to use pass to transtion
         */
    }, {
        key: 'popTo',
        value: function popTo(viewCtrl) {
            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            // Get the target index of the view to pop to
            var viewIndex = this._views.indexOf(viewCtrl);
            var targetIndex = viewIndex + 1;
            // Don't pop to the view if it wasn't found, or the target is beyond the view list
            if (viewIndex < 0 || targetIndex > this._views.length - 1) {
                return Promise.resolve();
            }
            // ensure the entering view is shown
            this._renderView(viewCtrl, true);
            var resolve = null;
            var promise = new Promise(function (res) {
                resolve = res;
            });
            opts.direction = opts.direction || 'back';
            var leavingView = this.getActive() || new _viewController.ViewController();
            // get the views to auto remove without having to do a transiton for each
            // the last view (the currently active one) will do a normal transition out
            if (this._views.length > 1) {
                var autoRemoveItems = this._views.slice(targetIndex, this._views.length);
                var popView = undefined;
                for (var i = 0; i < autoRemoveItems.length; i++) {
                    popView = autoRemoveItems[i];
                    popView.shouldDestroy = true;
                    popView.shouldCache = false;
                    popView.willUnload();
                    // only the leaving view should be shown, all others hide
                    this._renderView(popView, popView === leavingView);
                }
            }
            if (this.router) {
                this.router.stateChange('pop', viewCtrl);
            }
            this._transition(viewCtrl, leavingView, opts, resolve);
            return promise;
        }

        /**
         * Similar to `pop()`, this method let's you navigate back to the root of the stack, no matter how many views that is
         * @param {Object} [opts={}] Any options you want to use pass to transtion
         */
    }, {
        key: 'popToRoot',
        value: function popToRoot() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return this.popTo(this.first(), opts);
        }

        /**
         * Inserts a view into the nav stack at the specified index.
         * This is useful if you need to add a view at any point in your navigation stack
         *
         * ```typescript
         * export class Detail {
         *    constructor(nav: NavController) {
         *      this.nav = nav;
         *    }
         *    insertView(){
         *      this.nav.insert(1,Info)
         *    }
         *  }
         * ```
         *
         * This will insert the `Info` view into the second slot of our navigation stack
         *
         * @param {Number} index The index where you want to insert the view
         * @param {Any} component The name of the component you want to insert into the nav stack
         * @returns {Promise} Returns a promise when the view has been inserted into the navigation stack
         */
    }, {
        key: 'insert',
        value: function insert(index, componentType) {
            var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            if (!componentType || index < 0) {
                return Promise.reject('invalid insert');
            }
            // push it onto the end
            if (index >= this._views.length) {
                return this.push(componentType, params, opts);
            }
            // create new ViewController, but don't render yet
            var viewCtrl = new _viewController.ViewController(this, componentType, params);
            viewCtrl.state = CACHED_STATE;
            viewCtrl.shouldDestroy = false;
            viewCtrl.shouldCache = false;
            this._incrementId(viewCtrl);
            this._views.splice(index, 0, viewCtrl);
            this._cleanup();
            return Promise.resolve();
        }

        /**
         * Removes a view from the nav stack at the specified index.
         *
         * ```typescript
         * export class Detail {
         *    constructor(nav: NavController) {
         *      this.nav = nav;
         *    }
         *    removeView(){
         *      this.nav.remove(1)
         *    }
         *  }
         * ```
         *
         * @param {Number} index Remove the view from the nav stack at that index
         * @param {Object} [opts={}] Any options you want to use pass to transtion
         * @returns {Promise} Returns a promise when the view has been removed
         */
    }, {
        key: 'remove',
        value: function remove(index) {
            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (index < 0 || index >= this._views.length) {
                return Promise.reject("index out of range");
            }
            var viewToRemove = this._views[index];
            if (this.isActive(viewToRemove)) {
                return this.pop(opts);
            }
            viewToRemove.shouldDestroy = true;
            this._cleanup();
            return Promise.resolve();
        }

        /**
         * @private
         */
    }, {
        key: 'setViews',
        value: function setViews(components) {
            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            console.warn('setViews() deprecated, use setPages() instead');
            this.setPages(components, opts);
        }

        /**
         * You can set the views of the current navigation stack and navigate to the last view past
         *
         *
         *```typescript
         * import {Page, NavController} from 'ionic/ionic'
         * import {Detail} from '../detail/detail'
         * import {Info} from '../info/info'
         *
         *  export class Home {
         *    constructor(nav: NavController) {
         *      this.nav = nav;
         *    }
         *    setView() {
         *      this.nav.setViews([List,Detail, Info]);
         *    }
         *  }
         *```
         *
         *
         *In this example, we're giving the current nav stack an array of pages. Then the navigation stack will navigate to the last view in the array and remove the orignal view you came from.
         *
         *By default, animations are disabled, but they can be enabled by passing options to the navigation controller
         *
         *
         *```typescript
         * import {Page, NavController} from 'ionic/ionic'
         * import {Detail} from '../detail/detail'
         * import {Info} from '../info/info'
         *
         *  export class Home {
         *    constructor(nav: NavController) {
         *      this.nav = nav;
         *    }
         *    setView() {
         *      this.nav.setViews([List,Detail, Info],{
         *        animate: true
         *      });
         *    }
         *  }
         *```
         *
         *
         *You can also pass any navigation params to the individual pages in the array.
         *
         *
         *```typescript
         * import {Page, NavController} from 'ionic/ionic'
         * import {Detail} from '../detail/detail'
         * import {Info} from '../info/info'
         *
         *  export class Home {
         *    constructor(nav: NavController) {
         *      this.nav = nav;
         *    }
         *    setView() {
         *      this.nav.setViews([{
         *        componentType: List,
         *        params: {id: 43}
         *      }, {
         *        componentType: Detail,
         *        params: {id: 45}
         *      },{
         *        componentType: Info,
         *        params: {id: 5}
         *      } ],{
         *        animate: true
         *      });
         *    }
         *  }
         *```
         *
         * @param {Array} component an arry of components to load in the stack
         * @param {Object} [opts={}] Any options you want to use pass
         * @returns {Promise} Returns a promise when the views are set
         */
    }, {
        key: 'setPages',
        value: function setPages(components) {
            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (!components || !components.length) {
                return Promise.resolve();
            }
            var leavingView = this.getActive() || new _viewController.ViewController();
            // if animate has not been set then default to false
            opts.animate = opts.animate || false;
            // ensure leaving views are not cached, and should be destroyed
            opts.cacheLeavingView = false;
            // get the views to auto remove without having to do a transiton for each
            // the last view (the currently active one) will do a normal transition out
            if (this._views.length > 1) {
                var autoRemoveItems = this._views.slice(0, this._views.length - 1);
                var popView = undefined;
                for (var i = 0; i < autoRemoveItems.length; i++) {
                    popView = autoRemoveItems[i];
                    popView.shouldDestroy = true;
                    popView.shouldCache = false;
                    popView.willUnload();
                    if (opts.animate) {
                        // only the leaving view should be shown, all others hide
                        this._renderView(popView, popView === leavingView);
                    }
                }
            }
            var componentObj = null;
            var componentType = null;
            var viewCtrl = null;
            // create the ViewControllers that go before the new active ViewController
            // in the stack, but the previous views shouldn't render yet
            if (components.length > 1) {
                var newBeforeItems = components.slice(0, components.length - 1);
                for (var j = 0; j < newBeforeItems.length; j++) {
                    componentObj = newBeforeItems[j];
                    if (componentObj) {
                        // could be an object with a componentType property, or it is a componentType
                        componentType = componentObj.componentType || componentObj;
                        viewCtrl = new _viewController.ViewController(this, componentType, componentObj.params);
                        viewCtrl.state = CACHED_STATE;
                        viewCtrl.shouldDestroy = false;
                        viewCtrl.shouldCache = false;
                        // add the item to the stack
                        this._add(viewCtrl);
                    }
                }
            }
            // get the component that will become the active item
            // it'll be the last one in the given components array
            componentObj = components[components.length - 1];
            componentType = componentObj.componentType || componentObj;
            // transition the leaving and entering
            return this.push(componentType, componentObj.params, opts);
        }

        /**
         * Set the root for the current navigation stack
         * @param {Component} The name of the component you want to push on the navigation stack
         * @param {Object} [params={}] Any nav-params you want to pass along to the next view
         * @param {Object} [opts={}] Any options you want to use pass to transtion
         * @returns {Promise} Returns a promise when done
         */
    }, {
        key: 'setRoot',
        value: function setRoot(componentType) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return this.setPages([{
                componentType: componentType,
                params: params
            }], opts);
        }

        /**
         *
         * @private
         * @param {TODO} enteringView  TODO
         * @param {TODO} leavingView  TODO
         * @param {TODO} opts  TODO
         * @param {Function} done  TODO
         * @returns {any} TODO
         */
    }, {
        key: '_transition',
        value: function _transition(enteringView, leavingView, opts, done) {
            var _this = this;

            if (enteringView === leavingView) {
                return done(enteringView);
            }
            if (!opts.animation) {
                opts.animation = this.config.get('pageTransition');
            }
            if (this.config.get('animate') === false) {
                opts.animate = false;
            }
            if (!enteringView) {
                // if no entering view then create a bogus one
                enteringView = new _viewController.ViewController();
                enteringView.loaded();
            }
            console.time('_transition ' + (enteringView.componentType && enteringView.componentType.name));
            this._stage(enteringView, opts, function () {
                if (enteringView.shouldDestroy) {
                    // already marked as a view that will be destroyed, don't continue
                    return done(enteringView);
                }
                _this._cd.detectChanges();
                _this._zone.runOutsideAngular(function () {
                    _this._setZIndex(enteringView, leavingView, opts.direction);
                    enteringView.shouldDestroy = false;
                    enteringView.shouldCache = false;
                    _this._postRender(enteringView, opts, function () {
                        if (!opts.preload) {
                            enteringView.willEnter();
                            leavingView.willLeave();
                        }
                        // set that the new view pushed on the stack is staged to be entering/leaving
                        // staged state is important for the transition to find the correct view
                        enteringView.state = STAGED_ENTERING_STATE;
                        leavingView.state = STAGED_LEAVING_STATE;
                        // init the transition animation
                        opts.renderDelay = opts.transitionDelay || _this.config.get('pageTransitionDelay');
                        var transAnimation = _animationsAnimation.Animation.createTransition(_this._getStagedEntering(), _this._getStagedLeaving(), opts);
                        if (opts.animate === false) {
                            // force it to not animate the elements, just apply the "to" styles
                            transAnimation.clearDuration();
                            transAnimation.duration(0);
                        }
                        var duration = transAnimation.duration();
                        var enableApp = duration < 64;
                        // block any clicks during the transition and provide a
                        // fallback to remove the clickblock if something goes wrong
                        _this.app.setEnabled(enableApp, duration);
                        _this.setTransitioning(!enableApp, duration);
                        if (opts.pageType) {
                            transAnimation.before.addClass(opts.pageType);
                        }
                        // start the transition
                        transAnimation.play(function () {
                            // transition has completed, update each view's state
                            enteringView.state = ACTIVE_STATE;
                            leavingView.state = CACHED_STATE;
                            // dispose any views that shouldn't stay around
                            transAnimation.dispose();
                            if (!opts.preload) {
                                enteringView.didEnter();
                                leavingView.didLeave();
                            }
                            _this._zone.run(function () {
                                if (_this.keyboard.isOpen()) {
                                    _this.keyboard.onClose(function () {
                                        _this._transComplete();
                                        console.timeEnd('_transition ' + (enteringView.componentType && enteringView.componentType.name));
                                        done(enteringView);
                                    }, 32);
                                } else {
                                    _this._transComplete();
                                    console.timeEnd('_transition ' + (enteringView.componentType && enteringView.componentType.name));
                                    done(enteringView);
                                }
                            });
                        });
                    });
                });
            });
        }

        /**
         * @private
         */
    }, {
        key: '_stage',
        value: function _stage(viewCtrl, opts, done) {
            if (viewCtrl.isLoaded() || viewCtrl.shouldDestroy) {
                // already compiled this view
                return done();
            }
            // get the pane the NavController wants to use
            // the pane is where all this content will be placed into
            this.loadPage(viewCtrl, null, opts, function () {
                if (viewCtrl.onReady) {
                    viewCtrl.onReady(function () {
                        viewCtrl.loaded();
                        done();
                    });
                } else {
                    viewCtrl.loaded();
                    done();
                }
            });
        }

        /**
         * @private
         */
    }, {
        key: 'loadPage',
        value: function loadPage(viewCtrl, navbarContainerRef, opts, done) {
            var _this2 = this;

            // guts of DynamicComponentLoader#loadIntoLocation
            this._compiler.compileInHost(viewCtrl.componentType).then(function (hostProtoViewRef) {
                var wtfScope = NavController._loadPageScope();
                var providers = _this2.providers.concat(_angular2Angular2.Injector.resolve([(0, _angular2Angular2.provide)(_viewController.ViewController, { useValue: viewCtrl }), (0, _angular2Angular2.provide)(NavParams, { useValue: viewCtrl.params })]));
                var location = _this2._viewManager.getNamedElementInComponentView(_this2.elementRef, 'contents');
                var viewContainer = _this2._viewManager.getViewContainer(location);
                var hostViewRef = viewContainer.createHostView(hostProtoViewRef, viewContainer.length, providers);
                var newLocation = _this2._viewManager.getHostElement(hostViewRef);
                var component = _this2._viewManager.getComponent(newLocation);
                viewCtrl.addDestroy(function () {
                    var index = viewContainer.indexOf(hostViewRef);
                    if (index !== -1) {
                        viewContainer.remove(index);
                    }
                });
                // a new ComponentRef has been created
                // set the ComponentRef's instance to this ViewController
                viewCtrl.setInstance(component);
                // remember the ElementRef to the ion-page elementRef that was just created
                viewCtrl.setPageRef(newLocation);
                if (!navbarContainerRef) {
                    navbarContainerRef = viewCtrl.getNavbarViewRef();
                }
                var navbarTemplateRef = viewCtrl.getNavbarTemplateRef();
                if (navbarContainerRef && navbarTemplateRef) {
                    (function () {
                        var navbarView = navbarContainerRef.createEmbeddedView(navbarTemplateRef);
                        viewCtrl.addDestroy(function () {
                            var index = navbarContainerRef.indexOf(navbarView);
                            if (index > -1) {
                                navbarContainerRef.remove(index);
                            }
                        });
                    })();
                }
                opts.postLoad && opts.postLoad(viewCtrl);
                if (_this2._views.length === 1) {
                    _this2._zone.runOutsideAngular(function () {
                        (0, _utilDom.rafFrames)(38, function () {
                            _this2._renderer.setElementClass(_this2.elementRef, 'has-views', true);
                        });
                    });
                }
                (0, _angular2Angular2.wtfLeave)(wtfScope);
                done(viewCtrl);
            });
        }
    }, {
        key: '_postRender',
        value: function _postRender(enteringView, opts, done) {
            enteringView.postRender();
            if (opts.animate === false) {
                done();
            } else {
                (0, _utilDom.rafFrames)(2, done);
            }
        }
    }, {
        key: '_setZIndex',
        value: function _setZIndex(enteringView, leavingView, direction) {
            var enteringPageRef = enteringView && enteringView.pageRef();
            if (enteringPageRef) {
                if (!leavingView || !leavingView.isLoaded()) {
                    enteringView.zIndex = 10;
                } else if (direction === 'back') {
                    // moving back
                    enteringView.zIndex = leavingView.zIndex - 1;
                } else {
                    // moving forward
                    enteringView.zIndex = leavingView.zIndex + 1;
                }
                if (enteringView.zIndex !== enteringView._zIndex) {
                    this._renderer.setElementStyle(enteringPageRef, 'z-index', enteringView.zIndex);
                    enteringView._zIndex = enteringView.zIndex;
                }
            }
        }
    }, {
        key: '_renderView',
        value: function _renderView(viewCtrl, shouldShow) {
            // using hidden element attribute to display:none and not render views
            // renderAttr of '' means the hidden attribute will be added
            // renderAttr of null means the hidden attribute will be removed
            // doing checks to make sure we only make an update to the element when needed
            if (shouldShow && viewCtrl._hdnAttr === '' || !shouldShow && viewCtrl._hdnAttr !== '') {
                viewCtrl._hdnAttr = shouldShow ? null : '';
                this._renderer.setElementAttribute(viewCtrl.pageRef(), 'hidden', viewCtrl._hdnAttr);
                var navbarRef = viewCtrl.navbarRef();
                if (navbarRef) {
                    this._renderer.setElementAttribute(navbarRef, 'hidden', viewCtrl._hdnAttr);
                }
            }
        }

        /**
         * @private
         */
    }, {
        key: 'swipeBackStart',
        value: function swipeBackStart() {
            var _this3 = this;

            return;
            if (!this.app.isEnabled() || !this.canSwipeBack()) {
                return;
            }
            // disables the app during the transition
            this.app.setEnabled(false);
            this.setTransitioning(true);
            // default the direction to "back"
            var opts = {
                direction: 'back'
            };
            // get the active view and set that it is staged to be leaving
            // was probably the one popped from the stack
            var leavingView = this.getActive() || new _viewController.ViewController();
            leavingView.shouldDestroy = true;
            leavingView.shouldCache = false;
            leavingView.willLeave();
            leavingView.willUnload();
            // the entering view is now the new last view
            var enteringView = this.getPrevious(leavingView);
            enteringView.shouldDestroy = false;
            enteringView.shouldCache = false;
            enteringView.willEnter();
            // wait for the new view to complete setup
            enteringView._stage(enteringView, {}, function () {
                _this3._zone.runOutsideAngular(function () {
                    // set that the new view pushed on the stack is staged to be entering/leaving
                    // staged state is important for the transition to find the correct view
                    enteringView.state = STAGED_ENTERING_STATE;
                    leavingView.state = STAGED_LEAVING_STATE;
                    // init the swipe back transition animation
                    _this3._sbTrans = Transition.create(_this3, opts);
                    _this3._sbTrans.easing('linear').progressStart();
                });
            });
        }

        /**
         * @private
         */
    }, {
        key: 'swipeBackProgress',
        value: function swipeBackProgress(value) {
            return;
            if (this._sbTrans) {
                // continue to disable the app while actively dragging
                this.app.setEnabled(false, 4000);
                this.setTransitioning(true, 4000);
                // set the transition animation's progress
                this._sbTrans.progress(value);
            }
        }

        /**
         * @private
         */
    }, {
        key: 'swipeBackEnd',
        value: function swipeBackEnd(completeSwipeBack, rate) {
            var _this4 = this;

            return;
            if (!this._sbTrans) return;
            // disables the app during the transition
            this.app.setEnabled(false);
            this.setTransitioning(true);
            this._sbTrans.progressEnd(completeSwipeBack, rate).then(function () {
                _this4._zone.run(function () {
                    // find the views that were entering and leaving
                    var enteringView = _this4._getStagedEntering();
                    var leavingView = _this4._getStagedLeaving();
                    if (enteringView && leavingView) {
                        // finish up the animation
                        if (completeSwipeBack) {
                            // swipe back has completed navigating back
                            // update each view's state
                            enteringView.state = ACTIVE_STATE;
                            leavingView.state = CACHED_STATE;
                            enteringView.didEnter();
                            leavingView.didLeave();
                            if (_this4.router) {
                                // notify router of the pop state change
                                _this4.router.stateChange('pop', enteringView);
                            }
                        } else {
                            // cancelled the swipe back, they didn't end up going back
                            // return views to their original state
                            leavingView.state = ACTIVE_STATE;
                            enteringView.state = CACHED_STATE;
                            leavingView.willEnter();
                            leavingView.didEnter();
                            enteringView.didLeave();
                            leavingView.shouldDestroy = false;
                            enteringView.shouldDestroy = false;
                        }
                    }
                    // empty out and dispose the swipe back transition animation
                    _this4._sbTrans && _this4._sbTrans.dispose();
                    _this4._sbTrans = null;
                    // all done!
                    _this4._transComplete();
                });
            });
        }

        /**
         * @private
         */
    }, {
        key: '_sbComplete',
        value: function _sbComplete() {
            return;
            if (this.canSwipeBack()) {
                // it is possible to swipe back
                if (this.sbGesture) {
                    // this is already an active gesture, don't create another one
                    return;
                }
                var opts = {
                    edge: 'left',
                    threshold: this._sbThreshold
                };
                this.sbGesture = new _swipeBack.SwipeBackGesture(this.getNativeElement(), opts, this);
                console.debug('SwipeBackGesture listen');
                this.sbGesture.listen();
            } else if (this.sbGesture) {
                // it is not possible to swipe back and there is an
                // active sbGesture, so unlisten it
                console.debug('SwipeBackGesture unlisten');
                this.sbGesture.unlisten();
                this.sbGesture = null;
            }
        }

        /**
         * Check to see if swipe-to-go-back is enabled
         * @param {boolean=} isSwipeBackEnabled Set whether or not swipe-to-go-back is enabled
         * @returns {boolean} Whether swipe-to-go-back is enabled
         */
    }, {
        key: 'isSwipeBackEnabled',
        value: function isSwipeBackEnabled(val) {
            if (arguments.length) {
                this._sbEnabled = !!val;
            }
            return this._sbEnabled;
        }

        /**
         * If it's possible to use swipe back or not. If it's not possible
         * to go back, or swipe back is not enable then this will return false.
         * If it is possible to go back, and swipe back is enabled, then this
         * will return true.
         * @returns {boolean} Whether you can swipe to go back
         */
    }, {
        key: 'canSwipeBack',
        value: function canSwipeBack() {
            return this._sbEnabled && this.canGoBack();
        }

        /**
         * Returns `true` if there's a valid previous view that we can pop back to.
         * Otherwise returns false.
         * @returns {boolean} Whether there is a view to go back to
         */
    }, {
        key: 'canGoBack',
        value: function canGoBack() {
            var activeView = this.getActive();
            if (activeView) {
                return activeView.enableBack();
            }
            return false;
        }

        /**
         * @private
         */
    }, {
        key: '_transComplete',
        value: function _transComplete() {
            var wtfScope = NavController._transCompleteScope();
            this._views.forEach(function (view) {
                if (view) {
                    if (view.shouldDestroy) {
                        view.didUnload();
                    } else if (view.state === CACHED_STATE && view.shouldCache) {
                        view.shouldCache = false;
                    }
                }
            });
            // allow clicks again, but still set an enable time
            // meaning nothing with this view controller can happen for XXms
            this.app.setEnabled(true);
            this.setTransitioning(false);
            this._sbComplete();
            this._cleanup();
            (0, _angular2Angular2.wtfLeave)(wtfScope);
        }

        /**
         * @private
         */
    }, {
        key: '_cleanup',
        value: function _cleanup(activeView) {
            var _this5 = this;

            // the active view, and the previous view, should be rendered in dom and ready to go
            // all others, like a cached page 2 back, should be display: none and not rendered
            var destroys = [];
            activeView = activeView || this.getActive();
            var previousView = this.getPrevious(activeView);
            this._views.forEach(function (view) {
                if (view) {
                    if (view.shouldDestroy) {
                        destroys.push(view);
                    } else if (view.isLoaded()) {
                        var shouldShow = view === activeView || view === previousView;
                        _this5._renderView(view, shouldShow);
                    }
                }
            });
            // all views being destroyed should be removed from the list of views
            // and completely removed from the dom
            destroys.forEach(function (view) {
                _this5._remove(view);
                view.destroy();
            });
        }

        /**
         * @private
         */
    }, {
        key: 'navbarViewContainer',
        value: function navbarViewContainer(nbContainer) {
            if (nbContainer) {
                this._nbContainer = nbContainer;
            }
            if (this._nbContainer) {
                return this._nbContainer;
            }
            if (this.parent) {
                return this.parent.navbarViewContainer();
            }
        }

        /**
         * @private
         * @returns {TODO} TODO
         */
    }, {
        key: 'anchorElementRef',
        value: function anchorElementRef() {
            if (arguments.length) {
                this._anchorER = arguments[0];
            }
            return this._anchorER;
        }

        /**
         * @private
         */
    }, {
        key: '_add',
        value: function _add(viewCtrl) {
            this._incrementId(viewCtrl);
            this._views.push(viewCtrl);
        }

        /**
         * @private
         */
    }, {
        key: '_incrementId',
        value: function _incrementId(viewCtrl) {
            viewCtrl.id = this.id + '-' + ++this._ids;
        }

        /**
         * @private
         */
    }, {
        key: '_remove',
        value: function _remove(viewOrIndex) {
            _utilUtil.array.remove(this._views, viewOrIndex);
        }

        /**
         * @private
         */
    }, {
        key: '_getStagedEntering',
        value: function _getStagedEntering() {
            for (var i = 0, ii = this._views.length; i < ii; i++) {
                if (this._views[i].state === STAGED_ENTERING_STATE) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * @private
         */
    }, {
        key: '_getStagedLeaving',
        value: function _getStagedLeaving() {
            for (var i = 0, ii = this._views.length; i < ii; i++) {
                if (this._views[i].state === STAGED_LEAVING_STATE) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * @private
         * @returns {Component} TODO
         */
    }, {
        key: 'getActive',
        value: function getActive() {
            for (var i = this._views.length - 1; i >= 0; i--) {
                if (this._views[i].state === ACTIVE_STATE && !this._views[i].shouldDestroy) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * @param {Index} The index of the view you want to get
         * @returns {Component} Returns the component that matches the index given
         */
    }, {
        key: 'getByIndex',
        value: function getByIndex(index) {
            if (index < this._views.length && index > -1) {
                return this._views[index];
            }
            return null;
        }

        /**
         * @private
         * @param {Handle} The handle of the view you want to get
         * @returns {Component} Returns the component that matches the handle given
         */
    }, {
        key: 'getByHandle',
        value: function getByHandle(handle) {
            for (var i = 0, ii = this._views.length; i < ii; i++) {
                if (this._views[i].handle === handle) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * @private
         * @param {TODO} pageType  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'getByType',
        value: function getByType(pageType) {
            for (var i = 0, ii = this._views.length; i < ii; i++) {
                if (this._views[i].pageType === pageType) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * @private
         * @param {TODO} view  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'getPrevious',
        value: function getPrevious(viewCtrl) {
            if (viewCtrl) {
                var viewIndex = this._views.indexOf(viewCtrl);
                for (var i = viewIndex - 1; i >= 0; i--) {
                    if (!this._views[i].shouldDestroy) {
                        return this._views[i];
                    }
                }
            }
            return null;
        }

        /**
         * First view in this nav controller's stack. This would
         * not return an view which is about to be destroyed.
         * @returns {Component} Returns the first component view in the current stack
         */
    }, {
        key: 'first',
        value: function first() {
            for (var i = 0, l = this._views.length; i < l; i++) {
                if (!this._views[i].shouldDestroy) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * Last view in this nav controller's stack. This would
         * not return an view which is about to be destroyed.
         * @returns {Component} Returns the last component view in the current stack
         */
    }, {
        key: 'last',
        value: function last() {
            for (var i = this._views.length - 1; i >= 0; i--) {
                if (!this._views[i].shouldDestroy) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * @private
         * @param {TODO} view  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'indexOf',
        value: function indexOf(viewCtrl) {
            return this._views.indexOf(viewCtrl);
        }

        /**
         * Number of sibling views in the nav controller. This does
         * not include views which are about to be destroyed.
         * @returns {Number} The number of views in stack, including the current view
         */
    }, {
        key: 'length',
        value: function length() {
            var len = 0;
            for (var i = 0, l = this._views.length; i < l; i++) {
                if (!this._views[i].shouldDestroy) {
                    len++;
                }
            }
            return len;
        }

        /**
         * @private
         * IS RETURNING UNDEFIND
         * @param {TODO} view  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'isActive',
        value: function isActive(viewCtrl) {
            return viewCtrl && viewCtrl.state === ACTIVE_STATE;
        }

        /**
         * @private
         * @param {TODO} router  TODO
         */
    }, {
        key: 'registerRouter',
        value: function registerRouter(router) {
            this.router = router;
        }
    }]);

    return NavController;
})(_ion.Ion);

exports.NavController = NavController;
NavController._tranitionScope = (0, _angular2Angular2.wtfCreateScope)('ionic.NavController#_transition()');
NavController._loadPageScope = (0, _angular2Angular2.wtfCreateScope)('ionic.NavController#loadPage()');
NavController._transCompleteScope = (0, _angular2Angular2.wtfCreateScope)('ionic.NavController#_transComplete()');
var ACTIVE_STATE = 1;
var CACHED_STATE = 2;
var STAGED_ENTERING_STATE = 3;
var STAGED_LEAVING_STATE = 4;
var ctrlIds = -1;
/**
 * TODO
 */

var NavParams = (function () {
    /**
     * @private
     * @param {TODO} data  TODO
     */

    function NavParams(data) {
        _classCallCheck(this, NavParams);

        this.data = data || {};
    }

    /**
     * TODO
     * @param {string} Which param you want to look up
     */

    _createClass(NavParams, [{
        key: 'get',
        value: function get(param) {
            return this.data[param];
        }
    }]);

    return NavParams;
})();

exports.NavParams = NavParams;