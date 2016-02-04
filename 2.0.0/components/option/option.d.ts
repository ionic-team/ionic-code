import { ElementRef, EventEmitter } from 'angular2/core';
/**
 * @name Option
 */
export declare class Option {
    private _elementRef;
    private _checked;
    private _value;
    select: EventEmitter<any>;
    constructor(_elementRef: ElementRef);
    checked: any;
    value: any;
    text: any;
}
