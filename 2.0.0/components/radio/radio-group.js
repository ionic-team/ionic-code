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
var list_1 = require('../list/list');
var util_1 = require('../../util/util');
/**
 * A radio group is a group of radio components, and its value comes
 * from the selected radio button's value. Selecting a radio button
 * in the group unselects all others in the group.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-list radio-group [(ngModel)]="autoManufacturers">
 *
 *   <ion-list-header>
 *     Auto Manufacturers
 *   </ion-list-header>
 *
 *   <ion-item>
 *     <ion-label>Cord</ion-label>
 *     <ion-radio value="cord"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Duesenberg</ion-label>
 *     <ion-radio value="duesenberg" checked="true"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Hudson</ion-label>
 *     <ion-radio value="hudson"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Packard</ion-label>
 *     <ion-radio value="packard"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Studebaker</ion-label>
 *     <ion-radio value="studebaker"></ion-radio>
 *   </ion-item>
 *
 * </ion-list>
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
*/
var RadioGroup = (function () {
    function RadioGroup(ngControl, _renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._buttons = [];
        this._ids = -1;
        this._init = false;
        this.change = new core_1.EventEmitter();
        this.id = ++radioGroupIds;
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    RadioGroup.prototype.writeValue = function (val) {
        if (val !== null) {
            var oldVal = this.value;
            // set the radiogroup's value
            this.value = val || '';
            this.updateValue();
            // only emit change when it...changed
            if (this.value !== oldVal && this._init) {
                this.change.emit(this.value);
            }
            this._init = true;
        }
    };
    RadioGroup.prototype.ngAfterContentInit = function () {
        var _this = this;
        // in a setTimeout to prevent
        // Expression '_checked in RadioButton@0:24' has changed after
        // it was checked. Previous value: 'true'. Current value: 'false'
        // should be available in future versions of ng2
        setTimeout(function () {
            _this.updateValue();
        });
    };
    RadioGroup.prototype.updateValue = function () {
        var _this = this;
        if (util_1.isDefined(this.value)) {
            // loop through each of the radiobuttons
            this._buttons.forEach(function (radioButton) {
                // check this radiobutton if its value is
                // the same as the radiogroups value
                var isChecked = (radioButton.value === _this.value);
                radioButton.updateAsChecked(isChecked);
                if (isChecked) {
                    // if this button is checked, then set it as
                    // the radiogroup's active descendant
                    _this._renderer.setElementAttribute(_this._elementRef.nativeElement, 'aria-activedescendant', radioButton.id);
                }
            });
        }
    };
    RadioGroup.prototype.register = function (button) {
        var _this = this;
        this._buttons.push(button);
        // listen for radiobutton select events
        button.select.subscribe(function () {
            // this radiobutton has been selected
            _this.writeValue(button.value);
            _this.onChange(button.value);
        });
        return this.id + '-' + (++this._ids);
    };
    Object.defineProperty(RadioGroup.prototype, "_header", {
        set: function (header) {
            if (header) {
                if (!header.id) {
                    header.id = 'rg-hdr-' + this.id;
                }
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-describedby', header.id);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    RadioGroup.prototype.onChange = function (val) { };
    /**
     * @private
     */
    RadioGroup.prototype.onTouched = function (val) { };
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    RadioGroup.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks the model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    RadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RadioGroup.prototype, "change", void 0);
    __decorate([
        core_1.ContentChild(list_1.ListHeader), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], RadioGroup.prototype, "_header", null);
    RadioGroup = __decorate([
        core_1.Directive({
            selector: '[radio-group]',
            host: {
                '[attr.aria-activedescendant]': 'activeId',
                'role': 'radiogroup'
            }
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [common_1.NgControl, core_1.Renderer, core_1.ElementRef])
    ], RadioGroup);
    return RadioGroup;
})();
exports.RadioGroup = RadioGroup;
var radioGroupIds = -1;
