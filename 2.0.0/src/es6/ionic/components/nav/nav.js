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
import { Component, Directive, ElementRef, Host, Optional, forwardRef, Inject, NgZone, Compiler, AppViewManager, DynamicComponentLoader, Renderer, ViewContainerRef } from 'angular2/angular2';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { ConfigComponent } from '../../config/decorators';
import { NavController } from './nav-controller';
/**
 * _For a quick walkthrough of navigation in Ionic, check out the
 * [Navigation section](../../../../components/#navigation) of the Component
 * docs._
 *
 * Nav is a basic navigation controller component.  As a subclass of NavController
 * you use it to navigate to pages in your app and manipulate the navigation stack.
 * Nav automatically animates transitions between pages for you.
 *
 * For more information on using navigation controllers like Nav or [Tab](../../Tabs/Tab/),
 * take a look at the [NavController API reference](../NavController/).
 *
 * You must set a root page (where page is any [@Page](../../config/Page/)
 * component) to be loaded initially by any Nav you create, using
 * the 'root' property:
 *
 * ```ts
 * import {GettingStartedPage} from 'getting-started';
 * @App({
 *   template: `<ion-nav [root]="rootPage"></ion-nav>`
 * })
 * class MyApp {
 *   constructor(){
 *     this.rootPage = GettingStartedPage;
 *   }
 * }
 * ```
 *
 * <h2 id="back_navigation">Back navigation</h2>
 * If a [page](../NavController/#creating_pages) you navigate to has a [NavBar](../NavBar/),
 * Nav will automatically add a back button to it if there is a page
 * before the one you are navigating to in the navigation stack.
 *
 * Additionally, specifying the `swipe-back-enabled` property will allow you to
 * swipe to go back:
 * ```ts
 * <ion-nav swipe-back-enabled="false" [root]="rootPage"></ion-nav>
 * ```
 *
 * Here is a diagram of how Nav animates smoothly between pages:
 *
 * <div class="highlight less-margin">
 *   <pre>
 *                           +-------+
 *                           |  App  |
 *                           +---+---+
 *                           &lt;ion-app&gt;
 *                               |
 *                  +------------+-------------+
 *                  |   Ionic Nav Controller   |
 *                  +------------+-------------+
 *                           &lt;ion-nav&gt;
 *                               |
 *                               |
 *             Pane 3  +--------------------+                     LoginPage
 *           Pane 2  +--------------------+ |          Has header, animates into pane 1
 *         Pane 1  +--------------------+ | |              +--------------------+
 *                 | | Header (Pane 1)  |&lt;-----------------|       Login        |
 *                 +--------------------+ | |              +--------------------+
 *                 | | |                | | |              | Username:          |
 *                 | | |                | | |              | Password:          |
 *                 | | |  Pane 3 is     | | |              |                    |
 *                 | | |  only content  | | |              |                    |
 *                 | | |                |&lt;-----------------|                    |
 *                 | | |                | | |              |                    |
 *                 | | |                | | |              |                    |
 *                 | +------------------|-+ |              |                    |
 *                 | | Footer (Pane 2)--|-|-+              |                    |
 *                 | +------------------|-+                |                    |
 *                 +--------------------+                  +--------------------+
 *                       &lt;ion-pane&gt;                              &lt;ion-view&gt;
 *
 *                   Pane 1                    Pane 2                    Pane 3
 *           +--------------------+    +--------------------+    +--------------------+
 *           | Header             |    | Content            |    | Content            |
 *           +--------------------+    |                    |    |                    |
 *           | Content            |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    |                    |    |                    |
 *           |                    |    +--------------------+    |                    |
 *           |                    |    | Footer             |    |                    |
 *           +--------------------+    +--------------------+    +--------------------+
 *
 *   </pre>
 * </div>
 *
 * ### Panes
 *
 * NOTE: You don't have to do anything with panes because Ionic takes care of
 * animated transitions for you. This is an explanation of how Nav works to
 * accompany the diagram above.
 *
 * When you push a new page onto the navigation stack using [NavController.push()](../NavController/#push)
 * or the [NavPush directive](../NavPush/), Nav animates the new page into the
 * appropriate pane.
 *
 * Panes are the containers Nav creates to animate views into. They do not have
 * any content of their own, as they are just a structural reference for where
 * the various parts of a page (header, footer, content) should animate into.
 *
 * The easiest scenario is animating between pages with the same structure. If
 * you have a page with a header and content, and navigate to another page that
 * also has a header and content, Nav can smoothly animate the incoming page
 * into the pane the exiting page is leaving. This allows for things like
 * seamless header animations between pages that both have headers.
 *
 * But suppose you have a page with a header and content and want to navigate to
 * a page with no header. Nav creates a new pane with no header that is directly
 * behind the current pane. It then animates the exiting page out of the current
 * pane and the new page into the new content-only pane.
 *
 */
export let Nav = class extends NavController {
    /**
     * TODO
     * @param {NavController} hostNavCtrl  TODO
     * @param {Injector} injector  TODO
     * @param {ElementRef} elementRef  TODO
     * @param {NgZone} zone  TODO
     */
    constructor(hostNavCtrl, app, config, elementRef, compiler, loader, viewManager, zone, renderer) {
        super(hostNavCtrl, app, config, elementRef, compiler, loader, viewManager, zone, renderer);
        this.panes = [];
    }
    /**
     * @private
     */
    onInit() {
        super.onInit();
        if (this.root) {
            if (typeof this.root !== 'function') {
                throw 'The [root] property in <ion-nav> must be given a reference to a component class from within the constructor.';
            }
            this.push(this.root);
        }
        // default the swipe back to be enabled
        let isSwipeBackEnabled = (this.swipeBackEnabled || '').toString() !== 'false';
        this.isSwipeBackEnabled(isSwipeBackEnabled);
    }
    /**
     * @private
     * TODO
     * @param  {TODO}   componentType    TODO
     * @param  {TODO}   hostProtoViewRef TODO
     * @param  {TODO}   viewCtrl         TODO
     * @param  {Function} done             TODO
     * @return {TODO}                    TODO
     */
    loadContainer(componentType, hostProtoViewRef, viewCtrl, done) {
        // this gets or creates the Pane which similar nav items live in
        // Nav items with just a navbar/content would all use the same Pane
        // Tabs and view's without a navbar would get a different Panes
        let structure = this.getStructure(hostProtoViewRef);
        if (structure.tabs) {
            // the component being loaded is an <ion-tabs>
            // Tabs is essentially a pane, cuz it has its own navbar and content containers
            this.loadNextToAnchor(componentType, this.anchorElementRef(), viewCtrl).then(componentRef => {
                componentRef.instance._paneView = true;
                viewCtrl.disposals.push(() => {
                    componentRef.dispose();
                });
                viewCtrl.onReady().then(() => {
                    done();
                });
            });
        }
        else {
            // normal ion-view going into pane
            this.getPane(structure, viewCtrl, (pane) => {
                // add the content of the view into the pane's content area
                this.loadNextToAnchor(componentType, pane.contentAnchorRef, viewCtrl).then(componentRef => {
                    viewCtrl.disposals.push(() => {
                        componentRef.dispose();
                        // remove the pane if there are no view items left
                        pane.totalViews--;
                        if (pane.totalViews === 0) {
                            pane.dispose && pane.dispose();
                        }
                    });
                    // count how many ViewControllers are in this pane
                    pane.totalViews++;
                    // a new ComponentRef has been created
                    // set the ComponentRef's instance to this ViewController
                    viewCtrl.setInstance(componentRef.instance);
                    // remember the ElementRef to the content that was just created
                    viewCtrl.setContentRef(componentRef.location);
                    // get the NavController's container for navbars, which is
                    // the place this NavController will add each ViewController's navbar
                    let navbarContainerRef = pane.navbarContainerRef;
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
            });
        }
    }
    /**
     * @private
     * TODO
     * @param  {TODO}   structure TODO
     * @param  {TODO}   viewCtrl  TODO
     * @param  {Function} done      TODO
     * @return {TODO}             TODO
     */
    getPane(structure, viewCtrl, done) {
        let pane = this.panes[this.panes.length - 1];
        if (pane && pane.navbar === structure.navbar) {
            // the last pane's structure is the same as the one
            // this ViewController will need, so reuse it
            done(pane);
        }
        else {
            // create a new nav pane
            this._loader.loadNextToLocation(Pane, this.anchorElementRef(), this.bindings).then(componentRef => {
                // get the pane reference
                pane = this.newPane;
                this.newPane = null;
                pane.showNavbar(structure.navbar);
                pane.dispose = () => {
                    componentRef.dispose();
                    this.panes.splice(this.panes.indexOf(pane), 1);
                };
                this.panes.push(pane);
                done(pane);
            }, loaderErr => {
                console.error(loaderErr);
            }).catch(err => {
                console.error(err);
            });
        }
    }
    /**
     * @private
     * TODO
     * @param  {TODO} pane TODO
     * @return {TODO}      TODO
     */
    addPane(pane) {
        this.newPane = pane;
    }
    /**
     * @private
     * TODO
     * @param  {TODO} componentProtoViewRef TODO
     * @return {TODO}                       TODO
     */
    getStructure(componentProtoViewRef) {
        let templateCmds = componentProtoViewRef._protoView.templateCmds;
        let compiledTemplateData, directives;
        let i, ii, j, jj, k, kk;
        for (i = 0, ii = templateCmds.length; i < ii; i++) {
            if (templateCmds[i].template) {
                compiledTemplateData = templateCmds[i].template.getData(templateCmds[i].templateId);
                if (compiledTemplateData) {
                    for (j = 0, jj = compiledTemplateData.commands.length; j < jj; j++) {
                        directives = compiledTemplateData.commands[j].directives;
                        if (directives && (kk = directives.length)) {
                            for (k = 0; k < kk; k++) {
                                if (directives[k].name == 'NavbarTemplate') {
                                    return { navbar: true };
                                }
                                if (directives[k].name == 'Tabs') {
                                    return { tabs: true };
                                }
                            }
                        }
                    }
                }
            }
        }
        return {};
    }
};
Nav = __decorate([
    ConfigComponent({
        selector: 'ion-nav',
        inputs: [
            'root'
        ],
        defaultInputs: {
            'swipeBackEnabled': true
        },
        template: '<template pane-anchor></template>',
        directives: [forwardRef(() => NavPaneAnchor)]
    }),
    __param(0, Optional()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a) || Object, (typeof (_b = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _b) || Object, (typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c) || Object, (typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d) || Object, (typeof (_e = typeof Compiler !== 'undefined' && Compiler) === 'function' && _e) || Object, (typeof (_f = typeof DynamicComponentLoader !== 'undefined' && DynamicComponentLoader) === 'function' && _f) || Object, (typeof (_g = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _g) || Object, (typeof (_h = typeof NgZone !== 'undefined' && NgZone) === 'function' && _h) || Object, (typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j) || Object])
], Nav);
/**
 * @private
 */
let NavPaneAnchor = class {
    constructor(nav, elementRef) {
        nav.anchorElementRef(elementRef);
    }
};
NavPaneAnchor = __decorate([
    Directive({ selector: 'template[pane-anchor]' }),
    __param(0, Host()), 
    __metadata('design:paramtypes', [Nav, (typeof (_k = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _k) || Object])
], NavPaneAnchor);
/**
 * @private
 */
let NavBarAnchor = class {
    constructor(pane, viewContainerRef) {
        pane.navbarContainerRef = viewContainerRef;
    }
};
NavBarAnchor = __decorate([
    Directive({ selector: 'template[navbar-anchor]' }),
    __param(0, Host()),
    __param(0, Inject(forwardRef(() => Pane))), 
    __metadata('design:paramtypes', [Pane, (typeof (_l = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _l) || Object])
], NavBarAnchor);
/**
 * @private
 */
let ContentAnchor = class {
    constructor(pane, elementRef) {
        pane.contentAnchorRef = elementRef;
    }
};
ContentAnchor = __decorate([
    Directive({ selector: 'template[content-anchor]' }),
    __param(0, Host()),
    __param(0, Inject(forwardRef(() => Pane))), 
    __metadata('design:paramtypes', [Pane, (typeof (_m = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _m) || Object])
], ContentAnchor);
/**
 * @private
 */
let Pane = class {
    constructor(nav, elementRef, renderer) {
        this.zIndex = (nav.panes.length ? nav.panes[nav.panes.length - 1].zIndex + 1 : 0);
        renderer.setElementStyle(elementRef, 'zIndex', this.zIndex);
        nav.addPane(this);
        this.totalViews = 0;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    showNavbar(hasNavbar) {
        this.navbar = hasNavbar;
        this.renderer.setElementAttribute(this.elementRef, 'no-navbar', hasNavbar ? null : '');
    }
};
Pane = __decorate([
    Component({
        selector: 'ion-pane',
        template: '<ion-navbar-section>' +
            '<template navbar-anchor></template>' +
            '</ion-navbar-section>' +
            '<ion-content-section>' +
            '<template content-anchor></template>' +
            '</ion-content-section>',
        directives: [NavBarAnchor, ContentAnchor]
    }), 
    __metadata('design:paramtypes', [Nav, (typeof (_o = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _o) || Object, (typeof (_p = typeof Renderer !== 'undefined' && Renderer) === 'function' && _p) || Object])
], Pane);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;