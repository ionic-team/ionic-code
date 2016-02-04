import { ElementRef, EventEmitter } from 'angular2/core';
import { Ion } from '../ion';
import { Swiper } from './swiper-widget';
/**
 * @name Slides
 * @description
 * Slides is a slide box implementation based on Swiper.js
 *
 * Swiper.js:
 * The most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * @usage
 * ```ts
 * @Page({
 *  template: `
 *     <ion-slides pager (change)="onSlideChanged($event)" loop="true" autoplay="true">
 *      <ion-slide>
 *        <h3>Thank you for choosing the Awesome App!</h3>
 *        <p>
 *          The number one app for everything awesome.
 *        </p>
 *      </ion-slide>
 *      <ion-slide>
 *        <h3>Using Awesome</h3>
 *         <div id="list">
 *           <h5>Just three steps:</h5>
 *           <ol>
 *             <li>Be awesome</li>
 *             <li>Stay awesome</li>
 *             <li>There is no step 3</li>
 *           </ol>
 *         </div>
 *      </ion-slide>
 *      <ion-slide>
 *        <h3>Any questions?</h3>
 *      </ion-slide>
 *    </ion-slides>
 *    `
 *})
 *
 *```
 * @property {Boolean} [autoplay] - whether or not the slides should automatically change
 * @property {Boolean} [loop] - whether the slides should loop from the last slide back to the first
 * @property {Boolean} [bounce] - whether the slides should bounce
 * @property {Number} [index] - The slide index to start on
 * @property [pager] - add this property to enable the slide pager
 * @property {Any} [change] - expression to evaluate when a slide has been changed
 * @demo /docs/v2/demos/slides/
 * @see {@link /docs/v2/components#slides Slides Component Docs}
 */
export declare class Slides extends Ion {
    rapidUpdate: Function;
    private showPager;
    private slider;
    private maxScale;
    private zoomElement;
    private zoomGesture;
    private scale;
    private zoomLastPosX;
    private zoomLastPosY;
    private viewportWidth;
    private viewportHeight;
    private enableZoom;
    private touch;
    autoplay: any;
    loop: any;
    index: any;
    bounce: any;
    pager: any;
    options: any;
    zoom: any;
    zoomDuration: any;
    zoomMax: any;
    change: EventEmitter<any>;
    /**
     * @private
     * @param {ElementRef} elementRef  TODO
     */
    constructor(elementRef: ElementRef);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    onTap(swiper: any, e: any): void;
    /**
     * @private
     */
    onClick(swiper: any, e: any): void;
    /**
     * @private
     */
    onDoubleTap(swiper: any, e: any): void;
    /**
     * @private
     */
    onLazyImageLoad(swiper: any, slide: any, img: any): void;
    /**
     * @private
     */
    onLazyImageReady(swiper: any, slide: any, img: any): void;
    /**
     * @private
     */
    initZoom(): void;
    /**
     * @private
     */
    resetZoom(): void;
    /**
     * @private
     */
    toggleZoom(swiper: any, e: any): void;
    /**
     * @private
     */
    onTransitionStart(swiper: any, e: any): void;
    /**
     * @private
     */
    onTransitionEnd(swiper: any, e: any): void;
    /**
     * @private
     */
    onTouchStart(e: any): void;
    /**
     * @private
     */
    onTouchMove(e: any): boolean;
    /**
     * @private
     */
    onTouchEnd(e: any): void;
    /**
     * @private
     * Update the underlying slider implementation. Call this if you've added or removed
     * child slides.
     */
    update(): void;
    /**
     * @private
     */
    next(): void;
    /**
     * @private
     */
    prev(): void;
    /**
     * @private
     */
    getIndex(): number;
    /**
     * @private
     */
    getNumSlides(): number;
    /**
     * @private
     */
    isAtEnd(): boolean;
    /**
     * @private
     */
    isAtBeginning(): boolean;
    /**
     * @private
     */
    getSliderWidget(): Swiper;
}
/**
 * @private
 */
export declare class Slide {
    private ele;
    zoom: any;
    constructor(elementRef: ElementRef, slides: Slides);
}
/**
 * @private
 */
export declare class SlideLazy {
}
