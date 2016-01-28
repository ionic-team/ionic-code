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
var ion_1 = require('../ion');
var icon_1 = require('../icon/icon');
var toolbar_1 = require('../toolbar/toolbar');
var config_1 = require('../../config/config');
var app_1 = require('../app/app');
var view_controller_1 = require('../nav/view-controller');
var nav_controller_1 = require('../nav/nav-controller');
var BackButton = (function (_super) {
    __extends(BackButton, _super);
    function BackButton(_nav, elementRef, navbar) {
        _super.call(this, elementRef);
        this._nav = _nav;
        navbar && navbar.setBackButtonRef(elementRef);
    }
    BackButton.prototype.goBack = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this._nav && this._nav.pop();
    };
    BackButton = __decorate([
        core_1.Directive({
            selector: '.back-button',
            host: {
                '(click)': 'goBack($event)'
            }
        }),
        __param(0, core_1.Optional()),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [nav_controller_1.NavController, core_1.ElementRef, Navbar])
    ], BackButton);
    return BackButton;
})(ion_1.Ion);
var BackButtonText = (function () {
    function BackButtonText(elementRef, navbar) {
        navbar.setBackButtonTextRef(elementRef);
    }
    BackButtonText = __decorate([
        core_1.Directive({
            selector: '.back-button-text'
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [core_1.ElementRef, Navbar])
    ], BackButtonText);
    return BackButtonText;
})();
var ToolbarBackground = (function () {
    function ToolbarBackground(elementRef, navbar) {
        navbar.setBackgroundRef(elementRef);
    }
    ToolbarBackground = __decorate([
        core_1.Directive({
            selector: '.toolbar-background'
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [core_1.ElementRef, Navbar])
    ], ToolbarBackground);
    return ToolbarBackground;
})();
/**
 * @name Navbar
 * @description
 * Navbar is a global level toolbar that gets updated every time a page gets
 * loaded. You can pass the navbar a `ion-title` or any number of buttons.
 *
 * @usage
 * ```html
 * <ion-navbar *navbar>
 *
 *   <ion-buttons>
 *     <button (click)="toggleItems()">
 *       toggle
 *     </button>
 *   </ion-buttons>
 *
 *   <ion-title>
 *     Page Title
 *   </ion-title>
 *
 *   <ion-buttons>
 *     <button (click)="openModal()">
 *       Modal
 *     </button>
 *   </ion-buttons>
 * </ion-navbar>
 * ```
 *
 * @see {@link ../../toolbar/Toolbar/ Toolbar API Docs}
 */
var Navbar = (function (_super) {
    __extends(Navbar, _super);
    function Navbar(_app, viewCtrl, elementRef, config, _renderer) {
        _super.call(this, elementRef);
        this._app = _app;
        this._renderer = _renderer;
        viewCtrl && viewCtrl.setNavbar(this);
        this._bbIcon = config.get('backButtonIcon');
        this._bbText = config.get('backButtonText');
    }
    /**
     * @private
     */
    Navbar.prototype.ngOnInit = function () {
        var hideBackButton = this.hideBackButton;
        if (typeof hideBackButton === 'string') {
            this.hideBackButton = (hideBackButton === '' || hideBackButton === 'true');
        }
    };
    Navbar.prototype.setBackButtonText = function (text) {
        this._bbText = text;
    };
    /**
     * @private
     */
    Navbar.prototype.getBackButtonRef = function () {
        return this._bbRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackButtonRef = function (backButtonElementRef) {
        this._bbRef = backButtonElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.getBackButtonTextRef = function () {
        return this._bbtRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackButtonTextRef = function (backButtonTextElementRef) {
        this._bbtRef = backButtonTextElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackgroundRef = function (backgrouneElementRef) {
        this._bgRef = backgrouneElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.getBackgroundRef = function () {
        return this._bgRef;
    };
    /**
     * @private
     */
    Navbar.prototype.didEnter = function () {
        try {
            this._app.setTitle(this.getTitleText());
        }
        catch (e) {
            void 0;
        }
    };
    /**
     * @private
     */
    Navbar.prototype.setHidden = function (isHidden) {
        this._hidden = isHidden;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Navbar.prototype, "hideBackButton", void 0);
    Navbar = __decorate([
        core_1.Component({
            selector: 'ion-navbar',
            template: '<div class="toolbar-background"></div>' +
                '<button class="back-button bar-button bar-button-default" [hidden]="hideBackButton">' +
                '<ion-icon class="back-button-icon" [name]="_bbIcon"></ion-icon>' +
                '<span class="back-button-text">' +
                '<span class="back-default">{{_bbText}}</span>' +
                '</span>' +
                '</button>' +
                '<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>' +
                '<ng-content select="ion-buttons[start]"></ng-content>' +
                '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
                '<div class="toolbar-content">' +
                '<ng-content></ng-content>' +
                '</div>',
            host: {
                '[hidden]': '_hidden',
                'class': 'toolbar'
            },
            directives: [BackButton, BackButtonText, icon_1.Icon, ToolbarBackground]
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [app_1.IonicApp, view_controller_1.ViewController, core_1.ElementRef, config_1.Config, core_1.Renderer])
    ], Navbar);
    return Navbar;
})(toolbar_1.ToolbarBase);
exports.Navbar = Navbar;
/**
 * @private
 * Used to find and register headers in a view, and this directive's
 * content will be moved up to the common navbar location, and created
 * using the same context as the view's content area.
*/
var NavbarTemplate = (function () {
    function NavbarTemplate(viewContainerRef, templateRef, viewCtrl) {
        if (viewCtrl) {
            viewCtrl.setNavbarTemplateRef(templateRef);
            viewCtrl.setNavbarViewRef(viewContainerRef);
        }
    }
    NavbarTemplate = __decorate([
        core_1.Directive({
            selector: 'template[navbar]'
        }),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef, view_controller_1.ViewController])
    ], NavbarTemplate);
    return NavbarTemplate;
})();
exports.NavbarTemplate = NavbarTemplate;
