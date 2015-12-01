System.register("ionic/components/overlay/overlay", ["angular2/angular2", "../app/app", "../../config/config", "../../util/keyboard", "./overlay-controller", "../nav/nav-controller"], function (_export) {
    "use strict";

    var ChangeDetectorRef, Component, ElementRef, Compiler, AppViewManager, NgZone, Renderer, IonicApp, Config, Keyboard, OverlayController, NavController, __decorate, __metadata, OverlayNav, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            ChangeDetectorRef = _angular2Angular2.ChangeDetectorRef;
            Component = _angular2Angular2.Component;
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
        }, function (_overlayController) {
            OverlayController = _overlayController.OverlayController;
        }, function (_navNavController) {
            NavController = _navNavController.NavController;
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

            OverlayNav = (function (_NavController) {
                _inherits(OverlayNav, _NavController);

                function OverlayNav(overlayCtrl, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd) {
                    _classCallCheck(this, OverlayNav);

                    _get(Object.getPrototypeOf(OverlayNav.prototype), "constructor", this).call(this, null, app, config, keyboard, elementRef, compiler, viewManager, zone, renderer, cd);
                    if (overlayCtrl.anchor) {
                        throw 'An app should only have one <ion-overlay></ion-overlay>';
                    }
                    overlayCtrl.nav = this;
                }

                return OverlayNav;
            })(NavController);

            _export("OverlayNav", OverlayNav);

            _export("OverlayNav", OverlayNav = __decorate([Component({
                selector: 'ion-overlay',
                template: '<template #contents></template>'
            }), __metadata('design:paramtypes', [typeof (_a = typeof OverlayController !== 'undefined' && OverlayController) === 'function' && _a || Object, typeof (_b = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _b || Object, typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c || Object, typeof (_d = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _d || Object, typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e || Object, typeof (_f = typeof Compiler !== 'undefined' && Compiler) === 'function' && _f || Object, typeof (_g = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _g || Object, typeof (_h = typeof NgZone !== 'undefined' && NgZone) === 'function' && _h || Object, typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j || Object, typeof (_k = typeof ChangeDetectorRef !== 'undefined' && ChangeDetectorRef) === 'function' && _k || Object])], OverlayNav));
        }
    };
});