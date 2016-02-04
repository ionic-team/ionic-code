import { ElementRef } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Form } from '../../util/form';
import { Item } from '../item/item';
import { IonicApp } from '../app/app';
import { NavController } from '../nav/nav-controller';
import { NativeInput } from './native-input';
import { Platform } from '../../platform/platform';
export declare class InputBase {
    protected _form: Form;
    protected _item: Item;
    protected _app: IonicApp;
    protected _platform: Platform;
    protected _elementRef: ElementRef;
    protected _scrollView: Content;
    protected _nav: NavController;
    protected _coord: any;
    protected _deregScroll: any;
    protected _keyboardHeight: any;
    protected _scrollMove: EventListener;
    protected _type: string;
    protected _useAssist: boolean;
    protected _value: string;
    protected _isTouch: boolean;
    inputControl: NgControl;
    clearInput: any;
    placeholder: string;
    protected _native: NativeInput;
    constructor(config: Config, _form: Form, _item: Item, _app: IonicApp, _platform: Platform, _elementRef: ElementRef, _scrollView: Content, _nav: NavController, ngControl: NgControl);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    private setItemControlCss();
    ngOnDestroy(): void;
    value: string;
    type: string;
    /**
     * @private
     */
    private _nativeInput;
    /**
     * @private
     */
    private _nextInput;
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
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
    hasFocus(): boolean;
    /**
     * @private
     */
    checkHasValue(inputValue: any): void;
    /**
     * @private
     */
    focusChange(inputHasFocus: boolean): void;
    private pointerStart(ev);
    private pointerEnd(ev);
    /**
     * @private
     */
    initFocus(): void;
    /**
      * @private
     */
    clearTextInput(): void;
    /**
     * @private
     */
    private setFocus();
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
     * the onTouched event handler that marks model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    registerOnTouched(fn: any): void;
    /**
     * @private
     */
    private regScrollMove();
    /**
     * @private
     */
    private deregScrollMove();
    focusNext(): void;
    /**
     * @private
     */
    static getScrollData(inputOffsetTop: any, inputOffsetHeight: any, scrollViewDimensions: any, keyboardHeight: any, plaformHeight: any): {
        scrollAmount: number;
        scrollTo: number;
        scrollPadding: number;
        inputSafeY: number;
    };
}
