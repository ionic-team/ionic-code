import { ElementRef, Renderer } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar [(ngModel)]="defaultSearch"></ion-searchbar>
 * ```
 *
 * @property {function} [cancelButtonAction] - the function that gets called by clicking the cancel button
 * @property {string} [cancelButtonText=Cancel] - sets the cancel button text to the value passed in
 * @property {boolean} [hideCancelButton=false] - Hides the cancel button
 * @property {string} [placeholder=Search] - Sets input placeholder to the value passed in
 *
 * @see {@link /docs/v2/components#search Search Component Docs}
 */
export declare class Searchbar extends Ion {
    searchbarInput: any;
    query: string;
    blurInput: boolean;
    constructor(elementRef: ElementRef, config: Config, ngControl: NgControl, renderer: Renderer);
    /**
     * @private
     * On Initialization check for attributes
     */
    ngOnInit(): void;
    /**
     * @private
     * After the view has initialized check if the Searchbar has a value
     */
    ngAfterViewInit(): void;
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
    cancelSearchbar(event: any, value: any): void;
    /**
    * @private
    * Updates the value of query
    */
    updateQuery(value: any): void;
}
export declare class SearchbarInput {
    constructor(searchbar: Searchbar, elementRef: ElementRef, renderer: Renderer);
    /**
     * @private
     * Write a new value to the element.
     */
    writeValue(value: any): void;
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: any): void;
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: any): void;
    /**
     * @private
     * Update the Searchbar input value when the input changes
     */
    inputChanged(event: any): void;
}
