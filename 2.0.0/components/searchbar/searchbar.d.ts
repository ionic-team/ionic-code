import { ElementRef, EventEmitter } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
* @private
*/
export declare class SearchbarInput {
    private _elementRef;
    private stopInput(event);
    constructor(_elementRef: ElementRef);
}
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar [(ngModel)]="defaultSearch" (input)="triggerInput($event)" (cancel)="onCancelSearchbar($event)" (clear)="onClearSearchbar($event)"></ion-searchbar>
 * ```
 *
 * @property {string} [cancelButtonText=Cancel] - Sets the cancel button text to the value passed in
 * @property {boolean} [hideCancelButton=false] - Hides the cancel button
 * @property {string} [placeholder=Search] - Sets input placeholder to the value passed in
 *
 * @property {Any} [input] - Expression to evaluate when the Searchbar input has changed including cleared
 * @property {Any} [keydown] - Expression to evaluate when a key is pushed down in the Searchbar input
 * @property {Any} [keypress] - Expression to evaluate when a character is inserted in the Searchbar input
 * @property {Any} [keyup] - Expression to evaluate when a key is released in the Searchbar input
 * @property {Any} [blur] - Expression to evaluate when the Searchbar input has blurred
 * @property {Any} [focus] - Expression to evaluate when the Searchbar input has focused
 * @property {Any} [cancel] - Expression to evaluate when the cancel button is clicked
 * @property {Any} [clear] - Expression to evaluate when the clear input button is clicked
 *
 * @see {@link /docs/v2/components#searchbar Searchbar Component Docs}
 */
export declare class Searchbar extends Ion {
    private _elementRef;
    private _config;
    searchbarInput: any;
    /**
     * @private
     */
    cancelButtonText: string;
    /**
     * @private
     */
    hideCancelButton: any;
    /**
     * @private
     */
    placeholder: string;
    /**
     * @private
     */
    ngModel: any;
    /**
     * @private
     */
    input: EventEmitter<Searchbar>;
    /**
     * @private
     */
    blur: EventEmitter<Searchbar>;
    /**
     * @private
     */
    focus: EventEmitter<Searchbar>;
    /**
     * @private
     */
    cancel: EventEmitter<Searchbar>;
    /**
     * @private
     */
    clear: EventEmitter<Searchbar>;
    value: string;
    blurInput: boolean;
    inputElement: any;
    searchIconElement: any;
    mode: string;
    isFocused: any;
    shouldLeftAlign: any;
    constructor(_elementRef: ElementRef, _config: Config, ngControl: NgControl);
    /**
     * @private
     * On Initialization check for attributes
     */
    ngOnInit(): void;
    /**
     * @private
     * After View Initialization check the value
     */
    ngAfterViewInit(): void;
    /**
     * @private
     * Determines whether or not to add style to the element
     * to center it properly (ios only)
     */
    setElementLeft(): void;
    /**
     * @private
     * Calculates the amount of padding/margin left for the elements
     * in order to center them based on the placeholder width
     */
    addElementLeft(): void;
    /**
     * @private
     * Update the Searchbar input value when the input changes
     */
    inputChanged(ev: any): void;
    /**
     * @private
     * Sets the Searchbar to focused and aligned left on input focus.
     */
    inputFocused(): void;
    /**
     * @private
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    inputBlurred(): void;
    /**
     * @private
     * Clears the input field and triggers the control change.
     */
    clearInput(): void;
    /**
     * @private
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    cancelSearchbar(): void;
    /**
     * @private
     * Write a new value to the element.
     */
    writeValue(value: any): void;
    /**
     * @private
     */
    onChange: (_: any) => void;
    /**
     * @private
     */
    onTouched: () => void;
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: (_: any) => {}): void;
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: () => {}): void;
}
