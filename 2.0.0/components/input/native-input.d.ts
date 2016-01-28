import { ElementRef, Renderer, EventEmitter } from 'angular2/core';
import { NgControl } from 'angular2/common';
/**
 * @private
 */
export declare class NativeInput {
    private _elementRef;
    private _renderer;
    ngControl: NgControl;
    private _relocated;
    focusChange: EventEmitter<boolean>;
    valueChange: EventEmitter<string>;
    constructor(_elementRef: ElementRef, _renderer: Renderer, ngControl: NgControl);
    /**
     * @private
     */
    private _change(ev);
    /**
     * @private
     */
    private _focus();
    /**
     * @private
     */
    private _blur();
    labelledBy(val: string): void;
    /**
     * @private
     */
    setFocus(): void;
    /**
     * @private
     */
    relocate(shouldRelocate: boolean, inputRelativeY: number): void;
    /**
     * @private
     */
    hideFocus(shouldHideFocus: boolean): void;
    hasFocus(): boolean;
    getValue(): string;
    /**
     * @private
     */
    private element();
}
/**
 * @private
 */
export declare class NextInput {
    focused: EventEmitter<boolean>;
    receivedFocus(): void;
}
