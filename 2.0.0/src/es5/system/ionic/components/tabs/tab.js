System.register("ionic/components/tabs/tab", ["angular2/angular2", "../app/app", "../../config/config", "../../util/keyboard", "../nav/nav-controller", "./tabs"], function (_export) {
    /**
     * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
     * of the Component docs._
     *
     * Tab components are basic navigation controllers used with Tabs.  Much like
     * Nav, they are a subclass of NavController and can be used to navigate
     * to pages in and manipulate the navigation stack of a particular tab.
     *
     * For more information on using navigation controllers like Tab or [Nav](../../nav/Nav/),
     * take a look at the [NavController API reference](../NavController/).
     *
     * See the [Tabs API reference](../Tabs/) for more details on configuring Tabs
     * and the TabBar.
     *
     * Like Nav, you must set a root page to be loaded initially for each Tab with
     * the 'root' property:
     * ```
     * import {GettingStartedPage} from 'getting-started';
     * @App({
     *   template: `<ion-tabs>
     *                <ion-tab [root]="tabOneRoot"></ion-tab>
     *                <ion-tab [root]="tabTwoRoot"></ion-tab>
     *              <ion-tabs>`
     * })
     * class MyApp {
     *   constructor(){
     *     this.tabOneRoot = GettingStartedPage;
     *     this.tabTwoRoot = GettingStartedPage;
     *   }
     * }
     * ```
     * <h3 id="tab_properties">Tab Properties</h3>
     * The Tabs component automatically creates the TabBar from the properties you
     * set on each Tab.
     *
     * To change the title and icon, use the `tab-title` and `tab-icon`
     * inputs:
     * ```html
     * <ion-tabs>
     * 	 <ion-tab tab-title="Home" tab-icon="home" [root]="tabOneRoot"></ion-tab>
     * 	 <ion-tab tab-title="Login" tab-icon="star" [root]="tabTwoRoot"></ion-tab>
     * <ion-tabs>
     * ```
     */
    "use strict";

    var ChangeDetectorRef, Component, Host, ElementRef, Compiler, AppViewManager, NgZone, Renderer, IonicApp, Config, Keyboard, NavController, Tabs, __decorate, __metadata, __param, Tab, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            ChangeDetectorRef = _angular2Angular2.ChangeDetectorRef;
            Component = _angular2Angular2.Component;
            Host = _angular2Angular2.Host;
            ElementRef = _angular2Angular2.ElementRef;
            Compiler = _angular2Angular2.Compiler;
            AppViewManager = _angular2Angular2.AppViewManager;
            NgZone = _angular2Angular2.NgZone;
            Renderer = _angular2Angular2.Renderer;
        }, function (_appApp) {
            IonicApp = _appApp.IonicApp;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_utilKeyboard) {
            Keyboard = _utilKeyboard.Keyboard;
        }, function (_navNavController) {
            NavController = _navNavController.NavController;
        }, function (_tabs) {
            Tabs = _tabs.Tabs;
        }],
        execute: function () {
            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
                switch (arguments.length) {
                    case 2:
                        return decorators.reduceRight(function (o, d) {
                            return d && d(o) || o;
                        }, target);
                    case 3:
                        return decorators.reduceRight(function (o, d) {
                            return (d && d(target, key), void 0);
                        }, void 0);
                    case 4:
                        return decorators.reduceRight(function (o, d) {
                            return d && d(target, key, o) || o;
                        }, desc);
                }
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            __param = undefined && undefined.__param || function (paramIndex, decorator) {
                return function (target, key) {
                    decorator(target, key, paramIndex);
                };
            };

            Tab = (function (_NavController) {
                _inherits(Tab, _NavController);

                function Tab(parentTabs, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
                    _classCallCheck(this, Tab);

                    // A Tab is a NavController for its child pages
                    _get(Object.getPrototypeOf(Tab.prototype), "constructor", this).call(this, parentTabs, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd);
                    this._isInitial = parentTabs.add(this);
                    this._panelId = 'tabpanel-' + this.id;
                    this._btnId = 'tab-' + this.id;
                }

                /**
                 * @private
                 */

                _createClass(Tab, [{
                    key: "onInit",
                    value: function onInit() {
                        var _this = this;

                        if (this._isInitial) {
                            this.parent.select(this);
                        } else if (this.parent.preloadTabs) {
                            this._loadTimer = setTimeout(function () {
                                if (!_this._loaded) {
                                    _this.load({
                                        animate: false,
                                        preload: true,
                                        postLoad: function postLoad(viewCtrl) {
                                            var navbar = viewCtrl.getNavbar();
                                            navbar && navbar.setHidden(true);
                                        }
                                    }, function () {});
                                }
                            }, 1000 * this.index);
                        }
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "load",
                    value: function load(opts, done) {
                        if (!this._loaded && this.root) {
                            this.push(this.root, null, opts, done);
                            this._loaded = true;
                        } else {
                            done();
                        }
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "loadPage",
                    value: function loadPage(viewCtrl, navbarContainerRef, opts, done) {
                        // by default a page's navbar goes into the shared tab's navbar section
                        navbarContainerRef = this.parent.navbarContainerRef;
                        var isTabSubPage = this.parent.subPages && viewCtrl.index > 0;
                        if (isTabSubPage) {
                            // a subpage, that's not the first index
                            // should not use the shared tabs navbar section, but use it's own
                            navbarContainerRef = null;
                        }
                        _get(Object.getPrototypeOf(Tab.prototype), "loadPage", this).call(this, viewCtrl, navbarContainerRef, opts, function () {
                            if (viewCtrl.instance) {
                                viewCtrl.instance._tabSubPage = isTabSubPage;
                            }
                            done();
                        });
                    }
                }, {
                    key: "setSelected",
                    value: function setSelected(isSelected) {
                        this.isSelected = isSelected;
                        this.hideNavbars(!isSelected);
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "hideNavbars",
                    value: function hideNavbars(shouldHideNavbars) {
                        this._views.forEach(function (viewCtrl) {
                            var navbar = viewCtrl.getNavbar();
                            navbar && navbar.setHidden(shouldHideNavbars);
                        });
                    }
                }, {
                    key: "onDestroy",
                    value: function onDestroy() {
                        clearTimeout(this._loadTimer);
                    }
                }, {
                    key: "index",
                    get: function get() {
                        return this.parent.getIndex(this);
                    }
                }]);

                return Tab;
            })(NavController);

            _export("Tab", Tab);

            _export("Tab", Tab = __decorate([Component({
                selector: 'ion-tab',
                inputs: ['root', 'tabTitle', 'tabIcon'],
                host: {
                    '[class.show-tab]': 'isSelected',
                    '[attr.id]': '_panelId',
                    '[attr.aria-labelledby]': '_btnId',
                    'role': 'tabpanel'
                },
                template: '<template #contents></template>'
            }), __param(0, Host()), __metadata('design:paramtypes', [typeof (_a = typeof Tabs !== 'undefined' && Tabs) === 'function' && _a || Object, typeof (_b = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _b || Object, typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c || Object, typeof (_d = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _d || Object, typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e || Object, typeof (_f = typeof Compiler !== 'undefined' && Compiler) === 'function' && _f || Object, typeof (_g = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _g || Object, typeof (_h = typeof NgZone !== 'undefined' && NgZone) === 'function' && _h || Object, typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j || Object, typeof (_k = typeof ChangeDetectorRef !== 'undefined' && ChangeDetectorRef) === 'function' && _k || Object])], Tab));
        }
    };
});