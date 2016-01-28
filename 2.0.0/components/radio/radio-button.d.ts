import { EventEmitter } from 'angular2/core';
import { Form } from '../../util/form';
import { Item } from '../item/item';
import { RadioGroup } from './radio-group';
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
export declare class RadioButton {
    private _form;
    private _item;
    private _group;
    private _checked;
    private _disabled;
    private _labelId;
    private _value;
    id: string;
    select: EventEmitter<RadioButton>;
    constructor(_form: Form, _item: Item, _group: RadioGroup);
    value: any;
    checked: any;
    /**
     * @private
     */
    updateAsChecked(val: boolean): void;
    disabled: any;
    /**
     * @private
     */
    private _click(ev);
    /**
     * @private
     */
    ngOnDestroy(): void;
}
