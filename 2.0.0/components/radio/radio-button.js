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
var form_1 = require('../../util/form');
var util_1 = require('../../util/util');
var item_1 = require('../item/item');
var radio_group_1 = require('./radio-group');
/**
 * @description
 * A radio button with a unique value. Note that all `<ion-radio>`
 * components must be wrapped within a `<ion-list radio-group>`,
 * and there must be at least two `<ion-radio>` components within
 * the radio group.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for
 * more info on forms and input.
 *
 * @usage
 * ```html
 *
 * <ion-item>
 *   <ion-label>Radio Label</ion-label>
 *   <ion-radio value="radio-value"></ion-radio>
 * </ion-item>
 *
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
 */
var RadioButton = (function () {
    function RadioButton(_form, _item, _group) {
        this._form = _form;
        this._item = _item;
        this._group = _group;
        this._checked = false;
        this._disabled = false;
        this._value = null;
        this.select = new core_1.EventEmitter();
        _form.register(this);
        if (_group) {
            // register with the radiogroup
            this.id = 'rb-' + _group.register(this);
        }
        if (_item) {
            // register the input inside of the item
            // reset to the item's id instead of the radiogroup id
            this.id = 'rb-' + _item.registerInput('radio');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-radio', true);
        }
    }
    Object.defineProperty(RadioButton.prototype, "value", {
        get: function () {
            // if the value is not defined then use it's unique id
            return util_1.isBlank(this._value) ? this.id : this._value;
        },
        set: function (val) {
            this._value = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (isChecked) {
            if (!this._disabled) {
                // only check/uncheck if it's not disabled
                // emit the select event for the radiogroup to catch
                this._checked = util_1.isTrueProperty(isChecked);
                this.select.emit(this.value);
                // if it's a stand-alone radiobutton nothing else happens
                // if it was within a radiogroup then updateAsChecked will
                // get called again
                this.updateAsChecked(this._checked);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    RadioButton.prototype.updateAsChecked = function (val) {
        this._checked = val;
        if (this._item) {
            this._item.setCssClass('item-radio-checked', val);
        }
    };
    Object.defineProperty(RadioButton.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-radio-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    RadioButton.prototype._click = function (ev) {
        void 0;
        ev.preventDefault();
        ev.stopPropagation();
        this.checked = true;
    };
    /**
     * @private
     */
    RadioButton.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RadioButton.prototype, "select", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadioButton.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadioButton.prototype, "checked", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadioButton.prototype, "disabled", null);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], RadioButton.prototype, "_click", null);
    RadioButton = __decorate([
        core_1.Component({
            selector: 'ion-radio',
            template: '<div class="radio-icon" [class.radio-checked]="_checked">' +
                '<div class="radio-inner"></div>' +
                '</div>' +
                '<button role="radio" ' +
                '[id]="id" ' +
                '[attr.aria-checked]="_checked" ' +
                '[attr.aria-labelledby]="_labelId" ' +
                '[attr.aria-disabled]="_disabled" ' +
                'class="item-cover">' +
                '</button>',
            host: {
                '[class.radio-disabled]': '_disabled'
            }
        }),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [form_1.Form, item_1.Item, radio_group_1.RadioGroup])
    ], RadioButton);
    return RadioButton;
})();
exports.RadioButton = RadioButton;
