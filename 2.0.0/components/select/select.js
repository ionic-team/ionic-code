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
var alert_1 = require('../alert/alert');
var form_1 = require('../../util/form');
var item_1 = require('../item/item');
var util_1 = require('../../util/util');
var nav_controller_1 = require('../nav/nav-controller');
var option_1 = require('../option/option');
/**
 * @name Select
 * @description
 * The `ion-select` component is similar to an HTML `<select>` element, however,
 * Ionic's select component makes it easier for users to sort through and select
 * the preferred option or options. When users tap the select component, a
 * dialog will appear with all of the options in a large, easy to select list
 * for users.
 *
 * Under-the-hood the `ion-select` actually uses the
 * {@link ../../alert/Alert Alert API} to open up the overlay of options
 * which the user is presented with. Select can take numerous child
 * `ion-option` components. If `ion-option` is not given a `value` attribute
 * then it will use its text as the value.
 *
 * ### Single Value: Radio Buttons
 *
 * The standard `ion-select` component allows the user to select only one
 * option. When selecting only one option the alert overlay presents users with
 * a radio button styled list of options. The `ion-select` component's value
 * receives the value of the selected option's value.
 *
 * ```html
 * <ion-item>
 *   <ion-label>Gender</ion-label>
 *   <ion-select [(ngModel)]="gender">
 *     <ion-option value="f" checked="true">Female</ion-option>
 *     <ion-option value="m">Male</ion-option>
 *   </ion-select>
 * </ion-item>
 * ```
 *
 * ### Multiple Value: Checkboxes
 *
 * By adding the `multiple="true"` attribute to `ion-select`, users are able
 * to select multiple options. When multiple options can be selected, the alert
 * overlay presents users with a checkbox styled list of options. The
 * `ion-select multiple="true"` component's value receives an array of all the
 * selected option values. In the example below, because each option is not given
 * a `value`, then it'll use its text as the value instead.
 *
 * ```html
 * <ion-item>
 *   <ion-label>Toppings</ion-label>
 *   <ion-select [(ngModel)]="toppings" multiple="true">
 *     <ion-option>Bacon</ion-option>
 *     <ion-option>Black Olives</ion-option>
 *     <ion-option>Extra Cheese</ion-option>
 *     <ion-option>Mushrooms</ion-option>
 *     <ion-option>Pepperoni</ion-option>
 *     <ion-option>Sausage</ion-option>
 *   </ion-select>
 * <ion-item>
 * ```
 *
 * ### Alert Buttons
 * By default, the two buttons read `Cancel` and `OK`. The each button's text
 * can be customized using the `cancelText` and `okText` attributes:
 *
 * ```html
 * <ion-select okText="Okay" cancelText="Dismiss">
 *   ...
 * </ion-select>
 * ```
 *
 * ### Alert Options
 *
 * Remember how `ion-select` is really just a wrapper to `Alert`? By using
 * the `alertOptions` property you can pass custom options to the alert
 * overlay. This would be useful if there is a custom alert title,
 * subtitle or message. {@link ../../alert/Alert Alert API}
 *
 * ```html
 * <ion-select [alertOptions]="alertOptions">
 *   ...
 * </ion-select>
 * ```
 *
 * ```ts
 * this.alertOptions = {
 *   title: 'Pizza Toppings',
 *   subTitle: 'Select your toppings'
 * };
 * ```
 *
 */
var Select = (function () {
    function Select(_form, _elementRef, _renderer, _item, _nav, ngControl) {
        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._item = _item;
        this._nav = _nav;
        this._disabled = false;
        this._multi = false;
        this._values = [];
        this._texts = [];
        this._text = '';
        this.cancelText = 'Cancel';
        this.okText = 'OK';
        this.alertOptions = {};
        this.checked = false;
        this.change = new core_1.EventEmitter();
        this._form.register(this);
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
        if (_item) {
            this.id = 'sel-' + _item.registerInput('select');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-select', true);
        }
        if (!_nav) {
            void 0;
        }
    }
    /**
     * @private
     */
    Select.prototype._click = function (ev) {
        var _this = this;
        ev.preventDefault();
        ev.stopPropagation();
        if (this._disabled)
            return;
        void 0;
        // the user may have assigned some options specifically for the alert
        var alertOptions = util_1.merge({}, this.alertOptions);
        // make sure their buttons array is removed from the options
        // and we create a new array for the alert's two buttons
        alertOptions.buttons = [this.cancelText];
        // if the alertOptions didn't provide an title then use the label's text
        if (!alertOptions.title && this._item) {
            alertOptions.title = this._item.getLabelText();
        }
        // user cannot provide inputs from alertOptions
        // alert inputs must be created by ionic from ion-options
        alertOptions.inputs = this._options.toArray().map(function (input) {
            return {
                type: (_this._multi ? 'checkbox' : 'radio'),
                label: input.text,
                value: input.value,
                checked: input.checked
            };
        });
        // create the alert instance from our built up alertOptions
        var alert = alert_1.Alert.create(alertOptions);
        if (this._multi) {
            // use checkboxes
            alert.setCssClass('select-alert multiple-select-alert');
        }
        else {
            // use radio buttons
            alert.setCssClass('select-alert single-select-alert');
        }
        alert.addButton({
            text: this.okText,
            handler: function (selectedValues) {
                _this.value = selectedValues;
                _this.onChange(selectedValues);
                _this.change.emit(selectedValues);
            }
        });
        this._nav.present(alert, alertOptions);
    };
    Object.defineProperty(Select.prototype, "multiple", {
        get: function () {
            return this._multi;
        },
        set: function (val) {
            this._multi = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "value", {
        get: function () {
            return (this._multi ? this._values : this._values.join());
        },
        set: function (val) {
            // passed in value could be either an array, undefined or a string
            if (this._disabled) {
                this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
                this.updateOptions();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "text", {
        get: function () {
            return (this._multi ? this._texts : this._texts.join());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "options", {
        set: function (val) {
            this._options = val;
            if (!this._values.length) {
                // there are no values set at this point
                // so check to see who should be checked
                this._values = val.toArray().filter(function (o) { return o.checked; }).map(function (o) { return o.value; });
            }
            this.updateOptions();
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.updateOptions = function () {
        var _this = this;
        this._texts = [];
        if (this._options) {
            this._options.toArray().forEach(function (option) {
                // check this option if the option's value is in the values array
                option.checked = (_this._values.indexOf(option.value) > -1);
                if (option.checked) {
                    _this._texts.push(option.text);
                }
            });
        }
        this._text = this._texts.join(', ');
    };
    Select.prototype.ngAfterContentInit = function () {
        var _this = this;
        // using a setTimeout here to prevent
        // "has changed after it was checked" error
        // this will be fixed in future ng2 versions
        setTimeout(function () {
            _this.onChange(_this._values);
        });
    };
    Object.defineProperty(Select.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-select-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    Select.prototype.writeValue = function (val) {
        if (!util_1.isBlank(val)) {
            this.value = val;
        }
    };
    /**
     * @private
     */
    Select.prototype.onChange = function (val) { };
    /**
     * @private
     */
    Select.prototype.onTouched = function (val) { };
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    Select.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    Select.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "cancelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "okText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "alertOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "checked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Select.prototype, "change", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Select.prototype, "_click", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "multiple", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "value", null);
    __decorate([
        core_1.ContentChildren(option_1.Option), 
        __metadata('design:type', core_1.QueryList), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], Select.prototype, "options", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "disabled", null);
    Select = __decorate([
        core_1.Component({
            selector: 'ion-select',
            template: '<div class="select-text">{{_text}}</div>' +
                '<div class="select-icon">' +
                '<div class="select-icon-inner"></div>' +
                '</div>' +
                '<button aria-haspopup="true" ' +
                '[id]="id" ' +
                '[attr.aria-labelledby]="_labelId" ' +
                '[attr.aria-disabled]="_disabled" ' +
                'class="item-cover">' +
                '</button>',
            host: {
                '[class.select-disabled]': '_disabled'
            }
        }),
        __param(3, core_1.Optional()),
        __param(4, core_1.Optional()),
        __param(5, core_1.Optional()), 
        __metadata('design:paramtypes', [form_1.Form, core_1.ElementRef, core_1.Renderer, item_1.Item, nav_controller_1.NavController, common_1.NgControl])
    ], Select);
    return Select;
})();
exports.Select = Select;
