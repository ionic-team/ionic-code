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
import { AppViewManager, ElementRef, Directive, Renderer } from 'angular2/angular2';
import { IonicApp } from './app';
/**
 * IdRef is an easy way to identify unique components in an app and access them
 * no matter where in the UI heirarchy you are. For example, this makes toggling
 * a global side menu feasible from any place in the application.
 *
 * See the [Menu section](http://localhost:4000/docs/v2/components/#menus) of
 * the Component docs for an example of how Menus rely on ID's.
 *
 * To give any component an ID, simply set its `id` property:
 * ```html
 * <ion-checkbox id="myCheckbox"></ion-checkbox>
 * ```
 *
 * To get a reference to the registered component, inject the [IonicApp](../app/IonicApp/)
 * service:
 * ```ts
 * constructor(app: IonicApp) {
 *   var checkbox = app.getComponent("myCheckbox");
 *   if (checkbox.checked) console.log('checkbox is checked');
 * }
 * ```
 *
 * *NOTE:* It is not recommended to use ID's across Pages, as there is often no
 * guarantee that the registered component has not been destroyed if its Page
 * has been navigated away from.
 */
export let IdRef = class {
    constructor(app, elementRef, appViewManager) {
        this.app = app;
        this.elementRef = elementRef;
        this.appViewManager = appViewManager;
        // Grab the component this directive is attached to
        this.component = appViewManager.getComponent(elementRef);
    }
    /**
     * @private
     */
    onInit() {
        this.app.register(this.id, this.component);
    }
    /**
     * @private
     */
    onDestroy() {
        this.app.unregister(this.id);
    }
};
IdRef = __decorate([
    Directive({
        selector: '[id]',
        inputs: ['id']
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _a) || Object, (typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _c) || Object])
], IdRef);
export let Attr = class {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    /**
     * @private
     */
    onInit() {
        this.renderer.setElementAttribute(this.elementRef, this.attr, '');
    }
};
Attr = __decorate([
    Directive({
        selector: '[attr]',
        inputs: ['attr']
    }), 
    __metadata('design:paramtypes', [(typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d) || Object, (typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e) || Object])
], Attr);
var _a, _b, _c, _d, _e;