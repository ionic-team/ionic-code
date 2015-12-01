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
import { Component, Directive, Optional, ElementRef, Renderer, TemplateRef, forwardRef, Inject, ViewContainerRef } from 'angular2/angular2';
import { Ion } from '../ion';
import { Icon } from '../icon/icon';
import { ToolbarBase } from '../toolbar/toolbar';
import { Config } from '../../config/config';
import { IonicApp } from '../app/app';
import { ViewController } from '../nav/view-controller';
import { NavController } from '../nav/nav-controller';
let BackButton = class extends Ion {
    constructor(navCtrl, elementRef, navbar) {
        super(elementRef, null);
        this.navCtrl = navCtrl;
        navbar && navbar.setBackButtonRef(elementRef);
    }
    goBack(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.navCtrl && this.navCtrl.pop();
    }
};
BackButton = __decorate([
    Directive({
        selector: '.back-button',
        host: {
            '(click)': 'goBack($event)'
        }
    }),
    __param(0, Optional()),
    __param(2, Optional()),
    __param(2, Inject(forwardRef(() => Navbar))), 
    __metadata('design:paramtypes', [(typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a) || Object, (typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b) || Object, Navbar])
], BackButton);
let BackButtonText = class {
    constructor(elementRef, navbar) {
        navbar.setBackButtonTextRef(elementRef);
    }
};
BackButtonText = __decorate([
    Directive({
        selector: '.back-button-text'
    }),
    __param(1, Inject(forwardRef(() => Navbar))), 
    __metadata('design:paramtypes', [(typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c) || Object, Navbar])
], BackButtonText);
let ToolbarBackground = class {
    constructor(elementRef, navbar) {
        navbar.setBackgroundRef(elementRef);
    }
};
ToolbarBackground = __decorate([
    Directive({
        selector: 'toolbar-background'
    }),
    __param(1, Inject(forwardRef(() => Navbar))), 
    __metadata('design:paramtypes', [(typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d) || Object, Navbar])
], ToolbarBackground);
export let Navbar = class extends ToolbarBase {
    constructor(app, viewCtrl, elementRef, config, renderer) {
        super(elementRef, config);
        this.app = app;
        this.renderer = renderer;
        let navbarStyle = config.get('navbarStyle');
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
    onInit() {
        super.onInit();
        let hideBackButton = this.hideBackButton;
        if (typeof hideBackButton === 'string') {
            this.hideBackButton = (hideBackButton === '' || hideBackButton === 'true');
        }
        if (this.navbarStyle) {
            this.renderer.setElementAttribute(this.elementRef, this.navbarStyle, '');
        }
    }
    /**
     * @private
     */
    getBackButtonRef() {
        return this.bbRef;
    }
    /**
     * @private
     */
    setBackButtonRef(backButtonElementRef) {
        this.bbRef = backButtonElementRef;
    }
    /**
     * @private
     */
    getBackButtonTextRef() {
        return this.bbtRef;
    }
    /**
     * @private
     */
    setBackButtonTextRef(backButtonTextElementRef) {
        this.bbtRef = backButtonTextElementRef;
    }
    /**
     * @private
     */
    setBackgroundRef(backgrouneElementRef) {
        this.bgRef = backgrouneElementRef;
    }
    /**
     * @private
     */
    getBackgroundRef() {
        return this.bgRef;
    }
    /**
     * @private
     */
    didEnter() {
        try {
            this.app.setTitle(this.getTitleText());
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * @private
     */
    setHidden(isHidden) {
        this._hidden = isHidden;
    }
};
Navbar = __decorate([
    Component({
        selector: 'ion-navbar',
        template: '<toolbar-background></toolbar-background>' +
            '<button class="back-button" [hidden]="hideBackButton">' +
            '<icon class="back-button-icon" [name]="bbIcon"></icon>' +
            '<span class="back-button-text">' +
            '<span class="back-default">{{bbText}}</span>' +
            '</span>' +
            '</button>' +
            '<ng-content select="[menu-toggle]"></ng-content>' +
            '<ng-content select="ion-nav-items[primary]"></ng-content>' +
            '<ng-content select="ion-nav-items[secondary]"></ng-content>' +
            '<toolbar-content>' +
            '<ng-content></ng-content>' +
            '</toolbar-content>',
        host: {
            '[hidden]': '_hidden',
            'class': 'toolbar'
        },
        inputs: [
            'hideBackButton',
            'navbarStyle'
        ],
        directives: [BackButton, BackButtonText, Icon, ToolbarBackground]
    }),
    __param(1, Optional()), 
    __metadata('design:paramtypes', [(typeof (_e = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _e) || Object, (typeof (_f = typeof ViewController !== 'undefined' && ViewController) === 'function' && _f) || Object, (typeof (_g = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _g) || Object, (typeof (_h = typeof Config !== 'undefined' && Config) === 'function' && _h) || Object, (typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j) || Object])
], Navbar);
/**
 * @private
 * Used to find and register headers in a view, and this directive's
 * content will be moved up to the common navbar location, and created
 * using the same context as the view's content area.
*/
export let NavbarTemplate = class {
    constructor(viewContainerRef, templateRef, viewCtrl) {
        if (viewCtrl) {
            viewCtrl.setNavbarTemplateRef(templateRef);
            viewCtrl.setNavbarViewRef(viewContainerRef);
        }
    }
};
NavbarTemplate = __decorate([
    Directive({
        selector: 'template[navbar]'
    }),
    __param(2, Optional()), 
    __metadata('design:paramtypes', [(typeof (_k = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _k) || Object, (typeof (_l = typeof TemplateRef !== 'undefined' && TemplateRef) === 'function' && _l) || Object, (typeof (_m = typeof ViewController !== 'undefined' && ViewController) === 'function' && _m) || Object])
], NavbarTemplate);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;