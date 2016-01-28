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
var common_1 = require('angular2/common');
var form_1 = require('../../util/form');
var config_1 = require('../../config/config');
var util_1 = require('../../util/util');
var item_1 = require('../item/item');
var dom_1 = require('../../util/dom');
/**
 * @name Toggle
 * @description
 * A toggle technically is the same thing as an HTML checkbox input,
 * except it looks different and is easier to use on a touch device.
 * Toggles can also have colors assigned to them, by adding any color
 * attribute.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 * @property {any} [value] - the inital value of the toggle
 * @property {boolean} [checked] - whether the toggle it toggled or not
 * @property {boolean} [disabled] - whether the toggle is disabled or not
 * @property {string} [id] - a unique ID for a toggle
 * @usage
 * ```html
 *
 *  <ion-list>
 *
 *    <ion-item>
 *      <ion-label>Pepperoni</ion-label>
 *      <ion-toggle value="pepperoni" checked="true"></ion-toggle>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Sausage</ion-label>
 *      <ion-toggle value="sausage"></ion-toggle>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Mushrooms</ion-label>
 *      <ion-toggle value="mushrooms"></ion-toggle>
 *    </ion-item>
 *
 *  </ion-list>
 * ```
 * @demo /docs/v2/demos/toggle/
 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
 */
var Toggle = (function () {
    function Toggle(_form, _elementRef, _renderer, config, ngControl, _item) {
        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._item = _item;
        this._checked = false;
        this._disabled = false;
        this._activated = false;
        this._touched = 0;
        this.value = '';
        // deprecated warning
        if (_elementRef.nativeElement.tagName == 'ION-SWITCH') {
            void 0;
        }
        _form.register(this);
        this._mode = config.get('mode');
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
        if (_item) {
            this.id = 'tgl-' + _item.registerInput('toggle');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-toggle', true);
        }
    }
    /**
     * @private
     * Toggle the checked state of this toggle.
     */
    Toggle.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    Object.defineProperty(Toggle.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (val) {
            if (!this._disabled) {
                this._checked = util_1.isTrueProperty(val);
                this.onChange(this._checked);
                this._item && this._item.setCssClass('item-toggle-checked', this._checked);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toggle.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-toggle-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Toggle.prototype.pointerDown = function (ev) {
        if (ev.type.indexOf('touch') > -1) {
            this._touched = Date.now();
        }
        if (this.isDisabled(ev)) {
            return;
        }
        this._startX = dom_1.pointerCoord(ev).x;
        this._activated = true;
    };
    /**
     * @private
     */
    Toggle.prototype.pointerMove = function (ev) {
        if (this._startX) {
            var currentX = dom_1.pointerCoord(ev).x;
            void 0;
            if (this._checked) {
                if (currentX + 15 < this._startX) {
                    this.toggle();
                    this._startX = currentX;
                }
            }
            else if (currentX - 15 > this._startX) {
                this.toggle();
                this._startX = currentX;
            }
        }
    };
    /**
     * @private
     */
    Toggle.prototype.pointerUp = function (ev) {
        if (this._startX) {
            if (this.isDisabled(ev)) {
                return;
            }
            var endX = dom_1.pointerCoord(ev).x;
            if (this.checked) {
                if (this._startX + 4 > endX) {
                    this.toggle();
                }
            }
            else if (this._startX - 4 < endX) {
                this.toggle();
            }
            this._activated = false;
            this._startX = null;
        }
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
    Toggle.prototype.onChange = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     */
    Toggle.prototype.onTouched = function (val) {
        // TODO: figure the whys and the becauses
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
        this._form.deregister(this);
    };
    /**
     * @private
     */
    Toggle.prototype.isDisabled = function (ev) {
        return (this._touched + 999 > Date.now() && (ev.type.indexOf('mouse') > -1))
            || (this._mode == 'ios' && ev.target.tagName == 'ION-TOGGLE');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Toggle.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Toggle.prototype, "checked", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Toggle.prototype, "disabled", null);
    Toggle = __decorate([
        core_1.Component({
            selector: 'ion-toggle,ion-switch',
            template: '<div class="toggle-icon" [class.toggle-checked]="_checked" [class.toggle-activated]="_activated">' +
                '<div class="toggle-inner"></div>' +
                '</div>' +
                '<button role="checkbox" ' +
                '[id]="id" ' +
                '[attr.aria-checked]="_checked" ' +
                '[attr.aria-labelledby]="_labelId" ' +
                '[attr.aria-disabled]="_disabled" ' +
                '(touchstart)=pointerDown($event) ' +
                '(touchmove)=pointerMove($event) ' +
                '(mousemove)=pointerMove($event) ' +
                '(mousedown)=pointerDown($event) ' +
                '(touchend)=pointerUp($event) ' +
                '(mouseup)=pointerUp($event) ' +
                '(mouseout)=pointerUp($event) ' +
                'class="item-cover">' +
                '</button>',
            host: {
                '[class.toggle-disabled]': '_disabled'
            }
        }),
        __param(4, core_1.Optional()),
        __param(5, core_1.Optional()), 
        __metadata('design:paramtypes', [form_1.Form, core_1.ElementRef, core_1.Renderer, config_1.Config, common_1.NgControl, item_1.Item])
    ], Toggle);
    return Toggle;
})();
exports.Toggle = Toggle;
