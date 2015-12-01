System.register("ionic/components/tabs/tabs", ["angular2/angular2", "../ion", "../app/id", "../../config/config", "../../platform/platform", "../nav/nav-controller", "../nav/view-controller", "../../config/decorators", "../icon/icon", "../../util/dom"], function (_export) {
    /**
     * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
     * of the Component docs._
     *
     * The Tabs component is a container with a TabBar and any number of
     * individual Tab components. On iOS, the TabBar is placed on the bottom of
     * the screen, while on Android it is at the top.
     *
     * See the [Tab API reference](../Tab/) for more details on individual Tab components.
     *
     * The TabBar is automatically created for you using the
     * [properties you set on each Tab](../Tab/#tab_properties).
     *
     * To override the platform specific TabBar placement, use the
     * `tabbar-placement` property:
     *
     * ```html
     * <ion-tabs tabbar-placement="top">
     *   <ion-tab [root]="tabRoot"></ion-tab>
     * </ion-tabs>
     * ```
     *
     * To change the location of the icons in the TabBar, use the `tabbar-icons`
     * property:
     * ```html
     * <ion-tabs tabbar-icons="bottom">
     *   <ion-tab [root]="tabRoot"></ion-tab>
     * </ion-tabs>
     * ```
     *
     * You can select tabs programatically by injecting Tabs into any child
     * component, and using the [select()](#select) method:
     * ```ts
     * @Page({
     *   template: `<button (click)="goToTabTwo()">Go to Tab2</button>`
     * })
     * class TabOne {
     *   constructor(tabs: Tabs){
     *     this.tabs = tabs;
     *   }
     *
     *   goToTabTwo() {
     *     this.tabs.select(this.tabs.tabs[1]);
     *   }
     * }
     * ```
     * The [tabs](#tabs) property is an array of all child [Tab](../Tab/) components
     * of that Tabs component.
     *
     */
    "use strict";

    var Directive, ElementRef, Optional, Host, NgFor, NgIf, forwardRef, ViewContainerRef, Ion, Attr, Config, Platform, NavController, ViewController, ConfigComponent, Icon, rafFrames, __decorate, __metadata, __param, Tabs, tabIds, TabButton, TabHighlight, TabNavBarAnchor, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            Directive = _angular2Angular2.Directive;
            ElementRef = _angular2Angular2.ElementRef;
            Optional = _angular2Angular2.Optional;
            Host = _angular2Angular2.Host;
            NgFor = _angular2Angular2.NgFor;
            NgIf = _angular2Angular2.NgIf;
            forwardRef = _angular2Angular2.forwardRef;
            ViewContainerRef = _angular2Angular2.ViewContainerRef;
        }, function (_ion) {
            Ion = _ion.Ion;
        }, function (_appId) {
            Attr = _appId.Attr;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_platformPlatform) {
            Platform = _platformPlatform.Platform;
        }, function (_navNavController) {
            NavController = _navNavController.NavController;
        }, function (_navViewController) {
            ViewController = _navViewController.ViewController;
        }, function (_configDecorators) {
            ConfigComponent = _configDecorators.ConfigComponent;
        }, function (_iconIcon) {
            Icon = _iconIcon.Icon;
        }, function (_utilDom) {
            rafFrames = _utilDom.rafFrames;
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

            Tabs = (function (_Ion) {
                _inherits(Tabs, _Ion);

                /**
                 * Hi, I'm "Tabs". I'm really just another Page, with a few special features.
                 * "Tabs" can be a sibling to other pages that can be navigated to, which those
                 * sibling pages may or may not have their own tab bars (doesn't matter). The fact
                 * that "Tabs" can happen to have children "Tab" classes, and each "Tab" can have
                 * children pages with their own "ViewController" instance, as nothing to do with the
                 * point that "Tabs" is itself is just a page with its own instance of ViewController.
                 */

                function Tabs(config, elementRef, viewCtrl, navCtrl, platform) {
                    var _this = this;

                    _classCallCheck(this, Tabs);

                    _get(Object.getPrototypeOf(Tabs.prototype), "constructor", this).call(this, elementRef, config);
                    this.platform = platform;
                    this.parent = navCtrl;
                    this.subPages = config.get('tabSubPages');
                    this._tabs = [];
                    this._id = ++tabIds;
                    this._ids = -1;
                    this._onReady = null;
                    // Tabs may also be an actual ViewController which was navigated to
                    // if Tabs is static and not navigated to within a NavController
                    // then skip this and don't treat it as it's own ViewController
                    if (viewCtrl) {
                        viewCtrl.setContent(this);
                        viewCtrl.setContentRef(elementRef);
                        viewCtrl.onReady = function (done) {
                            _this._onReady = done;
                        };
                    }
                }

                /**
                 * @private
                 */

                _createClass(Tabs, [{
                    key: "onInit",
                    value: function onInit() {
                        var _this2 = this;

                        _get(Object.getPrototypeOf(Tabs.prototype), "onInit", this).call(this);
                        this.preloadTabs = this.preloadTabs !== "false" && this.preloadTabs !== false;
                        if (this._highlight) {
                            this.platform.onResize(function () {
                                _this2._highlight.select(_this2.getSelected());
                            });
                        }
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "add",
                    value: function add(tab) {
                        tab.id = this._id + '-' + ++this._ids;
                        this._tabs.push(tab);
                        return this._tabs.length === 1;
                    }

                    /**
                     * TODO
                     * @param {Tab} tab  TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: "select",
                    value: function select(tabOrIndex) {
                        var _this3 = this;

                        var selectedTab = typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex;
                        if (!selectedTab) {
                            return Promise.reject();
                        }
                        var deselectedTab = this.getSelected();
                        if (selectedTab === deselectedTab) {
                            // no change
                            return this._touchActive(selectedTab);
                        }
                        console.time('Tabs#select ' + selectedTab.id);
                        var opts = {
                            animate: false
                        };
                        var deselectedPage = undefined;
                        if (deselectedTab) {
                            deselectedPage = deselectedTab.getActive();
                            deselectedPage && deselectedPage.willLeave();
                        }
                        var selectedPage = selectedTab.getActive();
                        selectedPage && selectedPage.willEnter();
                        selectedTab.load(opts, function () {
                            _this3._tabs.forEach(function (tab) {
                                tab.setSelected(tab === selectedTab);
                            });
                            _this3._highlight && _this3._highlight.select(selectedTab);
                            selectedPage && selectedPage.didEnter();
                            deselectedPage && deselectedPage.didLeave();
                            if (_this3._onReady) {
                                _this3._onReady();
                                _this3._onReady = null;
                            }
                            console.time('Tabs#select ' + selectedTab.id);
                        });
                    }

                    /**
                     * TODO
                     * @param {TODO} index  TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: "getByIndex",
                    value: function getByIndex(index) {
                        if (index < this._tabs.length && index > -1) {
                            return this._tabs[index];
                        }
                        return null;
                    }
                }, {
                    key: "getSelected",
                    value: function getSelected() {
                        for (var i = 0; i < this._tabs.length; i++) {
                            if (this._tabs[i].isSelected) {
                                return this._tabs[i];
                            }
                        }
                        return null;
                    }
                }, {
                    key: "getIndex",
                    value: function getIndex(tab) {
                        return this._tabs.indexOf(tab);
                    }

                    /**
                     * @private
                     * "Touch" the active tab, going back to the root view of the tab
                     * or optionally letting the tab handle the event
                     */
                }, {
                    key: "_touchActive",
                    value: function _touchActive(tab) {
                        var active = tab.getActive();
                        if (!active) {
                            return Promise.resolve();
                        }
                        var instance = active.instance;
                        // If they have a custom tab selected handler, call it
                        if (instance.tabSelected) {
                            return instance.tabSelected();
                        }
                        // If we're a few pages deep, pop to root
                        if (tab.length() > 1) {
                            // Pop to the root view
                            return tab.popToRoot();
                        }
                        // Otherwise, if the page we're on is not our real root, reset it to our
                        // default root type
                        if (tab.root != active.componentType) {
                            return tab.setRoot(tab.root);
                        }
                        // And failing all of that, we do something safe and secure
                        return Promise.resolve();
                    }
                }]);

                return Tabs;
            })(Ion);

            _export("Tabs", Tabs);

            _export("Tabs", Tabs = __decorate([ConfigComponent({
                selector: 'ion-tabs',
                defaultInputs: {
                    'tabbarPlacement': 'bottom',
                    'tabbarIcons': 'top',
                    'tabbarStyle': 'default',
                    'preloadTabs': false
                },
                template: '<ion-navbar-section>' + '<template navbar-anchor></template>' + '</ion-navbar-section>' + '<ion-tabbar-section>' + '<tabbar role="tablist" [attr]="tabbarStyle">' + '<a *ng-for="#t of _tabs" [tab]="t" class="tab-button" role="tab">' + '<icon [name]="t.tabIcon" [is-active]="t.isSelected" class="tab-button-icon"></icon>' + '<span class="tab-button-text">{{t.tabTitle}}</span>' + '</a>' + '<tab-highlight></tab-highlight>' + '</tabbar>' + '</ion-tabbar-section>' + '<ion-content-section>' + '<ng-content></ng-content>' + '</ion-content-section>',
                directives: [Icon, NgFor, NgIf, Attr, forwardRef(function () {
                    return TabButton;
                }), forwardRef(function () {
                    return TabHighlight;
                }), forwardRef(function () {
                    return TabNavBarAnchor;
                })]
            }), __param(2, Optional()), __param(3, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof ViewController !== 'undefined' && ViewController) === 'function' && _c || Object, typeof (_d = typeof NavController !== 'undefined' && NavController) === 'function' && _d || Object, typeof (_e = typeof Platform !== 'undefined' && Platform) === 'function' && _e || Object])], Tabs));
            tabIds = -1;

            /**
             * @private
             */

            TabButton = (function (_Ion2) {
                _inherits(TabButton, _Ion2);

                function TabButton(tabs, config, elementRef) {
                    _classCallCheck(this, TabButton);

                    _get(Object.getPrototypeOf(TabButton.prototype), "constructor", this).call(this, elementRef, config);
                    this.tabs = tabs;
                    this.disHover = config.get('hoverCSS') === false;
                }

                _createClass(TabButton, [{
                    key: "onInit",
                    value: function onInit() {
                        this.tab.btn = this;
                        this.hasTitle = !!this.tab.tabTitle;
                        this.hasIcon = !!this.tab.tabIcon;
                        this.hasTitleOnly = this.hasTitle && !this.hasIcon;
                        this.hasIconOnly = this.hasIcon && !this.hasTitle;
                    }
                }, {
                    key: "onClick",
                    value: function onClick() {
                        this.tabs.select(this.tab);
                    }
                }]);

                return TabButton;
            })(Ion);

            TabButton = __decorate([Directive({
                selector: '.tab-button',
                inputs: ['tab'],
                host: {
                    '[attr.id]': 'tab._btnId',
                    '[attr.aria-controls]': 'tab._panelId',
                    '[attr.aria-selected]': 'tab.isSelected',
                    '[class.has-title]': 'hasTitle',
                    '[class.has-icon]': 'hasIcon',
                    '[class.has-title-only]': 'hasTitleOnly',
                    '[class.icon-only]': 'hasIconOnly',
                    '[class.disable-hover]': 'disHover',
                    '(click)': 'onClick()'
                }
            }), __param(0, Host()), __metadata('design:paramtypes', [Tabs, typeof (_f = typeof Config !== 'undefined' && Config) === 'function' && _f || Object, typeof (_g = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _g || Object])], TabButton);
            /**
             * @private
             */

            TabHighlight = (function () {
                function TabHighlight(tabs, config, elementRef) {
                    _classCallCheck(this, TabHighlight);

                    if (config.get('tabbarHighlight')) {
                        tabs._highlight = this;
                        this.elementRef = elementRef;
                    }
                }

                _createClass(TabHighlight, [{
                    key: "select",
                    value: function select(tab) {
                        var _this4 = this;

                        rafFrames(3, function () {
                            var d = tab.btn.getDimensions();
                            var ele = _this4.elementRef.nativeElement;
                            ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
                            if (!_this4.init) {
                                _this4.init = true;
                                rafFrames(6, function () {
                                    ele.classList.add('animate');
                                });
                            }
                        });
                    }
                }]);

                return TabHighlight;
            })();

            TabHighlight = __decorate([Directive({
                selector: 'tab-highlight'
            }), __param(0, Host()), __metadata('design:paramtypes', [Tabs, typeof (_h = typeof Config !== 'undefined' && Config) === 'function' && _h || Object, typeof (_j = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _j || Object])], TabHighlight);
            /**
             * @private
             */

            TabNavBarAnchor = function TabNavBarAnchor(tabs, viewContainerRef) {
                _classCallCheck(this, TabNavBarAnchor);

                tabs.navbarContainerRef = viewContainerRef;
            };

            TabNavBarAnchor = __decorate([Directive({ selector: 'template[navbar-anchor]' }), __param(0, Host()), __metadata('design:paramtypes', [Tabs, typeof (_k = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _k || Object])], TabNavBarAnchor);
        }
    };
});