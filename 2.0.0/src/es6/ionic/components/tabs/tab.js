var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Directive, Host, ElementRef, Compiler, DynamicComponentLoader, AppViewManager, forwardRef, NgZone, Renderer } from 'angular2/angular2';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { NavController } from '../nav/nav-controller';
import { Tabs } from './tabs';
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
export let Tab = class extends NavController {
    constructor(tabs, app, config, elementRef, compiler, loader, viewManager, zone, renderer) {
        // A Tab is a NavController for its child pages
        super(tabs, app, config, elementRef, compiler, loader, viewManager, zone, renderer);
        this.tabs = tabs;
        this._isInitial = tabs.add(this);
    }
    onInit() {
        console.debug('Tab onInit', this.getIndex());
        if (this._isInitial) {
            this.tabs.select(this);
        }
        else if (this.tabs.preloadTabs) {
        }
    }
    load(callback) {
        if (!this._loaded && this.root) {
            let opts = {
                animate: false
            };
            this.push(this.root, null, opts).then(callback);
            this._loaded = true;
        }
        else {
            callback();
        }
    }
    loadContainer(componentType, hostProtoViewRef, viewCtrl, done) {
        this.loadNextToAnchor(componentType, this.contentAnchorRef, viewCtrl).then(componentRef => {
            viewCtrl.disposals.push(() => {
                componentRef.dispose();
            });
            // a new ComponentRef has been created
            // set the ComponentRef's instance to this ViewController
            viewCtrl.setInstance(componentRef.instance);
            // remember the ElementRef to the content that was just created
            viewCtrl.setContentRef(componentRef.location);
            // get the NavController's container for navbars, which is
            // the place this NavController will add each ViewController's navbar
            let navbarContainerRef = this.tabs.navbarContainerRef;
            // get this ViewController's navbar TemplateRef, which may not
            // exist if the ViewController's template didn't have an <ion-navbar *navbar>
            let navbarTemplateRef = viewCtrl.getNavbarTemplateRef();
            // create the navbar view if the pane has a navbar container, and the
            // ViewController's instance has a navbar TemplateRef to go to inside of it
            if (navbarContainerRef && navbarTemplateRef) {
                let navbarView = navbarContainerRef.createEmbeddedView(navbarTemplateRef, -1);
                viewCtrl.disposals.push(() => {
                    let index = navbarContainerRef.indexOf(navbarView);
                    if (index > -1) {
                        navbarContainerRef.remove(index);
                    }
                });
            }
            this.addHasViews();
            done();
        });
    }
    getIndex() {
        return this.tabs.getIndex(this);
    }
};
Tab = __decorate([
    Component({
        selector: 'ion-tab',
        inputs: [
            'root',
            'tabTitle',
            'tabIcon'
        ],
        host: {
            '[attr.id]': 'panelId',
            '[attr.aria-labelledby]': 'btnId',
            '[class.show-tab]': 'isSelected',
            'role': 'tabpanel'
        },
        template: '<template content-anchor></template><ng-content></ng-content>',
        directives: [forwardRef(() => TabContentAnchor)]
    }),
    __param(0, Host()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof Tabs !== 'undefined' && Tabs) === 'function' && _a) || Object, (typeof (_b = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _b) || Object, (typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c) || Object, (typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d) || Object, (typeof (_e = typeof Compiler !== 'undefined' && Compiler) === 'function' && _e) || Object, (typeof (_f = typeof DynamicComponentLoader !== 'undefined' && DynamicComponentLoader) === 'function' && _f) || Object, (typeof (_g = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _g) || Object, (typeof (_h = typeof NgZone !== 'undefined' && NgZone) === 'function' && _h) || Object, (typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j) || Object])
], Tab);
let TabContentAnchor = class {
    constructor(tab, elementRef) {
        tab.contentAnchorRef = elementRef;
    }
};
TabContentAnchor = __decorate([
    Directive({ selector: 'template[content-anchor]' }),
    __param(0, Host()), 
    __metadata('design:paramtypes', [Tab, (typeof (_k = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _k) || Object])
], TabContentAnchor);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;