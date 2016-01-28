import { ElementRef } from 'angular2/core';
import { Ion } from '../ion';
/**
 * @name Scroll
 * @description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. `ion-Scroll` Can be used in places were you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 * @usage
 * ```html
 * <ion-scroll scrollX="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollY="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollX="true" scrollY="true">
 * </ion-scroll>
 * ```
 *@property {boolean} [scrollX] - whether to enable scrolling along the X axis
 *@property {boolean} [scrollY] - whether to enable scrolling along the Y axis
 *@property {boolean} [zoom] - whether to enable zooming
 *@property {number} [maxZoom] - set the max zoom amount for ion-scroll
 * @demo /docs/v2/demos/scroll/
 */
export declare class Scroll extends Ion {
    private maxScale;
    private zoomDuration;
    private scrollElement;
    constructor(elementRef: ElementRef);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * Add a scroll event handler to the scroll element if it exists.
     * @param {Function} handler  The scroll handler to add to the scroll element.
     * @returns {?Function} a function to remove the specified handler, otherwise
     * undefined if the scroll element doesn't exist.
     */
    addScrollEventListener(handler: any): () => void;
}
