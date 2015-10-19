System.register("ionic/components/tabs/tabs", ["angular2/angular2", "../ion", "../app/app", "../../config/config", "../nav/view-controller", "../../config/decorators", "../icon/icon"], function (_export) {
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
     * `tab-bar-placement` property:
     *
     * ```ts
     * <ion-tabs tab-bar-placement="top">
     *   <ion-tab [root]="tabRoot"></ion-tab>
     * </ion-tabs>
     * ```
     *
     * To change the location of the icons in the TabBar, use the `tab-bar-icons`
     * property:
     * ```ts
     * <ion-tabs tab-bar-icons="bottom">
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

    var Directive, ElementRef, Optional, Host, NgFor, forwardRef, ViewContainerRef, Ion, IonicApp, Config, ViewController, ConfigComponent, Icon, __decorate, __metadata, __param, Tabs, _tabIds, TabButton, TabHighlight, TabNavBarAnchor, _a, _b, _c, _d, _e, _f, _g, _h, _j;

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
            forwardRef = _angular2Angular2.forwardRef;
            ViewContainerRef = _angular2Angular2.ViewContainerRef;
        }, function (_ion) {
            Ion = _ion.Ion;
        }, function (_appApp) {
            IonicApp = _appApp.IonicApp;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_navViewController) {
            ViewController = _navViewController.ViewController;
        }, function (_configDecorators) {
            ConfigComponent = _configDecorators.ConfigComponent;
        }, function (_iconIcon) {
            Icon = _iconIcon.Icon;
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

                function Tabs(app, config, elementRef, viewCtrl) {
                    var _this = this;

                    _classCallCheck(this, Tabs);

                    _get(Object.getPrototypeOf(Tabs.prototype), "constructor", this).call(this, elementRef, config);
                    this.app = app;
                    this.preload = config.get('preloadTabs');
                    // collection of children "Tab" instances, which extends NavController
                    this._tabs = [];
                    // Tabs may also be an actual ViewController which was navigated to
                    // if Tabs is static and not navigated to within a NavController
                    // then skip this and don't treat it as it's own ViewController
                    if (viewCtrl) {
                        this._ready = new Promise(function (res) {
                            _this._isReady = res;
                        });
                        viewCtrl.onReady = function () {
                            return _this._ready;
                        };
                    }
                }

                /**
                 * @private
                 */

                _createClass(Tabs, [{
                    key: "add",
                    value: function add(tab) {
                        tab.id = ++_tabIds;
                        tab.btnId = 'tab-' + tab.id;
                        tab.panelId = 'tabpanel-' + tab.id;
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
                        var _this2 = this;

                        var selectedTab = null;
                        if (typeof tabOrIndex === 'number') {
                            selectedTab = this.getByIndex(tabOrIndex);
                        } else {
                            selectedTab = tabOrIndex;
                        }
                        if (!selectedTab || !this.app.isEnabled()) {
                            return Promise.reject();
                        }
                        var deselectedTab = this.getSelected();
                        if (selectedTab === deselectedTab) {
                            // no change
                            return this._touchActive(selectedTab);
                        }
                        console.debug('select tab', selectedTab.id);
                        selectedTab.load(function () {
                            _this2._isReady && _this2._isReady();
                            _this2._tabs.forEach(function (tab) {
                                tab.isSelected = tab === selectedTab;
                                tab._views.forEach(function (viewCtrl) {
                                    var navbarRef = viewCtrl.navbarRef();
                                    if (navbarRef) {
                                        navbarRef.nativeElement.classList[tab.isSelected ? 'remove' : 'add']('deselected-tab');
                                    }
                                });
                            });
                            _this2.highlight && _this2.highlight.select(selectedTab);
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
                     * "Touch" the active tab, either going back to the root view of the tab
                     * or scrolling the tab to the top
                     */
                }, {
                    key: "_touchActive",
                    value: function _touchActive(tab) {
                        var stateLen = tab.length();
                        if (stateLen > 1) {
                            // Pop to the root view
                            return tab.popToRoot();
                        }
                        return Promise.resolve();
                    }
                }]);

                return Tabs;
            })(Ion);

            _export("Tabs", Tabs);

            _export("Tabs", Tabs = __decorate([ConfigComponent({
                selector: 'ion-tabs',
                defaultInputs: {
                    'tabBarPlacement': 'bottom',
                    'tabBarIcons': 'top',
                    'preloadTabs': true
                },
                template: '<ion-navbar-section>' + '<template navbar-anchor></template>' + '</ion-navbar-section>' + '<ion-tab-bar-section>' + '<tab-bar role="tablist">' + '<a *ng-for="#t of _tabs" [tab]="t" class="tab-button" role="tab">' + '<icon [name]="t.tabIcon" [is-active]="t.isSelected" class="tab-button-icon"></icon>' + '<span class="tab-button-text">{{t.tabTitle}}</span>' + '</a>' + '<tab-highlight></tab-highlight>' + '</tab-bar>' + '</ion-tab-bar-section>' + '<ion-content-section>' + '<ng-content></ng-content>' + '</ion-content-section>',
                directives: [Icon, NgFor, forwardRef(function () {
                    return TabButton;
                }), forwardRef(function () {
                    return TabHighlight;
                }), forwardRef(function () {
                    return TabNavBarAnchor;
                })]
            }), __param(3, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof ViewController !== 'undefined' && ViewController) === 'function' && _d || Object])], Tabs));
            _tabIds = -1;

            /**
             * @private
             * TODO
             */

            TabButton = (function (_Ion2) {
                _inherits(TabButton, _Ion2);

                function TabButton(tabs, config, elementRef) {
                    _classCallCheck(this, TabButton);

                    _get(Object.getPrototypeOf(TabButton.prototype), "constructor", this).call(this, elementRef, config);
                    this.tabs = tabs;
                    if (config.get('hoverCSS') === false) {
                        elementRef.nativeElement.classList.add('disable-hover');
                    }
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
                    value: function onClick(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();
                        this.tabs.select(this.tab);
                    }
                }]);

                return TabButton;
            })(Ion);

            TabButton = __decorate([Directive({
                selector: '.tab-button',
                inputs: ['tab'],
                host: {
                    '[attr.id]': 'tab.btnId',
                    '[attr.aria-controls]': 'tab.panelId',
                    '[attr.aria-selected]': 'tab.isSelected',
                    '[class.has-title]': 'hasTitle',
                    '[class.has-icon]': 'hasIcon',
                    '[class.has-title-only]': 'hasTitleOnly',
                    '[class.icon-only]': 'hasIconOnly',
                    '(click)': 'onClick($event)'
                }
            }), __param(0, Host()), __metadata('design:paramtypes', [Tabs, typeof (_e = typeof Config !== 'undefined' && Config) === 'function' && _e || Object, typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f || Object])], TabButton);
            /**
             * @private
             * TODO
             */

            TabHighlight = (function () {
                function TabHighlight(tabs, config, elementRef) {
                    _classCallCheck(this, TabHighlight);

                    if (config.get('mode') === 'md') {
                        tabs.highlight = this;
                        this.elementRef = elementRef;
                    }
                }

                _createClass(TabHighlight, [{
                    key: "select",
                    value: function select(tab) {
                        var _this3 = this;

                        setTimeout(function () {
                            var d = tab.btn.getDimensions();
                            var ele = _this3.elementRef.nativeElement;
                            ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
                            if (!_this3.init) {
                                _this3.init = true;
                                setTimeout(function () {
                                    ele.classList.add('animate');
                                }, 64);
                            }
                        }, 32);
                    }
                }]);

                return TabHighlight;
            })();

            TabHighlight = __decorate([Directive({
                selector: 'tab-highlight'
            }), __param(0, Host()), __metadata('design:paramtypes', [Tabs, typeof (_g = typeof Config !== 'undefined' && Config) === 'function' && _g || Object, typeof (_h = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _h || Object])], TabHighlight);
            /**
             * @private
             * TODO
             */

            TabNavBarAnchor = function TabNavBarAnchor(tabs, viewContainerRef) {
                _classCallCheck(this, TabNavBarAnchor);

                tabs.navbarContainerRef = viewContainerRef;
            };

            TabNavBarAnchor = __decorate([Directive({ selector: 'template[navbar-anchor]' }), __param(0, Host()), __metadata('design:paramtypes', [Tabs, typeof (_j = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _j || Object])], TabNavBarAnchor);
        }
    };
});