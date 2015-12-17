import { Renderer, ElementRef } from 'angular2/core';
/**
 * @name Blur
 * @description
 * The blur attribute applies the CSS blur attribute to an element. If the CSS attribute is not supported,
 * it will fall back to applying a semi-transparent background color to the element.
 *
 * @usage
 * ```html
 * <ion-card blur>
 *    This card will blur the content behind it.
 * </ion-card>
 * ```
 *
 * @demo /docs/v2/demos/blur/
 */
export declare class Blur {
    private elementRef;
    private renderer;
    constructor(elementRef: ElementRef, renderer: Renderer);
}
