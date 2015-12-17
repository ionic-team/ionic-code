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
var core_1 = require('angular2/core');
var config_1 = require('../../config/config');
var text_input_1 = require('./text-input');
var dom_1 = require('../../util/dom');
var form_1 = require('../../util/form');
/**
 * @name Label
 * @description
 * Labels describe the data that the user should enter in to an input element.
 * @usage
 * ```html
 * <ion-input>
 *   <ion-label>Username</ion-label>
 *   <input type="text" value="">
 * </ion-input>
 * ```
 *
 * @demo /docs/v2/demos/label/
 * @see {@link ../../../../components#inputs Input Component Docs}
 * @see {@link ../Input Input API Docs}
 *
 */
var Label = (function () {
    function Label(config, container, form, elementRef, renderer) {
        this.form = form;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.scrollAssist = config.get('scrollAssist');
        this.container = container;
    }
    /**
     * @private
     */
    Label.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = 'lbl-' + this.form.nextId();
        }
        this.container && this.container.registerLabel(this);
    };
    /**
     * @private
     */
    Label.prototype.pointerStart = function (ev) {
        if (this.scrollAssist) {
            // remember where the touchstart/mousedown started
            this.startCoord = dom_1.pointerCoord(ev);
        }
    };
    /**
     * @private
     */
    Label.prototype.pointerEnd = function (ev) {
        if (this.container) {
            // get where the touchend/mouseup ended
            var endCoord = dom_1.pointerCoord(ev);
            // focus this input if the pointer hasn't moved XX pixels
            if (!dom_1.hasPointerMoved(20, this.startCoord, endCoord)) {
                ev.preventDefault();
                ev.stopPropagation();
                this.container.initFocus();
            }
            this.startCoord = null;
        }
    };
    /**
     * @private
     */
    Label.prototype.addClass = function (className) {
        this.renderer.setElementClass(this.elementRef, className, true);
    };
    Label = __decorate([
        core_1.Directive({
            selector: 'ion-label',
            inputs: [
                'id'
            ],
            host: {
                '[attr.id]': 'id',
                '(touchstart)': 'pointerStart($event)',
                '(touchend)': 'pointerEnd($event)',
                '(mousedown)': 'pointerStart($event)',
                '(mouseup)': 'pointerEnd($event)'
            }
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof text_input_1.TextInput !== 'undefined' && text_input_1.TextInput) === 'function' && _b) || Object, (typeof (_c = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _c) || Object, (typeof (_d = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _d) || Object, (typeof (_e = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _e) || Object])
    ], Label);
    return Label;
    var _a, _b, _c, _d, _e;
})();
exports.Label = Label;