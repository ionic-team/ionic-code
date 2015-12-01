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
import { Directive, ElementRef, Optional } from 'angular2/angular2';
import { Ion } from '../ion';
import { IonicApp } from '../app/app';
import { ViewController } from '../nav/view-controller';
import { Navbar } from '../navbar/navbar';
/**
* TODO
*/
export let MenuToggle = class extends Ion {
    constructor(app, elementRef, viewCtrl, navbar) {
        super(elementRef, null);
        this.app = app;
        this.viewCtrl = viewCtrl;
        this.withinNavbar = !!navbar;
    }
    /**
    * TODO
    * @param {TODO} event  TODO
    */
    toggle() {
        let menu = this.app.getComponent(this.menuToggle || 'menu');
        menu && menu.toggle();
    }
    get isHidden() {
        if (this.withinNavbar && this.viewCtrl) {
            return !this.viewCtrl.isRoot();
        }
        return false;
    }
};
MenuToggle = __decorate([
    Directive({
        selector: '[menu-toggle]',
        inputs: [
            'menuToggle'
        ],
        host: {
            '(click)': 'toggle()',
            '[hidden]': 'isHidden',
            'menu-toggle': '' //ensures the attr is there for css when using [menu-toggle]
        }
    }),
    __param(2, Optional()),
    __param(3, Optional()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof ViewController !== 'undefined' && ViewController) === 'function' && _c) || Object, (typeof (_d = typeof Navbar !== 'undefined' && Navbar) === 'function' && _d) || Object])
], MenuToggle);
var _a, _b, _c, _d;