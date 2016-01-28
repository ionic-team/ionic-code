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
var common_1 = require('angular2/common');
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var tab_button_1 = require('./tab-button');
var tab_highlight_1 = require('./tab-highlight');
var ion_1 = require('../ion');
var platform_1 = require('../../platform/platform');
var nav_controller_1 = require('../nav/nav-controller');
var view_controller_1 = require('../nav/view-controller');
var icon_1 = require('../icon/icon');
var util_1 = require('../../util/util');
/**
 * @name Tabs
 * @property {any} [tabbarPlacement] - set position of the tabbar, top or bottom
 * @property {any} [tabbarIcons] - set the position of the tabbar's icons: top, bottom, left, right, hide
 * @property {any} [preloadTabs] - sets whether to preload all the tabs, true or false
 * @usage
* ```html
 * <ion-tabs>
 *   <ion-tab [root]="tabRoot"></ion-tab>
 * </ion-tabs>
 * ```
 * @description
 * _For basic Tabs usage, see the [Tabs section](../../../../components/#tabs)
 * of the Component docs._
 *
 * The Tabs component is a container with a TabBar and any number of
 * individual Tab components. On iOS, the TabBar is placed on the bottom of
 * the screen, while on Android it is at the top.
 *
 * @see {@link /docs/v2/components#tabs Tabs Component Docs}
 * @see {@link ../Tab Tab API Docs}
 */
var Tabs = (function (_super) {
    __extends(Tabs, _super);
    function Tabs(viewCtrl, parent, _app, _config, _elementRef, _platform, _renderer) {
        var _this = this;
        _super.call(this, _elementRef);
        this.parent = parent;
        this._app = _app;
        this._config = _config;
        this._elementRef = _elementRef;
        this._platform = _platform;
        this._renderer = _renderer;
        this._ids = -1;
        this._tabs = [];
        this._onReady = null;
        this.change = new core_1.EventEmitter();
        this.id = ++tabIds;
        this.subPages = _config.getBoolean('tabSubPages');
        this._useHighlight = _config.getBoolean('tabbarHighlight');
        // Tabs may also be an actual ViewController which was navigated to
        // if Tabs is static and not navigated to within a NavController
        // then skip this and don't treat it as it's own ViewController
        if (viewCtrl) {
            viewCtrl.setContent(this);
            viewCtrl.setContentRef(_elementRef);
            viewCtrl.onReady = function (done) {
                _this._onReady = done;
            };
        }
    }
    /**
     * @private
     */
    Tabs.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.preloadTabs = (this.preloadTabs !== "false" && this.preloadTabs !== false);
        this._setConfig('tabbarPlacement', 'bottom');
        this._setConfig('tabbarIcons', 'top');
        this._setConfig('preloadTabs', false);
        if (this._useHighlight) {
            this._platform.onResize(function () {
                _this._highlight.select(_this.getSelected());
            });
        }
        this._btns.toArray().forEach(function (tabButton) {
            tabButton.select.subscribe(function (tab) {
                _this.select(tab);
            });
        });
        var selectedIndex = this.selectedIndex ? parseInt(this.selectedIndex, 10) : 0;
        this._tabs.forEach(function (tab, index) {
            if (index === selectedIndex) {
                _this.select(tab);
            }
            else if (_this.preloadTabs) {
                tab.preload(1000 * index);
            }
        });
    };
    /**
     * @private
     */
    Tabs.prototype._setConfig = function (attrKey, fallback) {
        var val = this[attrKey];
        if (util_1.isUndefined(val)) {
            val = this._config.get(attrKey);
        }
        this._renderer.setElementAttribute(this._elementRef.nativeElement, attrKey, val);
    };
    /**
     * @private
     */
    Tabs.prototype.add = function (tab) {
        tab.id = this.id + '-' + (++this._ids);
        this._tabs.push(tab);
    };
    /**
     * @param {number} index Index of the tab you want to select
     */
    Tabs.prototype.select = function (tabOrIndex) {
        var _this = this;
        var selectedTab = (typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex);
        if (!selectedTab) {
            return;
        }
        var deselectedTab = this.getSelected();
        if (selectedTab === deselectedTab) {
            // no change
            return this._touchActive(selectedTab);
        }
        void 0;
        var opts = {
            animate: false
        };
        var deselectedPage;
        if (deselectedTab) {
            deselectedPage = deselectedTab.getActive();
            deselectedPage && deselectedPage.willLeave();
        }
        var selectedPage = selectedTab.getActive();
        selectedPage && selectedPage.willEnter();
        selectedTab.load(opts, function () {
            selectedTab.select.emit(selectedTab);
            _this.change.emit(selectedTab);
            if (selectedTab.root) {
                // only show the selectedTab if it has a root
                // it's possible the tab is only for opening modal's or signing out
                // and doesn't actually have content. In the case there's no content
                // for a tab then do nothing and leave the current view as is
                _this._tabs.forEach(function (tab) {
                    tab.setSelected(tab === selectedTab);
                });
                if (_this._useHighlight) {
                    _this._highlight.select(selectedTab);
                }
            }
            selectedPage && selectedPage.didEnter();
            deselectedPage && deselectedPage.didLeave();
            if (_this._onReady) {
                _this._onReady();
                _this._onReady = null;
            }
            void 0;
        });
    };
    /**
     * @param {number} index Index of the tab you want to get
     * @returns {Any} Tab Returs the tab who's index matches the one passed
     */
    Tabs.prototype.getByIndex = function (index) {
        if (index < this._tabs.length && index > -1) {
            return this._tabs[index];
        }
        return null;
    };
    /**
     * @return {Any} Tab Returns the currently selected tab
     */
    Tabs.prototype.getSelected = function () {
        for (var i = 0; i < this._tabs.length; i++) {
            if (this._tabs[i].isSelected) {
                return this._tabs[i];
            }
        }
        return null;
    };
    /**
     * @private
     */
    Tabs.prototype.getIndex = function (tab) {
        return this._tabs.indexOf(tab);
    };
    /**
     * @private
     * "Touch" the active tab, going back to the root view of the tab
     * or optionally letting the tab handle the event
     */
    Tabs.prototype._touchActive = function (tab) {
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
    };
    Object.defineProperty(Tabs.prototype, "rootNav", {
        /**
         * Returns the root NavController. Returns `null` if Tabs is not
         * within a NavController.
         * @returns {NavController}
         */
        get: function () {
            var nav = this.parent;
            while (nav.parent) {
                nav = nav.parent;
            }
            return nav;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tabs.prototype, "selectedIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tabs.prototype, "preloadTabs", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tabs.prototype, "tabbarIcons", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tabs.prototype, "tabbarPlacement", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tabs.prototype, "change", void 0);
    __decorate([
        core_1.ViewChild(tab_highlight_1.TabHighlight), 
        __metadata('design:type', tab_highlight_1.TabHighlight)
    ], Tabs.prototype, "_highlight", void 0);
    __decorate([
        core_1.ViewChildren(tab_button_1.TabButton), 
        __metadata('design:type', Object)
    ], Tabs.prototype, "_btns", void 0);
    Tabs = __decorate([
        core_1.Component({
            selector: 'ion-tabs',
            template: '<ion-navbar-section>' +
                '<template navbar-anchor></template>' +
                '</ion-navbar-section>' +
                '<ion-tabbar-section>' +
                '<tabbar role="tablist">' +
                '<a *ngFor="#t of _tabs" [tab]="t" class="tab-button" role="tab">' +
                '<ion-icon *ngIf="t.tabIcon" [name]="t.tabIcon" [isActive]="t.isSelected" class="tab-button-icon"></ion-icon>' +
                '<span *ngIf="t.tabTitle" class="tab-button-text">{{t.tabTitle}}</span>' +
                '<ion-badge *ngIf="t.tabBadge" class="tab-badge" [ngClass]="\'badge-\' + t.tabBadgeStyle">{{t.tabBadge}}</ion-badge>' +
                '</a>' +
                '<tab-highlight></tab-highlight>' +
                '</tabbar>' +
                '</ion-tabbar-section>' +
                '<ion-content-section>' +
                '<ng-content></ng-content>' +
                '</ion-content-section>',
            directives: [
                icon_1.Icon,
                common_1.NgFor,
                common_1.NgIf,
                tab_button_1.TabButton,
                tab_highlight_1.TabHighlight,
                core_1.forwardRef(function () { return TabNavBarAnchor; })
            ]
        }),
        __param(0, core_1.Optional()),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [view_controller_1.ViewController, nav_controller_1.NavController, app_1.IonicApp, config_1.Config, core_1.ElementRef, platform_1.Platform, core_1.Renderer])
    ], Tabs);
    return Tabs;
})(ion_1.Ion);
exports.Tabs = Tabs;
var tabIds = -1;
/**
 * @private
 */
var TabNavBarAnchor = (function () {
    function TabNavBarAnchor(tabs, viewContainerRef) {
        tabs.navbarContainerRef = viewContainerRef;
    }
    TabNavBarAnchor = __decorate([
        core_1.Directive({ selector: 'template[navbar-anchor]' }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Tabs, core_1.ViewContainerRef])
    ], TabNavBarAnchor);
    return TabNavBarAnchor;
})();
