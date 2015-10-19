"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _angular2Angular2 = require('angular2/angular2');

var _appApp = require('../app/app');

var _configConfig = require('../../config/config');

var _configDecorators = require('../../config/decorators');

var _navController = require('./nav-controller');

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
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
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
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
var Nav = (function (_NavController) {
    _inherits(Nav, _NavController);

    /**
     * TODO
     * @param {NavController} hostNavCtrl  TODO
     * @param {Injector} injector  TODO
     * @param {ElementRef} elementRef  TODO
     * @param {NgZone} zone  TODO
     */

    function Nav(hostNavCtrl, app, config, elementRef, compiler, loader, viewManager, zone, renderer) {
        _classCallCheck(this, Nav);

        _get(Object.getPrototypeOf(Nav.prototype), "constructor", this).call(this, hostNavCtrl, app, config, elementRef, compiler, loader, viewManager, zone, renderer);
        this.panes = [];
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
            var isSwipeBackEnabled = (this.swipeBackEnabled || '').toString() !== 'false';
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
    }, {
        key: "loadContainer",
        value: function loadContainer(componentType, hostProtoViewRef, viewCtrl, done) {
            var _this = this;

            // this gets or creates the Pane which similar nav items live in
            // Nav items with just a navbar/content would all use the same Pane
            // Tabs and view's without a navbar would get a different Panes
            var structure = this.getStructure(hostProtoViewRef);
            if (structure.tabs) {
                // the component being loaded is an <ion-tabs>
                // Tabs is essentially a pane, cuz it has its own navbar and content containers
                this.loadNextToAnchor(componentType, this.anchorElementRef(), viewCtrl).then(function (componentRef) {
                    componentRef.instance._paneView = true;
                    viewCtrl.disposals.push(function () {
                        componentRef.dispose();
                    });
                    viewCtrl.onReady().then(function () {
                        done();
                    });
                });
            } else {
                // normal ion-view going into pane
                this.getPane(structure, viewCtrl, function (pane) {
                    // add the content of the view into the pane's content area
                    _this.loadNextToAnchor(componentType, pane.contentAnchorRef, viewCtrl).then(function (componentRef) {
                        viewCtrl.disposals.push(function () {
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
                        var navbarContainerRef = pane.navbarContainerRef;
                        // get this ViewController's navbar TemplateRef, which may not
                        // exist if the ViewController's template didn't have an <ion-navbar *navbar>
                        var navbarTemplateRef = viewCtrl.getNavbarTemplateRef();
                        // create the navbar view if the pane has a navbar container, and the
                        // ViewController's instance has a navbar TemplateRef to go to inside of it
                        if (navbarContainerRef && navbarTemplateRef) {
                            (function () {
                                var navbarView = navbarContainerRef.createEmbeddedView(navbarTemplateRef, -1);
                                viewCtrl.disposals.push(function () {
                                    var index = navbarContainerRef.indexOf(navbarView);
                                    if (index > -1) {
                                        navbarContainerRef.remove(index);
                                    }
                                });
                            })();
                        }
                        _this.addHasViews();
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
    }, {
        key: "getPane",
        value: function getPane(structure, viewCtrl, done) {
            var _this2 = this;

            var pane = this.panes[this.panes.length - 1];
            if (pane && pane.navbar === structure.navbar) {
                // the last pane's structure is the same as the one
                // this ViewController will need, so reuse it
                done(pane);
            } else {
                // create a new nav pane
                this._loader.loadNextToLocation(Pane, this.anchorElementRef(), this.bindings).then(function (componentRef) {
                    // get the pane reference
                    pane = _this2.newPane;
                    _this2.newPane = null;
                    pane.showNavbar(structure.navbar);
                    pane.dispose = function () {
                        componentRef.dispose();
                        _this2.panes.splice(_this2.panes.indexOf(pane), 1);
                    };
                    _this2.panes.push(pane);
                    done(pane);
                }, function (loaderErr) {
                    console.error(loaderErr);
                })["catch"](function (err) {
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
    }, {
        key: "addPane",
        value: function addPane(pane) {
            this.newPane = pane;
        }

        /**
         * @private
         * TODO
         * @param  {TODO} componentProtoViewRef TODO
         * @return {TODO}                       TODO
         */
    }, {
        key: "getStructure",
        value: function getStructure(componentProtoViewRef) {
            var templateCmds = componentProtoViewRef._protoView.templateCmds;
            var compiledTemplateData = undefined,
                directives = undefined;
            var i = undefined,
                ii = undefined,
                j = undefined,
                jj = undefined,
                k = undefined,
                kk = undefined;
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
    }]);

    return Nav;
})(_navController.NavController);
exports.Nav = Nav;
exports.Nav = Nav = __decorate([(0, _configDecorators.ConfigComponent)({
    selector: 'ion-nav',
    inputs: ['root'],
    defaultInputs: {
        'swipeBackEnabled': true
    },
    template: '<template pane-anchor></template>',
    directives: [(0, _angular2Angular2.forwardRef)(function () {
        return NavPaneAnchor;
    })]
}), __param(0, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [typeof (_a = typeof _navController.NavController !== 'undefined' && _navController.NavController) === 'function' && _a || Object, typeof (_b = typeof _appApp.IonicApp !== 'undefined' && _appApp.IonicApp) === 'function' && _b || Object, typeof (_c = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _c || Object, typeof (_d = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _d || Object, typeof (_e = typeof _angular2Angular2.Compiler !== 'undefined' && _angular2Angular2.Compiler) === 'function' && _e || Object, typeof (_f = typeof _angular2Angular2.DynamicComponentLoader !== 'undefined' && _angular2Angular2.DynamicComponentLoader) === 'function' && _f || Object, typeof (_g = typeof _angular2Angular2.AppViewManager !== 'undefined' && _angular2Angular2.AppViewManager) === 'function' && _g || Object, typeof (_h = typeof _angular2Angular2.NgZone !== 'undefined' && _angular2Angular2.NgZone) === 'function' && _h || Object, typeof (_j = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _j || Object])], Nav);
/**
 * @private
 */
var NavPaneAnchor = function NavPaneAnchor(nav, elementRef) {
    _classCallCheck(this, NavPaneAnchor);

    nav.anchorElementRef(elementRef);
};
NavPaneAnchor = __decorate([(0, _angular2Angular2.Directive)({ selector: 'template[pane-anchor]' }), __param(0, (0, _angular2Angular2.Host)()), __metadata('design:paramtypes', [Nav, typeof (_k = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _k || Object])], NavPaneAnchor);
/**
 * @private
 */
var NavBarAnchor = function NavBarAnchor(pane, viewContainerRef) {
    _classCallCheck(this, NavBarAnchor);

    pane.navbarContainerRef = viewContainerRef;
};
NavBarAnchor = __decorate([(0, _angular2Angular2.Directive)({ selector: 'template[navbar-anchor]' }), __param(0, (0, _angular2Angular2.Host)()), __param(0, (0, _angular2Angular2.Inject)((0, _angular2Angular2.forwardRef)(function () {
    return Pane;
}))), __metadata('design:paramtypes', [Pane, typeof (_l = typeof _angular2Angular2.ViewContainerRef !== 'undefined' && _angular2Angular2.ViewContainerRef) === 'function' && _l || Object])], NavBarAnchor);
/**
 * @private
 */
var ContentAnchor = function ContentAnchor(pane, elementRef) {
    _classCallCheck(this, ContentAnchor);

    pane.contentAnchorRef = elementRef;
};
ContentAnchor = __decorate([(0, _angular2Angular2.Directive)({ selector: 'template[content-anchor]' }), __param(0, (0, _angular2Angular2.Host)()), __param(0, (0, _angular2Angular2.Inject)((0, _angular2Angular2.forwardRef)(function () {
    return Pane;
}))), __metadata('design:paramtypes', [Pane, typeof (_m = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _m || Object])], ContentAnchor);
/**
 * @private
 */
var Pane = (function () {
    function Pane(nav, elementRef, renderer) {
        _classCallCheck(this, Pane);

        this.zIndex = nav.panes.length ? nav.panes[nav.panes.length - 1].zIndex + 1 : 0;
        renderer.setElementStyle(elementRef, 'zIndex', this.zIndex);
        nav.addPane(this);
        this.totalViews = 0;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }

    _createClass(Pane, [{
        key: "showNavbar",
        value: function showNavbar(hasNavbar) {
            this.navbar = hasNavbar;
            this.renderer.setElementAttribute(this.elementRef, 'no-navbar', hasNavbar ? null : '');
        }
    }]);

    return Pane;
})();
Pane = __decorate([(0, _angular2Angular2.Component)({
    selector: 'ion-pane',
    template: '<ion-navbar-section>' + '<template navbar-anchor></template>' + '</ion-navbar-section>' + '<ion-content-section>' + '<template content-anchor></template>' + '</ion-content-section>',
    directives: [NavBarAnchor, ContentAnchor]
}), __metadata('design:paramtypes', [Nav, typeof (_o = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _o || Object, typeof (_p = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _p || Object])], Pane);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;