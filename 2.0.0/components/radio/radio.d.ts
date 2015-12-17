import { ElementRef, QueryList } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { ListHeader } from '../list/list';
import { Form } from '../../util/form';
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
 * <ion-list radio-group ngControl="clientside">
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
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
*/
export declare class RadioGroup extends Ion {
    private headerQuery;
    radios: Array<RadioButton>;
    constructor(elementRef: ElementRef, config: Config, ngControl: NgControl, headerQuery: QueryList<ListHeader>);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     * Register the specified radio button with the radio group.
     * @param {RadioButton} radio  The radio button to register.
     */
    registerRadio(radio: any): void;
    /**
     * @private
     * Update which radio button in the group is checked, unchecking all others.
     * @param {RadioButton} checkedRadio  The radio button to check.
     */
    update(checkedRadio: any): void;
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    writeValue(value: any): void;
    /**
     * @private
     * Angular2 Forms API method called by the view (NgControl) to register the
     * onChange event handler that updates the model (Control).
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
     * @param {Function} fn  the onChange event handler.
     */
    registerOnChange(fn: any): void;
    /**
     * @private
     * Angular2 Forms API method called by the the view (NgControl) to register
     * the onTouched event handler that marks the model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    registerOnTouched(fn: any): void;
}
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
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
 */
export declare class RadioButton extends Ion {
    private form;
    constructor(group: RadioGroup, elementRef: ElementRef, config: Config, form: Form);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    click(ev: any): void;
    /**
     * Update the checked state of this radio button.
     * TODO: Call this toggle? Since unchecks as well
     */
    check(): void;
}