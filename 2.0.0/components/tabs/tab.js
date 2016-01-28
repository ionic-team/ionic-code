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
var core_2 = require('angular2/core');
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var keyboard_1 = require('../../util/keyboard');
var nav_controller_1 = require('../nav/nav-controller');
var tabs_1 = require('./tabs');
/**
 * @name Tab
 * @usage
 * ```html
 * <ion-tabs>
 * 	 <ion-tab tabTitle="Home" tabIcon="home" [root]="tabOneRoot"></ion-tab>
 * 	 <ion-tab tabTitle="Login" tabIcon="star" [root]="tabTwoRoot"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * @description
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
 * For most cases, you can give tab a `[root]` property along with the component you want to load.
 *
 * ```html
 * <ion-tabs>
 *  <ion-tab [root]="chatRoot"><ion-tab>
 * </ion-tabs>
 * ```
 *
 * ```ts
 * import {Chat} from '../chat/chat';
 * export class Tabs {
 *    constructor(){
 *      // here we'll set the property of chatRoot to
 *      // the imported class of Chat
 *      this.chatRoot = Chat
 *    }
 * }
 * ```
 *
 * In other cases, you may not want to navigate to a new component, but just
 * call a method. You can use the `(select)` event to call a method on your
 * class. Below is an example of presenting a modal from one of the tabs.
 *
 * ```html
 * <ion-tabs preloadTabs="false">
 *   <ion-tab (select)="chat()"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * ```ts
 * export class Tabs {
 *   constructor(nav: NavController){
 *     this.nav = nav;
 *   }
 *   chat() {
 *     let modal = Modal.create(ChatPage);
 *     this.nav.present(modal);
 *   }
 * }
 * ```
 *
 *
 * @property {any} [root] - set the root page for this tab
 * @property {any} [tabTitle] - set the title of this tab
 * @property {any} [tabIcon] - set the icon for this tab
 * @property {any} [tabBadge] - set the badge for this tab
 * @property {any} [tabBadgeStyle] - set the badge color for this tab
 * @property {any} [select] - method to call when the current tab is selected
 *
 */
var Tab = (function (_super) {
    __extends(Tab, _super);
    function Tab(parentTabs, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer) {
        // A Tab is a NavController for its child pages
        _super.call(this, parentTabs, app, config, keyboard, elementRef, 'contents', compiler, viewManager, zone, renderer);
        this.select = new core_2.EventEmitter();
        parentTabs.add(this);
        this._panelId = 'tabpanel-' + this.id;
        this._btnId = 'tab-' + this.id;
    }
    /**
     * @private
     */
    Tab.prototype.ngOnInit = function () {
        this.tabBadgeStyle = this.tabBadgeStyle ? this.tabBadgeStyle : 'default';
    };
    /**
     * @private
     */
    Tab.prototype.load = function (opts, done) {
        if (!this._loaded && this.root) {
            this.push(this.root, null, opts).then(function () {
                done();
            });
            this._loaded = true;
        }
        else {
            done();
        }
    };
    Tab.prototype.preload = function (wait) {
        var _this = this;
        this._loadTimer = setTimeout(function () {
            if (!_this._loaded) {
                _this.load({
                    animate: false,
                    preload: true,
                    postLoad: function (viewCtrl) {
                        var navbar = viewCtrl.getNavbar();
                        navbar && navbar.setHidden(true);
                    }
                }, function () { });
            }
        }, wait);
    };
    /**
     * @private
     */
    Tab.prototype.loadPage = function (viewCtrl, navbarContainerRef, opts, done) {
        // by default a page's navbar goes into the shared tab's navbar section
        navbarContainerRef = this.parent.navbarContainerRef;
        var isTabSubPage = (this.parent.subPages && viewCtrl.index > 0);
        if (isTabSubPage) {
            // a subpage, that's not the first index
            // should not use the shared tabs navbar section, but use it's own
            navbarContainerRef = null;
        }
        _super.prototype.loadPage.call(this, viewCtrl, navbarContainerRef, opts, function () {
            if (viewCtrl.instance) {
                viewCtrl.instance._tabSubPage = isTabSubPage;
            }
            done();
        });
    };
    /**
     * @private
     */
    Tab.prototype.setSelected = function (isSelected) {
        this.isSelected = isSelected;
        this.hideNavbars(!isSelected);
    };
    /**
     * @private
     */
    Tab.prototype.hideNavbars = function (shouldHideNavbars) {
        this._views.forEach(function (viewCtrl) {
            var navbar = viewCtrl.getNavbar();
            navbar && navbar.setHidden(shouldHideNavbars);
        });
    };
    Object.defineProperty(Tab.prototype, "index", {
        /**
         *
         * ```ts
         * export class MyClass{
         *  constructor(tab: Tab){
         *    this.tab = tab;
         *    console.log(this.tab.index);
         *  }
         * }
         * ```
         *
         * @returns {number} Returns the index of this page within its NavController.
         *
         */
        get: function () {
            return this.parent.getIndex(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Tab.prototype.ngOnDestroy = function () {
        clearTimeout(this._loadTimer);
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', core_1.Type)
    ], Tab.prototype, "root", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "tabTitle", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "tabIcon", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "tabBadge", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "tabBadgeStyle", void 0);
    __decorate([
        core_2.Output(), 
        __metadata('design:type', core_2.EventEmitter)
    ], Tab.prototype, "select", void 0);
    Tab = __decorate([
        core_1.Component({
            selector: 'ion-tab',
            host: {
                '[class.show-tab]': 'isSelected',
                '[attr.id]': '_panelId',
                '[attr.aria-labelledby]': '_btnId',
                'role': 'tabpanel'
            },
            template: '<div #contents></div>'
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return tabs_1.Tabs; }))), 
        __metadata('design:paramtypes', [tabs_1.Tabs, app_1.IonicApp, config_1.Config, keyboard_1.Keyboard, core_1.ElementRef, core_1.Compiler, core_1.AppViewManager, core_1.NgZone, core_1.Renderer])
    ], Tab);
    return Tab;
})(nav_controller_1.NavController);
exports.Tab = Tab;
