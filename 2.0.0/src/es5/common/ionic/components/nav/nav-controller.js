'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x9, _x10, _x11) { var _again = true; _function: while (_again) { var object = _x9, property = _x10, receiver = _x11; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x9 = parent; _x10 = property; _x11 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _angular2Angular2 = require('angular2/angular2');

var _ion = require('../ion');

var _configDecorators = require('../../config/decorators');

var _viewController = require('./view-controller');

var _transitionsTransition = require('../../transitions/transition');

var _swipeBack = require('./swipe-back');

var _ionicUtil = require('ionic/util');

var util = _interopRequireWildcard(_ionicUtil);

var _utilDom = require('../../util/dom');

/**
 * _For examples on the basic usage of NavController, check out the [Navigation section](../../../../components/#navigation)
 * of the Component docs._
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
 * ```ts
 * // class NavController
 * this.providers = Injector.resolve([
 *   provide(NavController, {useValue: this})
 * ]);
 * ```
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
 * decorated with @Page as its first argument.  The NavController then
 * [compiles]() that component, adds it to the DOM in a similar fashion to
 * Angular's [DynamicComponentLoader](https://angular.io/docs/js/latest/api/core/DynamicComponentLoader-interface.html),
 * and animates it into view.
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
 * }
 * ```
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

    function NavController(parentnavCtrl, app, config, elementRef, compiler, loader, viewManager, zone, renderer) {
        _classCallCheck(this, NavController);

        _get(Object.getPrototypeOf(NavController.prototype), 'constructor', this).call(this, elementRef, config);
        this.parent = parentnavCtrl;
        this.app = app;
        this.config = config;
        this._compiler = compiler;
        this._loader = loader;
        this._viewManager = viewManager;
        this._zone = zone;
        this.renderer = renderer;
        this._views = [];
        this._sbTrans = null;
        this._sbEnabled = config.get('swipeBackEnabled') || false;
        this._sbThreshold = config.get('swipeBackThreshold') || 40;
        this.id = ++ctrlIds;
        this._ids = -1;
        // build a new injector for child ViewControllers to use
        this.providers = _angular2Angular2.Injector.resolve([(0, _angular2Angular2.provide)(NavController, { useValue: this })]);
    }

    /**
     * TODO
     * @param {TODO} componentType  TODO
     * @param {TODO} [params={}]  TODO
     * @param {TODO} [opts={}]  TODO
     * @returns {Promise} TODO
     */

    _createClass(NavController, [{
        key: 'push',
        value: function push(componentType) {
            var _this = this;

            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            if (!componentType) {
                return Promise.reject();
            }
            if (typeof componentType !== 'function') {
                throw 'Loading component must be a component class, not "' + componentType.toString() + '"';
            }
            var resolve = undefined;
            var promise = new Promise(function (res) {
                resolve = res;
            });
            // do not animate if this is the first in the stack
            if (!this._views.length) {
                opts.animate = false;
            }
            // default the direction to "forward"
            opts.direction = opts.direction || 'forward';
            // the active view is going to be the leaving one (if one exists)
            var leavingView = this.getActive() || new _viewController.ViewController();
            leavingView.shouldCache = util.isBoolean(opts.cacheLeavingView) ? opts.cacheLeavingView : true;
            leavingView.shouldDestroy = !leavingView.shouldCache;
            if (leavingView.shouldDestroy) {
                leavingView.willUnload();
            }
            // create a new ViewController
            var enteringView = new _viewController.ViewController(this, componentType, params);
            enteringView.shouldDestroy = false;
            enteringView.shouldCache = false;
            // add the view to the stack
            this._add(enteringView);
            (0, _utilDom.raf)(function () {
                _this._cleanup(enteringView);
            });
            if (this.router) {
                // notify router of the state change
                this.router.stateChange('push', enteringView, params);
            }
            // start the transition
            this.transition(enteringView, leavingView, opts, function () {
                resolve();
            });
            return promise;
        }

        /**
         * TODO
         * @param {TODO} [opts={}]  TODO
         * @returns {Promise} TODO
         */
    }, {
        key: 'pop',
        value: function pop() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (!this.canGoBack()) {
                return Promise.reject();
            }
            var resolve = undefined;
            var promise = new Promise(function (res) {
                resolve = res;
            });
            // default the direction to "back"
            opts.direction = opts.direction || 'back';
            // get the active view and set that it is staged to be leaving
            // was probably the one popped from the stack
            var leavingView = this.getActive() || new _viewController.ViewController();
            leavingView.shouldCache = util.isBoolean(opts.cacheLeavingView) ? opts.cacheLeavingView : false;
            leavingView.shouldDestroy = !leavingView.shouldCache;
            if (leavingView.shouldDestroy) {
                leavingView.willUnload();
            }
            // the entering view is now the new last view
            // Note: we might not have an entering view if this is the
            // only view on the history stack.
            var enteringView = this.getPrevious(leavingView);
            if (enteringView) {
                if (this.router) {
                    // notify router of the state change
                    this.router.stateChange('pop', enteringView);
                }
                // start the transition
                this.transition(enteringView, leavingView, opts, function () {
                    // transition completed, destroy the leaving view
                    resolve();
                });
            } else {
                this._transComplete();
                resolve();
            }
            return promise;
        }

        /**
         * @private
         * Pop to a specific view in the history stack
         *
         * @param view {ViewController} to pop to
         * @param opts {object} pop options
         */
    }, {
        key: '_popTo',
        value: function _popTo(view) {
            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            // Get the target index of the view to pop to
            var viewIndex = this._views.indexOf(view);
            var targetIndex = viewIndex + 1;
            var resolve = undefined;
            var promise = new Promise(function (res) {
                resolve = res;
            });
            // Don't pop to the view if it wasn't found, or the target is beyond the view list
            if (viewIndex < 0 || targetIndex > this._views.length - 1) {
                resolve();
                return;
            }
            opts.direction = opts.direction || 'back';
            // get the views to auto remove without having to do a transiton for each
            // the last view (the currently active one) will do a normal transition out
            if (this._views.length > 1) {
                var autoRemoveItems = this._views.slice(targetIndex, this._views.length);
                for (var i = 0; i < autoRemoveItems.length; i++) {
                    autoRemoveItems[i].shouldDestroy = true;
                    autoRemoveItems[i].shouldCache = false;
                    autoRemoveItems[i].willUnload();
                }
            }
            var leavingView = this._views[this._views.length - 1];
            var enteringView = view;
            if (this.router) {
                this.router.stateChange('pop', enteringView);
            }
            this.transition(enteringView, leavingView, opts, function () {
                resolve();
            });
            return promise;
        }

        /**
         * Pop to the root view.
         * @param opts extra animation options
         */
    }, {
        key: 'popToRoot',
        value: function popToRoot() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this._popTo(this.first());
        }

        /**
         * Inserts a view into the nav stack at the specified index.
         * @param {TODO} componentType  TODO
         * @param {TODO} index TODO
         * @returns {Promise} TODO
         */
    }, {
        key: 'insert',
        value: function insert(componentType, index) {
            if (!componentType || index < 0) {
                return Promise.reject();
            }
            // push it onto the end
            if (index >= this._views.length) {
                return this.push(componentType);
            }
            // create new ViewController, but don't render yet
            var viewCtrl = new _viewController.ViewController(this, componentType);
            viewCtrl.state = CACHED_STATE;
            viewCtrl.shouldDestroy = false;
            viewCtrl.shouldCache = false;
            this._incrementId(viewCtrl);
            this._views.splice(index, 0, viewCtrl);
            return Promise.resolve();
        }

        /**
         * Removes a view from the nav stack at the specified index.
         * @param {TODO} index TODO
         * @returns {Promise} TODO
         */
    }, {
        key: 'remove',
        value: function remove(index) {
            if (index < 0 || index >= this._views.length) {
                return Promise.reject("Index out of range");
            }
            var viewToRemove = this._views[index];
            if (this.isActive(viewToRemove)) {
                return this.pop();
            }
            viewToRemove.shouldDestroy = true;
            this._cleanup();
            return Promise.resolve();
        }

        /**
         * Set the view stack to reflect the given component classes.
         * @param {TODO} components  TODO
         * @param {TODO} [opts={}]  TODO
         * @returns {Promise} TODO
         */
    }, {
        key: 'setViews',
        value: function setViews(components) {
            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            if (!components || !components.length) {
                return Promise.resolve();
            }
            // if animate has not been set then default to false
            opts.animate = opts.animate || false;
            // ensure leaving views are not cached, and should be destroyed
            opts.cacheLeavingView = false;
            // get the views to auto remove without having to do a transiton for each
            // the last view (the currently active one) will do a normal transition out
            if (this._views.length > 1) {
                var autoRemoveItems = this._views.slice(0, this._views.length - 1);
                for (var i = 0; i < autoRemoveItems.length; i++) {
                    autoRemoveItems[i].shouldDestroy = true;
                    autoRemoveItems[i].shouldCache = false;
                    autoRemoveItems[i].willUnload();
                }
            }
            var componentObj = null;
            var componentType = null;
            var viewCtrl = null;
            // create the ViewControllers that go before the new active ViewController in the stack
            // but the previous views won't should render yet
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
         * TODO
         * @param {TODO} componentType  TODO
         * @param {TODO} [params={}]  TODO
         * @param {TODO} [opts={}]  TODO
         * @returns {Promise} TODO
         */
    }, {
        key: 'setRoot',
        value: function setRoot(componentType) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return this.setViews([{
                componentType: componentType,
                params: params
            }], opts);
        }

        /**
         * TODO
         * @param {TODO} enteringView  TODO
         * @param {TODO} leavingView  TODO
         * @param {TODO} opts  TODO
         * @param {Function} callback  TODO
         * @returns {any} TODO
         */
    }, {
        key: 'transition',
        value: function transition(enteringView, leavingView, opts, callback) {
            var _this2 = this;

            if (!enteringView || enteringView === leavingView) {
                return callback();
            }
            if (!opts.animation) {
                opts.animation = this.config.get('viewTransition');
            }
            // wait for the new view to complete setup
            enteringView.stage(function () {
                if (enteringView.shouldDestroy) {
                    // already marked as a view that will be destroyed, don't continue
                    return callback();
                }
                _this2._zone.runOutsideAngular(function () {
                    enteringView.shouldDestroy = false;
                    enteringView.shouldCache = false;
                    enteringView.willEnter();
                    leavingView.willLeave();
                    // set that the new view pushed on the stack is staged to be entering/leaving
                    // staged state is important for the transition to find the correct view
                    enteringView.state = STAGED_ENTERING_STATE;
                    leavingView.state = STAGED_LEAVING_STATE;
                    // init the transition animation
                    var transAnimation = _transitionsTransition.Transition.create(_this2, opts);
                    if (opts.animate === false) {
                        // force it to not animate the elements, just apply the "to" styles
                        transAnimation.clearDuration();
                        transAnimation.duration(0);
                    }
                    var duration = transAnimation.duration();
                    if (duration > 64) {
                        // block any clicks during the transition and provide a
                        // fallback to remove the clickblock if something goes wrong
                        _this2.app.setEnabled(false, duration);
                        _this2.app.setTransitioning(true, duration);
                    }
                    // start the transition
                    transAnimation.play().then(function () {
                        // transition has completed, update each view's state
                        enteringView.state = ACTIVE_STATE;
                        leavingView.state = CACHED_STATE;
                        // dispose any views that shouldn't stay around
                        transAnimation.dispose();
                        enteringView.didEnter();
                        leavingView.didLeave();
                        // all done!
                        _this2._zone.run(function () {
                            _this2._transComplete();
                            callback();
                        });
                    });
                });
            });
        }

        /**
         * @private
         * TODO
         */
    }, {
        key: 'compileView',
        value: function compileView(componentType) {
            // create a new ion-view annotation
            var viewComponentType = (0, _configDecorators.makeComponent)(componentType, {
                selector: 'ion-view',
                host: {
                    '[class.pane-view]': '_paneView'
                }
            });
            // compile the Component
            return this._compiler.compileInHost(viewComponentType);
        }

        /**
         * @private
         * TODO
         */
    }, {
        key: 'loadNextToAnchor',
        value: function loadNextToAnchor(type, location, viewCtrl) {
            var providers = this.providers.concat(_angular2Angular2.Injector.resolve([(0, _angular2Angular2.provide)(_viewController.ViewController, { useValue: viewCtrl }), (0, _angular2Angular2.provide)(NavParams, { useValue: viewCtrl.params })]));
            return this._loader.loadNextToLocation(type, location, providers);
        }

        /**
         * @private
         * TODO
         */
    }, {
        key: 'swipeBackStart',
        value: function swipeBackStart() {
            var _this3 = this;

            if (!this.app.isEnabled() || !this.canSwipeBack()) {
                return;
            }
            // disables the app during the transition
            this.app.setEnabled(false);
            this.app.setTransitioning(true);
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
            enteringView.stage(function () {
                _this3._zone.runOutsideAngular(function () {
                    // set that the new view pushed on the stack is staged to be entering/leaving
                    // staged state is important for the transition to find the correct view
                    enteringView.state = STAGED_ENTERING_STATE;
                    leavingView.state = STAGED_LEAVING_STATE;
                    // init the swipe back transition animation
                    _this3._sbTrans = _transitionsTransition.Transition.create(_this3, opts);
                    _this3._sbTrans.easing('linear').progressStart();
                });
            });
        }

        /**
         * @private
         * TODO
         * @param {TODO} progress  TODO
         */
    }, {
        key: 'swipeBackProgress',
        value: function swipeBackProgress(value) {
            if (this._sbTrans) {
                // continue to disable the app while actively dragging
                this.app.setEnabled(false, 4000);
                this.app.setTransitioning(true, 4000);
                // set the transition animation's progress
                this._sbTrans.progress(value);
            }
        }

        /**
         * @private
         * @param {TODO} completeSwipeBack  Should the swipe back complete or not.
         * @param {number} rate  How fast it closes
         */
    }, {
        key: 'swipeBackEnd',
        value: function swipeBackEnd(completeSwipeBack, rate) {
            var _this4 = this;

            if (!this._sbTrans) return;
            // disables the app during the transition
            this.app.setEnabled(false);
            this.app.setTransitioning(true);
            this._sbTrans.progressEnd(completeSwipeBack, rate).then(function () {
                _this4._zone.run(function () {
                    // find the views that were entering and leaving
                    var enteringView = _this4.getStagedEnteringView();
                    var leavingView = _this4.getStagedLeavingView();
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
         * TODO
         */
    }, {
        key: '_sbComplete',
        value: function _sbComplete() {
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
         * TODO
         * @param {TODO} val  TODO
         * @returns {TODO} TODO
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
         * @returns {boolean}
         */
    }, {
        key: 'canSwipeBack',
        value: function canSwipeBack() {
            return this._sbEnabled && this.canGoBack();
        }

        /**
         * Returns `true` if there's a valid previous view that we can pop back to.
         * Otherwise returns false.
         * @returns {boolean}
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
            var _this5 = this;

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
            this.app.setTransitioning(false);
            this._sbComplete();
            (0, _utilDom.raf)(function () {
                _this5._cleanup();
            });
        }
    }, {
        key: '_cleanup',
        value: function _cleanup(activeView) {
            var _this6 = this;

            // the active view, and the previous view, should be rendered in dom and ready to go
            // all others, like a cached page 2 back, should be display: none and not rendered
            var destroys = [];
            activeView = activeView || this.getActive();
            var previousView = this.getPrevious(activeView);
            this._views.forEach(function (view) {
                if (view) {
                    if (view.shouldDestroy) {
                        destroys.push(view);
                    } else {
                        var isActiveView = view === activeView;
                        var isPreviousView = view === previousView;
                        view.domCache && view.domCache(isActiveView, isPreviousView);
                    }
                }
            });
            // all views being destroyed should be removed from the list of views
            // and completely removed from the dom
            destroys.forEach(function (view) {
                _this6._remove(view);
                view.destroy();
            });
        }
    }, {
        key: 'addHasViews',
        value: function addHasViews() {
            var _this7 = this;

            if (this._views.length === 1) {
                this._zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this7.renderer.setElementClass(_this7.elementRef, 'has-views', true);
                    }, 200);
                });
            }
        }

        /**
         * TODO
         * @param {TODO} nbContainer  TODO
         * @returns {TODO} TODO
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
         * TODO
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
         * TODO
         * @param {TODO} view  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: '_add',
        value: function _add(view) {
            this._incrementId(view);
            this._views.push(view);
        }
    }, {
        key: '_incrementId',
        value: function _incrementId(view) {
            view.id = this.id + '-' + ++this._ids;
        }

        /**
         * @private
         * TODO
         * @param {TODO} viewOrIndex  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: '_remove',
        value: function _remove(viewOrIndex) {
            util.array.remove(this._views, viewOrIndex);
        }

        /**
         * TODO
         * @returns {TODO} TODO
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
         * TODO
         * @param {TODO} index  TODO
         * @returns {TODO} TODO
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
         * TODO
         * @param {TODO} view  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'getPrevious',
        value: function getPrevious(view) {
            if (view) {
                var viewIndex = this._views.indexOf(view);
                for (var i = viewIndex - 1; i >= 0; i--) {
                    if (!this._views[i].shouldDestroy) {
                        return this._views[i];
                    }
                }
            }
            return null;
        }

        /**
         * TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'getStagedEnteringView',
        value: function getStagedEnteringView() {
            for (var i = 0, ii = this._views.length; i < ii; i++) {
                if (this._views[i].state === STAGED_ENTERING_STATE) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'getStagedLeavingView',
        value: function getStagedLeavingView() {
            for (var i = 0, ii = this._views.length; i < ii; i++) {
                if (this._views[i].state === STAGED_LEAVING_STATE) {
                    return this._views[i];
                }
            }
            return null;
        }

        /**
         * First view in this nav controller's stack. This would
         * not return an view which is about to be destroyed.
         * @returns {TODO} TODO
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
         * @returns {TODO} TODO
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
         * TODO
         * @param {TODO} view  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'indexOf',
        value: function indexOf(view) {
            return this._views.indexOf(view);
        }

        /**
         * Number of sibling views in the nav controller. This does
         * not include views which are about to be destroyed.
         * @returns {TODO} TODO
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
         * TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'instances',
        value: function instances() {
            var instances = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var view = _step.value;

                    if (view.instance) {
                        instances.push(view.instance);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return instances;
        }

        /**
         * TODO
         * @param {TODO} view  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'isActive',
        value: function isActive(view) {
            return view && view.state === ACTIVE_STATE;
        }

        /**
         * TODO
         * @param {TODO} view  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: 'isStagedEntering',
        value: function isStagedEntering(view) {
            return view && view.state === STAGED_ENTERING_STATE;
        }

        /**
         * TODO
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
     * TODO
     * @param {TODO} data  TODO
     */

    function NavParams(data) {
        _classCallCheck(this, NavParams);

        this.data = data || {};
    }

    /**
     * TODO
     * @param {TODO} param  TODO
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