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
/**
 * @name Label
 * @description
 * Labels describe the data that the user should enter in to an input
 * element. You can give `ion-label` attributes to tell it how to
 * handle its display type, which is especially useful for an
 * `ion-item` which contains a text input.
 *
 * @property [fixed] - a persistant label that sits next the the input
 * @property [floating] - a label that will float about the input if the input is empty of looses focus
 * @property [stacked] - A stacked label will always appear on top of the input

 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Username</ion-label>
 *    <ion-input></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-labe fixed>Website</ion-label>
 *    <ion-input type="url"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label floating>Email</ion-label>
 *    <ion-input type="email"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label stacked>Phone</ion-label>
 *    <ion-input type="tel"></ion-input>
 *  </ion-item>
 *
 * ```
 *
 * @demo /docs/v2/demos/label/
 * @see {@link ../../../../components#inputs Input Component Docs}
 * @see {@link ../Input Input API Docs}
 *
 */
var Label = (function () {
    function Label(_elementRef, _renderer, isFloating, isStacked, isFixed, isInset) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
    }
    Object.defineProperty(Label.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            if (val) {
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'id', val);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "text", {
        get: function () {
            return this._elementRef.nativeElement.textContent || '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {string} add class name
     */
    Label.prototype.addClass = function (className) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Label.prototype, "id", null);
    Label = __decorate([
        core_1.Directive({
            selector: 'ion-label'
        }),
        __param(2, core_1.Attribute('floating')),
        __param(3, core_1.Attribute('stacked')),
        __param(4, core_1.Attribute('fixed')),
        __param(5, core_1.Attribute('inset')), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, String, String, String, String])
    ], Label);
    return Label;
})();
exports.Label = Label;
