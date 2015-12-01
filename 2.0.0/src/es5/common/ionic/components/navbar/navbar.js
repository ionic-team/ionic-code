"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _angular2Angular2 = require('angular2/angular2');

var _ion = require('../ion');

var _iconIcon = require('../icon/icon');

var _toolbarToolbar = require('../toolbar/toolbar');

var _configConfig = require('../../config/config');

var _appApp = require('../app/app');

var _navViewController = require('../nav/view-controller');

var _navNavController = require('../nav/nav-controller');

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

var BackButton = (function (_Ion) {
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
})(_ion.Ion);
BackButton = __decorate([(0, _angular2Angular2.Directive)({
    selector: '.back-button',
    host: {
        '(click)': 'goBack($event)'
    }
}), __param(0, (0, _angular2Angular2.Optional)()), __param(2, (0, _angular2Angular2.Optional)()), __param(2, (0, _angular2Angular2.Inject)((0, _angular2Angular2.forwardRef)(function () {
    return Navbar;
}))), __metadata('design:paramtypes', [typeof (_a = typeof _navNavController.NavController !== 'undefined' && _navNavController.NavController) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object, Navbar])], BackButton);
var BackButtonText = function BackButtonText(elementRef, navbar) {
    _classCallCheck(this, BackButtonText);

    navbar.setBackButtonTextRef(elementRef);
};
BackButtonText = __decorate([(0, _angular2Angular2.Directive)({
    selector: '.back-button-text'
}), __param(1, (0, _angular2Angular2.Inject)((0, _angular2Angular2.forwardRef)(function () {
    return Navbar;
}))), __metadata('design:paramtypes', [typeof (_c = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _c || Object, Navbar])], BackButtonText);
var ToolbarBackground = function ToolbarBackground(elementRef, navbar) {
    _classCallCheck(this, ToolbarBackground);

    navbar.setBackgroundRef(elementRef);
};
ToolbarBackground = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'toolbar-background'
}), __param(1, (0, _angular2Angular2.Inject)((0, _angular2Angular2.forwardRef)(function () {
    return Navbar;
}))), __metadata('design:paramtypes', [typeof (_d = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _d || Object, Navbar])], ToolbarBackground);
var Navbar = (function (_ToolbarBase) {
    _inherits(Navbar, _ToolbarBase);

    function Navbar(app, viewCtrl, elementRef, config, renderer) {
        _classCallCheck(this, Navbar);

        _get(Object.getPrototypeOf(Navbar.prototype), "constructor", this).call(this, elementRef, config);
        this.app = app;
        this.renderer = renderer;
        var navbarStyle = config.get('navbarStyle');
        if (navbarStyle) {
            renderer.setElementAttribute(elementRef, navbarStyle, '');
        }
        viewCtrl && viewCtrl.setNavbar(this);
        this.bbIcon = config.get('backButtonIcon');
        this.bbText = config.get('backButtonText');
    }

    /**
     * @private
     */

    _createClass(Navbar, [{
        key: "onInit",
        value: function onInit() {
            _get(Object.getPrototypeOf(Navbar.prototype), "onInit", this).call(this);
            var hideBackButton = this.hideBackButton;
            if (typeof hideBackButton === 'string') {
                this.hideBackButton = hideBackButton === '' || hideBackButton === 'true';
            }
            if (this.navbarStyle) {
                this.renderer.setElementAttribute(this.elementRef, this.navbarStyle, '');
            }
        }

        /**
         * @private
         */
    }, {
        key: "getBackButtonRef",
        value: function getBackButtonRef() {
            return this.bbRef;
        }

        /**
         * @private
         */
    }, {
        key: "setBackButtonRef",
        value: function setBackButtonRef(backButtonElementRef) {
            this.bbRef = backButtonElementRef;
        }

        /**
         * @private
         */
    }, {
        key: "getBackButtonTextRef",
        value: function getBackButtonTextRef() {
            return this.bbtRef;
        }

        /**
         * @private
         */
    }, {
        key: "setBackButtonTextRef",
        value: function setBackButtonTextRef(backButtonTextElementRef) {
            this.bbtRef = backButtonTextElementRef;
        }

        /**
         * @private
         */
    }, {
        key: "setBackgroundRef",
        value: function setBackgroundRef(backgrouneElementRef) {
            this.bgRef = backgrouneElementRef;
        }

        /**
         * @private
         */
    }, {
        key: "getBackgroundRef",
        value: function getBackgroundRef() {
            return this.bgRef;
        }

        /**
         * @private
         */
    }, {
        key: "didEnter",
        value: function didEnter() {
            try {
                this.app.setTitle(this.getTitleText());
            } catch (e) {
                console.error(e);
            }
        }

        /**
         * @private
         */
    }, {
        key: "setHidden",
        value: function setHidden(isHidden) {
            this._hidden = isHidden;
        }
    }]);

    return Navbar;
})(_toolbarToolbar.ToolbarBase);
exports.Navbar = Navbar;
exports.Navbar = Navbar = __decorate([(0, _angular2Angular2.Component)({
    selector: 'ion-navbar',
    template: '<toolbar-background></toolbar-background>' + '<button class="back-button" [hidden]="hideBackButton">' + '<icon class="back-button-icon" [name]="bbIcon"></icon>' + '<span class="back-button-text">' + '<span class="back-default">{{bbText}}</span>' + '</span>' + '</button>' + '<ng-content select="[menu-toggle]"></ng-content>' + '<ng-content select="ion-nav-items[primary]"></ng-content>' + '<ng-content select="ion-nav-items[secondary]"></ng-content>' + '<toolbar-content>' + '<ng-content></ng-content>' + '</toolbar-content>',
    host: {
        '[hidden]': '_hidden',
        'class': 'toolbar'
    },
    inputs: ['hideBackButton', 'navbarStyle'],
    directives: [BackButton, BackButtonText, _iconIcon.Icon, ToolbarBackground]
}), __param(1, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [typeof (_e = typeof _appApp.IonicApp !== 'undefined' && _appApp.IonicApp) === 'function' && _e || Object, typeof (_f = typeof _navViewController.ViewController !== 'undefined' && _navViewController.ViewController) === 'function' && _f || Object, typeof (_g = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _g || Object, typeof (_h = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _h || Object, typeof (_j = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _j || Object])], Navbar);
/**
 * @private
 * Used to find and register headers in a view, and this directive's
 * content will be moved up to the common navbar location, and created
 * using the same context as the view's content area.
*/
var NavbarTemplate = function NavbarTemplate(viewContainerRef, templateRef, viewCtrl) {
    _classCallCheck(this, NavbarTemplate);

    if (viewCtrl) {
        viewCtrl.setNavbarTemplateRef(templateRef);
        viewCtrl.setNavbarViewRef(viewContainerRef);
    }
};
exports.NavbarTemplate = NavbarTemplate;
exports.NavbarTemplate = NavbarTemplate = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'template[navbar]'
}), __param(2, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [typeof (_k = typeof _angular2Angular2.ViewContainerRef !== 'undefined' && _angular2Angular2.ViewContainerRef) === 'function' && _k || Object, typeof (_l = typeof _angular2Angular2.TemplateRef !== 'undefined' && _angular2Angular2.TemplateRef) === 'function' && _l || Object, typeof (_m = typeof _navViewController.ViewController !== 'undefined' && _navViewController.ViewController) === 'function' && _m || Object])], NavbarTemplate);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;