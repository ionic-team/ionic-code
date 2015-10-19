System.register("ionic/components/nav-bar/nav-bar", ["angular2/angular2", "../ion", "../icon/icon", "../toolbar/toolbar", "../../config/config", "../app/app", "../nav/view-controller", "../nav/nav-controller"], function (_export) {
    "use strict";

    var Component, Directive, Optional, ElementRef, Renderer, TemplateRef, forwardRef, Inject, Ion, Icon, ToolbarBase, Config, IonicApp, ViewController, NavController, __decorate, __metadata, __param, BackButton, BackButtonText, Navbar, NavbarTemplate, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            Directive = _angular2Angular2.Directive;
            Optional = _angular2Angular2.Optional;
            ElementRef = _angular2Angular2.ElementRef;
            Renderer = _angular2Angular2.Renderer;
            TemplateRef = _angular2Angular2.TemplateRef;
            forwardRef = _angular2Angular2.forwardRef;
            Inject = _angular2Angular2.Inject;
        }, function (_ion) {
            Ion = _ion.Ion;
        }, function (_iconIcon) {
            Icon = _iconIcon.Icon;
        }, function (_toolbarToolbar) {
            ToolbarBase = _toolbarToolbar.ToolbarBase;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_appApp) {
            IonicApp = _appApp.IonicApp;
        }, function (_navViewController) {
            ViewController = _navViewController.ViewController;
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

            __param = undefined && undefined.__param || function (paramIndex, decorator) {
                return function (target, key) {
                    decorator(target, key, paramIndex);
                };
            };

            BackButton = (function (_Ion) {
                _inherits(BackButton, _Ion);

                function BackButton(navCtrl, elementRef, navbar) {
                    _classCallCheck(this, BackButton);

                    _get(Object.getPrototypeOf(BackButton.prototype), "constructor", this).call(this, elementRef, null);
                    this.navCtrl = navCtrl;
                    navbar && navbar.setBackButtonRef(elementRef);
                }

                _createClass(BackButton, [{
                    key: "goBack",
                    value: function goBack(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();
                        this.navCtrl && this.navCtrl.pop();
                    }
                }]);

                return BackButton;
            })(Ion);

            BackButton = __decorate([Directive({
                selector: '.back-button',
                host: {
                    '(click)': 'goBack($event)'
                }
            }), __param(0, Optional()), __param(2, Optional()), __param(2, Inject(forwardRef(function () {
                return Navbar;
            }))), __metadata('design:paramtypes', [typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, Navbar])], BackButton);

            BackButtonText = (function (_Ion2) {
                _inherits(BackButtonText, _Ion2);

                function BackButtonText(elementRef, navbar) {
                    _classCallCheck(this, BackButtonText);

                    _get(Object.getPrototypeOf(BackButtonText.prototype), "constructor", this).call(this, elementRef, null);
                    navbar && navbar.setBackButtonTextRef(elementRef);
                }

                return BackButtonText;
            })(Ion);

            BackButtonText = __decorate([Directive({
                selector: '.back-button-text'
            }), __param(1, Optional()), __param(1, Inject(forwardRef(function () {
                return Navbar;
            }))), __metadata('design:paramtypes', [typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, Navbar])], BackButtonText);

            Navbar = (function (_ToolbarBase) {
                _inherits(Navbar, _ToolbarBase);

                function Navbar(app, viewCtrl, elementRef, config, renderer) {
                    _classCallCheck(this, Navbar);

                    _get(Object.getPrototypeOf(Navbar.prototype), "constructor", this).call(this, elementRef, config);
                    renderer.setElementClass(elementRef, 'toolbar', true);
                    this.app = app;
                    viewCtrl && viewCtrl.setNavbar(this);
                    this.bbIcon = config.get('backButtonIcon');
                    this.bbDefault = config.get('backButtonText');
                }

                _createClass(Navbar, [{
                    key: "getBackButtonRef",
                    value: function getBackButtonRef() {
                        return this.bbRef;
                    }
                }, {
                    key: "setBackButtonRef",
                    value: function setBackButtonRef(backButtonElementRef) {
                        this.bbRef = backButtonElementRef;
                    }
                }, {
                    key: "getBackButtonTextRef",
                    value: function getBackButtonTextRef() {
                        return this.bbtRef;
                    }
                }, {
                    key: "setBackButtonTextRef",
                    value: function setBackButtonTextRef(backButtonTextElementRef) {
                        this.bbtRef = backButtonTextElementRef;
                    }
                }, {
                    key: "didEnter",
                    value: function didEnter() {
                        this.app.setTitle(this.getTitleText());
                    }
                }]);

                return Navbar;
            })(ToolbarBase);

            _export("Navbar", Navbar);

            _export("Navbar", Navbar = __decorate([Component({
                selector: 'ion-navbar',
                template: '<div class="toolbar-inner">' + '<button class="back-button">' + '<icon class="back-button-icon" [name]="bbIcon"></icon>' + '<span class="back-button-text">' + '<span class="back-default">{{bbDefault}}</span>' + '</span>' + '</button>' + '<ng-content select="[menu-toggle]"></ng-content>' + '<ng-content select="ion-title"></ng-content>' + '<ng-content select="ion-nav-items[primary]"></ng-content>' + '<ng-content select="ion-nav-items[secondary]"></ng-content>' + '</div>' + '<div class="toolbar-background"></div>',
                directives: [BackButton, BackButtonText, Icon]
            }), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_d = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _d || Object, typeof (_e = typeof ViewController !== 'undefined' && ViewController) === 'function' && _e || Object, typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f || Object, typeof (_g = typeof Config !== 'undefined' && Config) === 'function' && _g || Object, typeof (_h = typeof Renderer !== 'undefined' && Renderer) === 'function' && _h || Object])], Navbar));
            /*
              Used to find and register headers in a view, and this directive's
              content will be moved up to the common navbar location, and created
              using the same context as the view's content area.
            */

            NavbarTemplate = function NavbarTemplate(viewCtrl, templateRef) {
                _classCallCheck(this, NavbarTemplate);

                viewCtrl && viewCtrl.setNavbarTemplateRef(templateRef);
            };

            _export("NavbarTemplate", NavbarTemplate);

            _export("NavbarTemplate", NavbarTemplate = __decorate([Directive({
                selector: 'template[navbar]'
            }), __param(0, Optional()), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_j = typeof ViewController !== 'undefined' && ViewController) === 'function' && _j || Object, typeof (_k = typeof TemplateRef !== 'undefined' && TemplateRef) === 'function' && _k || Object])], NavbarTemplate));
        }
    };
});