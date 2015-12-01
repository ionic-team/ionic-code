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
import { Component, Directive, ElementRef, Host, Optional, NgControl, Query, QueryList } from 'angular2/angular2';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { ListHeader } from '../list/list';
/**
 * A radio group is a group of radio components.
 *
 * Selecting a radio button in the group unselects all others in the group.
 *
 * New radios can be registered dynamically.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-list radio-group ng-control="clientside">
 *
 *   <ion-list-header>
 *     Clientside
 *   </ion-list-header>
 *
 *   <ion-radio value="ember">
 *     Ember
 *   </ion-radio>
 *
 *   <ion-radio value="angular1">
 *     Angular 1
 *   </ion-radio>
 *
 *   <ion-radio value="angular2" checked="true">
 *     Angular 2
 *   </ion-radio>
 *
 *   <ion-radio value="react">
 *     React
 *   </ion-radio>
 *
 * </ion-list>
 * ```
*/
export let RadioGroup = class extends Ion {
    constructor(elementRef, config, ngControl, headerQuery) {
        super(elementRef, config);
        this.headerQuery = headerQuery;
        this.radios = [];
        this.ngControl = ngControl;
        this.id = ++radioGroupIds;
        this.radioIds = -1;
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
        if (ngControl)
            this.ngControl.valueAccessor = this;
    }
    /**
     * @private
     */
    onInit() {
        let header = this.headerQuery.first;
        if (header) {
            if (!header.id) {
                header.id = 'radio-header-' + this.id;
            }
            this.describedById = header.id;
        }
    }
    /**
     * @private
     * Register the specified radio button with the radio group.
     * @param {RadioButton} radio  The radio button to register.
     */
    registerRadio(radio) {
        radio.id = radio.id || ('radio-' + this.id + '-' + (++this.radioIds));
        this.radios.push(radio);
        if (this.value == radio.value) {
            radio.check(this.value);
        }
        if (radio.checked) {
            this.value = radio.value;
            this.onChange(this.value);
            this.activeId = radio.id;
        }
    }
    /**
     * @private
     * Update which radio button in the group is checked, unchecking all others.
     * @param {RadioButton} checkedRadio  The radio button to check.
     */
    update(checkedRadio) {
        this.value = checkedRadio.value;
        this.activeId = checkedRadio.id;
        for (let radio of this.radios) {
            radio.checked = (radio === checkedRadio);
        }
        this.onChange(this.value);
    }
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    writeValue(value) {
        this.value = value;
        for (let radio of this.radios) {
            radio.checked = (radio.value == value);
        }
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
     * the onTouched event handler that marks the model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    registerOnTouched(fn) { this.onTouched = fn; }
};
RadioGroup = __decorate([
    Directive({
        selector: '[radio-group]',
        host: {
            'role': 'radiogroup',
            '[attr.aria-activedescendant]': 'activeId',
            '[attr.aria-describedby]': 'describedById',
        }
    }),
    __param(2, Optional()),
    __param(3, Query(ListHeader)), 
    __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object, (typeof (_c = typeof NgControl !== 'undefined' && NgControl) === 'function' && _c) || Object, (typeof (_d = typeof QueryList !== 'undefined' && QueryList) === 'function' && _d) || Object])
], RadioGroup);
/**
 * @description
 * A single radio component.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 *
 * @usage
 * ```html
 * <ion-radio value="isChecked" checked="true">
 *   Radio Label
 * </ion-radio>
 * ```
 *
 */
export let RadioButton = class extends Ion {
    constructor(group, elementRef, config) {
        super(elementRef, config);
        this.group = group;
        this.tabIndex = 0;
    }
    /**
     * @private
     */
    onInit() {
        super.onInit();
        this.group.registerRadio(this);
        this.labelId = 'label-' + this.id;
    }
    /**
     * @private
     */
    click(event) {
        event.preventDefault();
        event.stopPropagation();
        this.check();
    }
    /**
     * Update the checked state of this radio button.
     * TODO: Call this toggle? Since unchecks as well
     */
    check() {
        this.checked = !this.checked;
        this.group.update(this);
    }
};
RadioButton = __decorate([
    Component({
        selector: 'ion-radio',
        inputs: [
            'value',
            'checked',
            'disabled',
            'id'
        ],
        host: {
            'role': 'radio',
            'tappable': 'true',
            '[attr.id]': 'id',
            '[attr.tab-index]': 'tabIndex',
            '[attr.aria-checked]': 'checked',
            '[attr.aria-disabled]': 'disabled',
            '[attr.aria-labelledby]': 'labelId',
            '(click)': 'click($event)',
            'class': 'item'
        },
        template: '<div class="item-inner">' +
            '<ion-item-content id="{{labelId}}">' +
            '<ng-content></ng-content>' +
            '</ion-item-content>' +
            '<media-radio>' +
            '<radio-icon></radio-icon>' +
            '</media-radio>' +
            '</div>'
    }),
    __param(0, Host()),
    __param(0, Optional()), 
    __metadata('design:paramtypes', [RadioGroup, (typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e) || Object, (typeof (_f = typeof Config !== 'undefined' && Config) === 'function' && _f) || Object])
], RadioButton);
let radioGroupIds = -1;
var _a, _b, _c, _d, _e, _f;