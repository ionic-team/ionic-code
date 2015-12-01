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
import { ChangeDetectorRef, ElementRef, Optional, NgZone, Compiler, AppViewManager, Renderer } from 'angular2/angular2';
import { IonicApp } from '../app/app';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
import { ConfigComponent } from '../../config/decorators';
import { NavController } from './nav-controller';
import { ViewController } from './view-controller';
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
 * ```html
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
 *             Page 3  +--------------------+                     LoginPage
 *           Page 2  +--------------------+ |
 *         Page 1  +--------------------+ | |              +--------------------+
 *                 | | Header           |&lt;-----------------|       Login        |
 *                 +--------------------+ | |              +--------------------+
 *                 | | |                | | |              | Username:          |
 *                 | | |                | | |              | Password:          |
 *                 | | |  Page 3 is     | | |              |                    |
 *                 | | |  only content  | | |              |                    |
 *                 | | |                |&lt;-----------------|                    |
 *                 | | |                | | |              |                    |
 *                 | | |                | | |              |                    |
 *                 | +------------------|-+ |              |                    |
 *                 | | Footer           |-|-+              |                    |
 *                 | +------------------|-+                |                    |
 *                 +--------------------+                  +--------------------+
 *
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
 */
export let Nav = class extends NavController {
    constructor(hostNavCtrl, viewCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
        super(hostNavCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd);
        if (viewCtrl) {
            // an ion-nav can also act as an ion-page within a parent ion-nav
            // this would happen when an ion-nav nests a child ion-nav.
            viewCtrl.setContent(this);
            viewCtrl.setContentRef(elementRef);
        }
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
        this.isSwipeBackEnabled((this.swipeBackEnabled || '').toString() !== 'false');
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
        template: '<template #contents></template>'
    }),
    __param(0, Optional()),
    __param(1, Optional()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a) || Object, (typeof (_b = typeof ViewController !== 'undefined' && ViewController) === 'function' && _b) || Object, (typeof (_c = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _c) || Object, (typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d) || Object, (typeof (_e = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _e) || Object, (typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f) || Object, (typeof (_g = typeof Compiler !== 'undefined' && Compiler) === 'function' && _g) || Object, (typeof (_h = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _h) || Object, (typeof (_j = typeof NgZone !== 'undefined' && NgZone) === 'function' && _j) || Object, (typeof (_k = typeof Renderer !== 'undefined' && Renderer) === 'function' && _k) || Object, (typeof (_l = typeof ChangeDetectorRef !== 'undefined' && ChangeDetectorRef) === 'function' && _l) || Object])
], Nav);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;