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
import { Component, Optional, NgControl, ElementRef } from 'angular2/angular2';
import { Form } from '../../util/form';
/**
 * The checkbox is no different than the HTML checkbox input, except it's styled differently
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/core/Form-interface.html) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-checkbox checked="true" value="isChecked" ng-control="htmlCtrl">
 *   HTML5
 * </ion-checkbox>
 * ```
 */
export let Checkbox = class {
    constructor(form, ngControl, elementRef) {
        this.form = form;
        form.register(this);
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
        this.ngControl = ngControl;
        if (ngControl)
            ngControl.valueAccessor = this;
    }
    onInit() {
        this.labelId = 'label-' + this.inputId;
    }
    /**
     * Toggle the checked state of the checkbox. Calls onChange to pass the
     * updated checked state to the model (Control).
     */
    toggle() {
        this.checked = !this.checked;
        this.onChange(this.checked);
    }
    /**
     * @private
     * Click event handler to toggle the checkbox checked state.
     * @param {MouseEvent} ev  The click event.
     */
    click(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.toggle();
    }
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    writeValue(value) {
        this.checked = value;
    }
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @private
     */
    onDestroy() {
        this.form.deregister(this);
    }
};
Checkbox = __decorate([
    Component({
        selector: 'ion-checkbox',
        inputs: [
            'value',
            'checked',
            'disabled',
            'id'
        ],
        host: {
            'role': 'checkbox',
            'tappable': 'true',
            '[attr.tab-index]': 'tabIndex',
            '[attr.aria-checked]': 'checked',
            '[attr.aria-disabled]': 'disabled',
            '[attr.aria-labelledby]': 'labelId',
            '(click)': 'click($event)',
            'class': 'item'
        },
        template: '<div class="item-inner">' +
            '<media-checkbox disable-activated>' +
            '<checkbox-icon></checkbox-icon>' +
            '</media-checkbox>' +
            '<ion-item-content id="{{labelId}}">' +
            '<ng-content></ng-content>' +
            '</ion-item-content>' +
            '</div>'
    }),
    __param(1, Optional()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof Form !== 'undefined' && Form) === 'function' && _a) || Object, (typeof (_b = typeof NgControl !== 'undefined' && NgControl) === 'function' && _b) || Object, (typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c) || Object])
], Checkbox);
var _a, _b, _c;