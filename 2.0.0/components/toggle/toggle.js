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
var common_1 = require('angular2/common');
var form_1 = require('../../util/form');
var config_1 = require('../../config/config');
var dom_1 = require('../../util/dom');
/**
 * @private
 */
var MediaToggle = (function () {
    /**
     * TODO
     * @param {Toggle} toggle  TODO
     * @param {} elementRef  TODO
     * @param {Config} config  TODO
     */
    function MediaToggle(toggle, elementRef) {
        toggle.toggleEle = elementRef.nativeElement;
        this.toggle = toggle;
    }
    MediaToggle = __decorate([
        core_1.Directive({
            selector: '.toggle-media',
            host: {
                '[class.toggle-activated]': 'toggle.isActivated'
            }
        }),
        __param(0, core_1.Host()),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return Toggle; }))), 
        __metadata('design:paramtypes', [Toggle, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], MediaToggle);
    return MediaToggle;
    var _a;
})();
/**
 * @name Toggle
 * @description
 * A toggle technically is the same thing as an HTML checkbox input, except it looks different and is easier to use on a touch device. Ionic prefers to wrap the checkbox input with the `<label>` in order to make the entire toggle easy to tap or drag.
 * Togglees can also have colors assigned to them, by adding any color attribute to them.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 * @property {any} [value] - the inital value of the toggle
 * @property {boolean} [checked] - whether the toggle it toggled or not
 * @property {boolean} [disabled] - whether the toggle is disabled or not
 * @property {string} [id] - a unique ID for a toggle
 * @usage
 * ```html
 * // Create a single toggle
 *  <ion-toggle checked="true">
 *    Pineapple
 *  </ion-toggle>
 *
 * // Create a list of togglees:
 *  <ion-list>
 *
 *    <ion-toggle checked="true">
 *      Apple
 *    </ion-toggle>
 *
 *     <ion-toggle checked="false">
 *       Banana
 *     </ion-toggle>
 *
 *     <ion-toggle disabled="true">
 *       Cherry
 *     </ion-toggle>
 *
 *  </ion-list>
 * ```
 * @demo /docs/v2/demos/toggle/
 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
 */
var Toggle = (function () {
    function Toggle(form, elementRef, config, ngControl) {
        this.ngControl = ngControl;
        // deprecated warning
        if (elementRef.nativeElement.tagName == 'ION-SWITCH') {
            console.warn('<ion-switch> has been renamed to <ion-toggle>, please update your HTML');
        }
        this.form = form;
        form.register(this);
        this.lastTouch = 0;
        this.mode = config.get('mode');
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
        var self = this;
        function pointerMove(ev) {
            var currentX = dom_1.pointerCoord(ev).x;
            if (self.checked) {
                if (currentX + 15 < self.startX) {
                    self.toggle(ev);
                    self.startX = currentX;
                }
            }
            else if (currentX - 15 > self.startX) {
                self.toggle(ev);
                self.startX = currentX;
            }
        }
        function pointerOut(ev) {
            if (ev.currentTarget === ev.target) {
                self.pointerUp(ev);
            }
        }
        this.addMoveListener = function () {
            self.toggleEle.addEventListener('touchmove', pointerMove);
            self.toggleEle.addEventListener('mousemove', pointerMove);
            elementRef.nativeElement.addEventListener('mouseout', pointerOut);
        };
        this.removeMoveListener = function () {
            self.toggleEle.removeEventListener('touchmove', pointerMove);
            self.toggleEle.removeEventListener('mousemove', pointerMove);
            elementRef.nativeElement.removeEventListener('mouseout', pointerOut);
        };
    }
    /**
     * @private
     */
    Toggle.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = 'tgl-' + this.form.nextId();
        }
        this.labelId = 'lbl-' + this.id;
    };
    /**
     * Set checked state of this toggle.
     * @param {boolean} value  Boolean to set this toggle's checked state to.
     * @private
     */
    Toggle.prototype.check = function (value) {
        this.checked = !!value;
        this.onChange(this.checked);
    };
    /**
     * Toggle the checked state of this toggle.
     * @private
     */
    Toggle.prototype.toggle = function (ev) {
        this.check(!this.checked);
    };
    /**
     * @private
     */
    Toggle.prototype.writeValue = function (value) {
        this.checked = value;
    };
    /**
     * @private
     */
    Toggle.prototype.pointerDown = function (ev) {
        if (/touch/.test(ev.type)) {
            this.lastTouch = Date.now();
        }
        if (this.isDisabled(ev))
            return;
        this.startX = dom_1.pointerCoord(ev).x;
        this.removeMoveListener();
        this.addMoveListener();
        this.isActivated = true;
    };
    /**
     * @private
     */
    Toggle.prototype.pointerUp = function (ev) {
        if (this.isDisabled(ev))
            return;
        var endX = dom_1.pointerCoord(ev).x;
        if (this.checked) {
            if (this.startX + 4 > endX) {
                this.toggle(ev);
            }
        }
        else if (this.startX - 4 < endX) {
            this.toggle(ev);
        }
        this.removeMoveListener();
        this.isActivated = false;
    };
    /**
     * @private
     */
    Toggle.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     */
    Toggle.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    Toggle.prototype.ngOnDestroy = function () {
        this.removeMoveListener();
        this.toggleEle = this.addMoveListener = this.removeMoveListener = null;
        this.form.deregister(this);
    };
    /**
     * @private
     */
    Toggle.prototype.isDisabled = function (ev) {
        return (this.lastTouch + 999 > Date.now() && /mouse/.test(ev.type)) || (this.mode == 'ios' && ev.target.tagName == 'ION-TOGGLE');
    };
    /**
     * @private
     */
    Toggle.prototype.initFocus = function () {
    };
    Toggle = __decorate([
        core_1.Component({
            selector: 'ion-toggle,ion-switch',
            inputs: [
                'value',
                'checked',
                'disabled',
                'id'
            ],
            host: {
                'role': 'checkbox',
                'tappable': 'true',
                '[attr.id]': 'id',
                '[attr.tab-index]': 'tabIndex',
                '[attr.aria-checked]': 'checked',
                '[attr.aria-disabled]': 'disabled',
                '[attr.aria-labelledby]': 'labelId',
                '(touchstart)': 'pointerDown($event)',
                '(mousedown)': 'pointerDown($event)',
                '(touchend)': 'pointerUp($event)',
                '(mouseup)': 'pointerUp($event)',
                'class': 'item'
            },
            template: '<ng-content select="[item-left]"></ng-content>' +
                '<div class="item-inner">' +
                '<ion-item-content id="{{labelId}}">' +
                '<ng-content></ng-content>' +
                '</ion-item-content>' +
                '<div disable-activated class="toggle-media">' +
                '<div class="toggle-icon"></div>' +
                '</div>' +
                "</div>",
            directives: [MediaToggle]
        }),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _c) || Object, (typeof (_d = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _d) || Object])
    ], Toggle);
    return Toggle;
    var _a, _b, _c, _d;
})();
exports.Toggle = Toggle;