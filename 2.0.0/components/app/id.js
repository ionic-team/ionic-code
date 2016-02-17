var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var app_1 = require('./app');
/**
 * @name Id
 * @description
 * IdRef is an easy way to identify unique components in an app and access them
 * no matter where in the UI heirarchy you are. For example, this makes toggling
 * a global side menu feasible from any place in the application.
 *
 * See the [Menu section](http://ionicframework.com/docs/v2/components/#menus) of
 * the Component docs for an example of how Menus rely on ID's.
 *
 * @usage
 * To give any component an ID, simply set its `id` property:
 * ```html
 * <ion-checkbox id="myCheckbox"></ion-checkbox>
 * ```
 *
 * To get a reference to the registered component, inject the [IonicApp](../app/IonicApp/)
 * service:
 * ```ts
 * constructor(app: IonicApp) {
 *    this.app = app
 * }
 * ngAfterViewInit{
 *  var checkbox = this.app.getComponent("myCheckbox");
 *  if (checkbox.checked) {
 *    console.log('checkbox is checked');
 *  }
 * }
 * ```
 *
 * *NOTE:* It is not recommended to use ID's across Pages, as there is often no
 * guarantee that the registered component has not been destroyed if its Page
 * has been navigated away from.
 */
var IdRef = (function () {
    function IdRef(_app, elementRef, appViewManager) {
        this._app = _app;
        // Grab the component this directive is attached to
        this._component = appViewManager.getComponent(elementRef);
    }
    /**
     * @private
     */
    IdRef.prototype.ngOnInit = function () {
        this._app.register(this.id, this._component);
    };
    /**
     * @private
     */
    IdRef.prototype.ngOnDestroy = function () {
        this._app.unregister(this.id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], IdRef.prototype, "id", void 0);
    IdRef = __decorate([
        core_1.Directive({
            selector: '[id]'
        }), 
        __metadata('design:paramtypes', [app_1.IonicApp, core_1.ElementRef, core_1.AppViewManager])
    ], IdRef);
    return IdRef;
})();
exports.IdRef = IdRef;
/**
 * @private
 */
var Attr = (function () {
    function Attr(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
    /**
     * @private
     */
    Attr.prototype.ngOnInit = function () {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, this.attr, '');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Attr.prototype, "attr", void 0);
    Attr = __decorate([
        core_1.Directive({
            selector: '[attr]'
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], Attr);
    return Attr;
})();
exports.Attr = Attr;
