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
import { Component, Directive, Optional, ElementRef, Renderer, TemplateRef, forwardRef, Inject } from 'angular2/angular2';
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
let BackButtonText = class extends Ion {
    constructor(elementRef, navbar) {
        super(elementRef, null);
        navbar && navbar.setBackButtonTextRef(elementRef);
    }
};
BackButtonText = __decorate([
    Directive({
        selector: '.back-button-text'
    }),
    __param(1, Optional()),
    __param(1, Inject(forwardRef(() => Navbar))), 
    __metadata('design:paramtypes', [(typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c) || Object, Navbar])
], BackButtonText);
export let Navbar = class extends ToolbarBase {
    constructor(app, viewCtrl, elementRef, config, renderer) {
        super(elementRef, config);
        renderer.setElementClass(elementRef, 'toolbar', true);
        this.app = app;
        viewCtrl && viewCtrl.setNavbar(this);
        this.bbIcon = config.get('backButtonIcon');
        this.bbDefault = config.get('backButtonText');
    }
    getBackButtonRef() {
        return this.bbRef;
    }
    setBackButtonRef(backButtonElementRef) {
        this.bbRef = backButtonElementRef;
    }
    getBackButtonTextRef() {
        return this.bbtRef;
    }
    setBackButtonTextRef(backButtonTextElementRef) {
        this.bbtRef = backButtonTextElementRef;
    }
    didEnter() {
        this.app.setTitle(this.getTitleText());
    }
};
Navbar = __decorate([
    Component({
        selector: 'ion-navbar',
        template: '<div class="toolbar-inner">' +
            '<button class="back-button">' +
            '<icon class="back-button-icon" [name]="bbIcon"></icon>' +
            '<span class="back-button-text">' +
            '<span class="back-default">{{bbDefault}}</span>' +
            '</span>' +
            '</button>' +
            '<ng-content select="[menu-toggle]"></ng-content>' +
            '<ng-content select="ion-title"></ng-content>' +
            '<ng-content select="ion-nav-items[primary]"></ng-content>' +
            '<ng-content select="ion-nav-items[secondary]"></ng-content>' +
            '</div>' +
            '<div class="toolbar-background"></div>',
        directives: [BackButton, BackButtonText, Icon]
    }),
    __param(1, Optional()), 
    __metadata('design:paramtypes', [(typeof (_d = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _d) || Object, (typeof (_e = typeof ViewController !== 'undefined' && ViewController) === 'function' && _e) || Object, (typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f) || Object, (typeof (_g = typeof Config !== 'undefined' && Config) === 'function' && _g) || Object, (typeof (_h = typeof Renderer !== 'undefined' && Renderer) === 'function' && _h) || Object])
], Navbar);
/*
  Used to find and register headers in a view, and this directive's
  content will be moved up to the common navbar location, and created
  using the same context as the view's content area.
*/
export let NavbarTemplate = class {
    constructor(viewCtrl, templateRef) {
        viewCtrl && viewCtrl.setNavbarTemplateRef(templateRef);
    }
};
NavbarTemplate = __decorate([
    Directive({
        selector: 'template[navbar]'
    }),
    __param(0, Optional()),
    __param(1, Optional()), 
    __metadata('design:paramtypes', [(typeof (_j = typeof ViewController !== 'undefined' && ViewController) === 'function' && _j) || Object, (typeof (_k = typeof TemplateRef !== 'undefined' && TemplateRef) === 'function' && _k) || Object])
], NavbarTemplate);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;