System.register("ionic/components/menu/menu-toggle", ["angular2/angular2", "../ion", "../app/app", "../nav/view-controller", "../navbar/navbar"], function (_export) {
    /**
    * TODO
    */
    "use strict";

    var Directive, ElementRef, Optional, Ion, IonicApp, ViewController, Navbar, __decorate, __metadata, __param, MenuToggle, _a, _b, _c, _d;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            Directive = _angular2Angular2.Directive;
            ElementRef = _angular2Angular2.ElementRef;
            Optional = _angular2Angular2.Optional;
        }, function (_ion) {
            Ion = _ion.Ion;
        }, function (_appApp) {
            IonicApp = _appApp.IonicApp;
        }, function (_navViewController) {
            ViewController = _navViewController.ViewController;
        }, function (_navbarNavbar) {
            Navbar = _navbarNavbar.Navbar;
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

            MenuToggle = (function (_Ion) {
                _inherits(MenuToggle, _Ion);

                function MenuToggle(app, elementRef, viewCtrl, navbar) {
                    _classCallCheck(this, MenuToggle);

                    _get(Object.getPrototypeOf(MenuToggle.prototype), "constructor", this).call(this, elementRef, null);
                    this.app = app;
                    this.viewCtrl = viewCtrl;
                    this.withinNavbar = !!navbar;
                }

                /**
                * TODO
                * @param {TODO} event  TODO
                */

                _createClass(MenuToggle, [{
                    key: "toggle",
                    value: function toggle() {
                        var menu = this.app.getComponent(this.menuToggle || 'menu');
                        menu && menu.toggle();
                    }
                }, {
                    key: "isHidden",
                    get: function get() {
                        if (this.withinNavbar && this.viewCtrl) {
                            return !this.viewCtrl.isRoot();
                        }
                        return false;
                    }
                }]);

                return MenuToggle;
            })(Ion);

            _export("MenuToggle", MenuToggle);

            _export("MenuToggle", MenuToggle = __decorate([Directive({
                selector: '[menu-toggle]',
                inputs: ['menuToggle'],
                host: {
                    '(click)': 'toggle()',
                    '[hidden]': 'isHidden',
                    'menu-toggle': '' //ensures the attr is there for css when using [menu-toggle]
                }
            }), __param(2, Optional()), __param(3, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof ViewController !== 'undefined' && ViewController) === 'function' && _c || Object, typeof (_d = typeof Navbar !== 'undefined' && Navbar) === 'function' && _d || Object])], MenuToggle));
        }
    };
});