import { ElementRef, Renderer } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Form } from '../../util/form';
import { Config } from '../../config/config';
import { Item } from '../item/item';
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
export declare class Toggle {
    private _form;
    private _elementRef;
    private _renderer;
    private _item;
    private _checked;
    private _disabled;
    private _labelId;
    private _activated;
    private _mode;
    private _startX;
    private _touched;
    id: string;
    value: string;
    constructor(_form: Form, _elementRef: ElementRef, _renderer: Renderer, config: Config, ngControl: NgControl, _item: Item);
    /**
     * @private
     * Toggle the checked state of this toggle.
     */
    toggle(): void;
    checked: any;
    disabled: any;
    /**
     * @private
     */
    private pointerDown(ev);
    /**
     * @private
     */
    private pointerMove(ev);
    /**
     * @private
     */
    private pointerUp(ev);
    /**
     * @private
     */
    writeValue(value: any): void;
    /**
     * @private
     */
    onChange(val: any): void;
    /**
     * @private
     */
    onTouched(val: any): void;
    /**
     * @private
     */
    registerOnChange(fn: any): void;
    /**
     * @private
     */
    registerOnTouched(fn: any): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
    /**
     * @private
     */
    private isDisabled(ev);
}
