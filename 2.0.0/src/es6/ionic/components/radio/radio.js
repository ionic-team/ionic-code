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
import { Component, Directive, ElementRef, Renderer, Host, Optional, NgControl, Query, QueryList } from 'angular2/angular2';
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
 * <ion-radio-group ng-control="clientside">
 *
 *   <ion-header>
 *     Clientside
 *   </ion-header>
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
 * </ion-radio-group>
 * ```
*/
export let RadioGroup = class extends Ion {
    /**
     * TODO
     * @param {ElementRef} elementRef  TODO
     * @param {Config} config  TODO
     * @param {NgControl=} ngControl  TODO
     * @param {QueryList<ListHeader>} headerQuery  TODO
     */
    constructor(elementRef, config, renderer, ngControl, headerQuery) {
        super(elementRef, config);
        this.headerQuery = headerQuery;
        this.radios = [];
        renderer.setElementClass(elementRef, 'list', true);
        this.id = ++radioGroupIds;
        this.radioIds = -1;
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
        if (ngControl)
            ngControl.valueAccessor = this;
    }
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
     * Register the specified radio button with the radio group.
     * @param {RadioButton} radio  The radio button to register.
     */
    registerRadio(radio) {
        radio.id = radio.id || ('radio-' + this.id + '-' + (++this.radioIds));
        this.radios.push(radio);
        if (radio.checked) {
            this.value = radio.value;
            this.activeId = radio.id;
        }
    }
    /**
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
        selector: 'ion-radio-group',
        host: {
            'role': 'radiogroup',
            '[attr.aria-activedescendant]': 'activeId',
            '[attr.aria-describedby]': 'describedById'
        }
    }),
    __param(3, Optional()),
    __param(4, Query(ListHeader)), 
    __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object, (typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c) || Object, (typeof (_d = typeof NgControl !== 'undefined' && NgControl) === 'function' && _d) || Object, (typeof (_e = typeof QueryList !== 'undefined' && QueryList) === 'function' && _e) || Object])
], RadioGroup);
/**
 * @name ionRadio
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
    /**
     * Radio button constructor.
     * @param {RadioGroup=} group  The parent radio group, if any.
     * @param {ElementRef} elementRef  TODO
     * @param {Config} config  TODO
     */
    constructor(group, elementRef, config, renderer) {
        super(elementRef, config);
        renderer.setElementClass(elementRef, 'item', true);
        this.group = group;
        this.tabIndex = 0;
    }
    onInit() {
        super.onInit();
        this.group.registerRadio(this);
        this.labelId = 'label-' + this.id;
    }
    click(ev) {
        ev.preventDefault();
        ev.stopPropagation();
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
            '(click)': 'click($event)'
        },
        template: '<ion-item-content id="{{labelId}}">' +
            '<ng-content></ng-content>' +
            '</ion-item-content>' +
            '<media-radio>' +
            '<radio-icon></radio-icon>' +
            '</media-radio>'
    }),
    __param(0, Host()),
    __param(0, Optional()), 
    __metadata('design:paramtypes', [RadioGroup, (typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f) || Object, (typeof (_g = typeof Config !== 'undefined' && Config) === 'function' && _g) || Object, (typeof (_h = typeof Renderer !== 'undefined' && Renderer) === 'function' && _h) || Object])
], RadioButton);
let radioGroupIds = -1;
var _a, _b, _c, _d, _e, _f, _g, _h;