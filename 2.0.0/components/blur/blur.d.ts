import { Renderer, ElementRef } from 'angular2/core';
/**
 * @name Blur
 * @description
 * The blur attribute applies the CSS blur attribute to an element. Safari only.
 *
 * @usage
 * ```html
 * <ion-card blur>
 *    This card will blur the content behind it.
 * </ion-card>
 * ```
 *
 * @demo /docs/v2/demos/blur/
 * @private
 */
export declare class Blur {
    private _elementRef;
    private _renderer;
    constructor(_elementRef: ElementRef, _renderer: Renderer);
}
