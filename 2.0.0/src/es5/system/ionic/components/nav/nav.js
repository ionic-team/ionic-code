System.register("ionic/components/nav/nav", ["angular2/angular2", "../app/app", "../../config/config", "../../util/keyboard", "../../config/decorators", "./nav-controller", "./view-controller"], function (_export) {
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
    "use strict";

    var ChangeDetectorRef, ElementRef, Optional, NgZone, Compiler, AppViewManager, Renderer, IonicApp, Config, Keyboard, ConfigComponent, NavController, ViewController, __decorate, __metadata, __param, Nav, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            ChangeDetectorRef = _angular2Angular2.ChangeDetectorRef;
            ElementRef = _angular2Angular2.ElementRef;
            Optional = _angular2Angular2.Optional;
            NgZone = _angular2Angular2.NgZone;
            Compiler = _angular2Angular2.Compiler;
            AppViewManager = _angular2Angular2.AppViewManager;
            Renderer = _angular2Angular2.Renderer;
        }, function (_appApp) {
            IonicApp = _appApp.IonicApp;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_utilKeyboard) {
            Keyboard = _utilKeyboard.Keyboard;
        }, function (_configDecorators) {
            ConfigComponent = _configDecorators.ConfigComponent;
        }, function (_navController) {
            NavController = _navController.NavController;
        }, function (_viewController) {
            ViewController = _viewController.ViewController;
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

            Nav = (function (_NavController) {
                _inherits(Nav, _NavController);

                function Nav(hostNavCtrl, viewCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
                    _classCallCheck(this, Nav);

                    _get(Object.getPrototypeOf(Nav.prototype), "constructor", this).call(this, hostNavCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd);
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

                _createClass(Nav, [{
                    key: "onInit",
                    value: function onInit() {
                        _get(Object.getPrototypeOf(Nav.prototype), "onInit", this).call(this);
                        if (this.root) {
                            if (typeof this.root !== 'function') {
                                throw 'The [root] property in <ion-nav> must be given a reference to a component class from within the constructor.';
                            }
                            this.push(this.root);
                        }
                        // default the swipe back to be enabled
                        this.isSwipeBackEnabled((this.swipeBackEnabled || '').toString() !== 'false');
                    }
                }]);

                return Nav;
            })(NavController);

            _export("Nav", Nav);

            _export("Nav", Nav = __decorate([ConfigComponent({
                selector: 'ion-nav',
                inputs: ['root'],
                defaultInputs: {
                    'swipeBackEnabled': true
                },
                template: '<template #contents></template>'
            }), __param(0, Optional()), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a || Object, typeof (_b = typeof ViewController !== 'undefined' && ViewController) === 'function' && _b || Object, typeof (_c = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _c || Object, typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d || Object, typeof (_e = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _e || Object, typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f || Object, typeof (_g = typeof Compiler !== 'undefined' && Compiler) === 'function' && _g || Object, typeof (_h = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _h || Object, typeof (_j = typeof NgZone !== 'undefined' && NgZone) === 'function' && _j || Object, typeof (_k = typeof Renderer !== 'undefined' && Renderer) === 'function' && _k || Object, typeof (_l = typeof ChangeDetectorRef !== 'undefined' && ChangeDetectorRef) === 'function' && _l || Object])], Nav));
        }
    };
});