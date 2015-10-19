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
import { Component, Directive, ElementRef, Renderer, Optional, forwardRef, Inject } from 'angular2/angular2';
import { Ion } from '../ion';
import { Config } from '../../config/config';
import { Navbar } from '../nav-bar/nav-bar';
/**
 * TODO
 */
export class ToolbarBase extends Ion {
    constructor(elementRef, config) {
        super(elementRef, config);
        this.itemRefs = [];
        this.titleRef = null;
    }
    setTitleCmp(titleCmp) {
        this.titleCmp = titleCmp;
    }
    getTitleText() {
        return (this.titleCmp && this.titleCmp.getTitleText()) || '';
    }
    /**
     * TODO
     * @returns {TODO} TODO
     */
    getTitleRef() {
        return this.titleCmp && this.titleCmp.elementRef;
    }
    /**
     * A toolbar items include the left and right side `ion-nav-items`,
     * and every `menu-toggle`. It does not include the `ion-title`.
     * @returns {TODO} Array of this toolbar's item ElementRefs.
     */
    getItemRefs() {
        return this.itemRefs;
    }
    addItemRef(itemElementRef) {
        this.itemRefs.push(itemElementRef);
    }
}
/**
 * TODO
 */
export let Toolbar = class extends ToolbarBase {
    constructor(elementRef, config, renderer) {
        super(elementRef, config);
        renderer.setElementClass(elementRef, 'toolbar', true);
    }
};
Toolbar = __decorate([
    Component({
        selector: 'ion-toolbar',
        template: '<div class="toolbar-inner">' +
            '<ng-content select="[menu-toggle]"></ng-content>' +
            '<ng-content select="ion-title"></ng-content>' +
            '<ng-content select="ion-nav-items[primary]"></ng-content>' +
            '<ng-content select="ion-nav-items[secondary]"></ng-content>' +
            '</div>' +
            '<div class="toolbar-background"></div>'
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object, (typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c) || Object])
], Toolbar);
export let ToolbarTitle = class extends Ion {
    constructor(elementRef, toolbar, navbar) {
        super(elementRef, null);
        toolbar && toolbar.setTitleCmp(this);
        navbar && navbar.setTitleCmp(this);
    }
    getTitleText() {
        return this.getNativeElement().textContent;
    }
};
ToolbarTitle = __decorate([
    Component({
        selector: 'ion-title',
        template: '<div class="toolbar-title">' +
            '<ng-content></ng-content>' +
            '</div>'
    }),
    __param(1, Optional()),
    __param(2, Optional()),
    __param(2, Inject(forwardRef(() => Navbar))), 
    __metadata('design:paramtypes', [(typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d) || Object, Toolbar, (typeof (_e = typeof Navbar !== 'undefined' && Navbar) === 'function' && _e) || Object])
], ToolbarTitle);
export let ToolbarItem = class extends Ion {
    constructor(elementRef, toolbar, navbar) {
        super(elementRef, null);
        toolbar && toolbar.addItemRef(elementRef);
        navbar && navbar.addItemRef(elementRef);
    }
};
ToolbarItem = __decorate([
    Directive({
        selector: 'ion-nav-items,[menu-toggle]'
    }),
    __param(1, Optional()),
    __param(2, Optional()),
    __param(2, Inject(forwardRef(() => Navbar))), 
    __metadata('design:paramtypes', [(typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f) || Object, Toolbar, (typeof (_g = typeof Navbar !== 'undefined' && Navbar) === 'function' && _g) || Object])
], ToolbarItem);
var _a, _b, _c, _d, _e, _f, _g;