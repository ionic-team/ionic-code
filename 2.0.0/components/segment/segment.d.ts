import { Renderer, ElementRef, EventEmitter } from 'angular2/core';
import { NgControl } from 'angular2/common';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
 * @name Segment
 * @description
 * A Segment is a group of buttons, sometimes known as Segmented Controls, that allow the user to interact with a compact group of a number of controls.
 * Segments provide functionality similar to tabs, selecting one will unselect all others. You should use a tab bar instead of a segmented control when you want to let the user move back and forth between distinct pages in your app.
 * You could use Angular 2's `ngModel` or `FormBuilder` API. For an overview on how `FormBuilder` works, checkout [Angular 2 Forms](http://learnangular2.com/forms/), or [Angular FormBuilder](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html)
 *
 *
 * @usage
 * ```html
 * <ion-segment [(ngModel)]="relationship" (change)="onSegmentChanged($event)" danger>
 *   <ion-segment-button value="friends">
 *     Friends
 *   </ion-segment-button>
 *   <ion-segment-button value="enemies">
 *     Enemies
 *   </ion-segment-button>
 * </ion-segment>
 *```
 *
 * Or with `FormBuilder`
 *
 *```html
 * <form [ngFormModel]="myForm">
 *   <ion-segment ngControl="mapStyle" danger>
 *     <ion-segment-button value="standard">
 *       Standard
 *     </ion-segment-button>
 *     <ion-segment-button value="hybrid">
 *       Hybrid
 *     </ion-segment-button>
 *     <ion-segment-button value="sat">
 *       Satellite
 *     </ion-segment-button>
 *   </ion-segment>
 * </form>
 * ```
 *
 * @property {Any} [change] - expression to evaluate when a segment button has been changed
 *
 * @demo /docs/v2/demos/segment/
 * @see {@link /docs/v2/components#segment Segment Component Docs}
 * @see [Angular 2 Forms](http://learnangular2.com/forms/)
 */
export declare class Segment extends Ion {
    change: EventEmitter<any>;
    /**
     * @private
     * {Array<SegmentButton>} buttons  The children SegmentButton's
     */
    buttons: Array<SegmentButton>;
    value: any;
    constructor(ngControl: NgControl, elementRef: ElementRef, config: Config);
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
     * Called by child SegmentButtons to bind themselves to
     * the Segment.
     * @param {SegmentButton} segmentButton  The child SegmentButton to register.
     */
    register(segmentButton: any): void;
    /**
     * @private
     * Indicate a button should be selected.
     * @param {SegmentButton} segmentButton  The button to select.
     */
    selected(segmentButton: any): void;
}
/**
 * @name SegmentButton
 * @description
 * The child buttons of the `ion-segment` component. Each `ion-segment-button` must have a value.
 * @property {string} [value] - the value of the segment-button.
 * @usage
 * ```html
 * <ion-segment [(ngModel)]="relationship" primary>
 *   <ion-segment-button value="friends" (click)="clickedFriends()">
 *     Friends
 *   </ion-segment-button>
 *   <ion-segment-button value="enemies" (click)="clickedEnemies()">
 *     Enemies
 *   </ion-segment-button>
 * </ion-segment>
 *```
 *
 * Or with `FormBuilder`
 *
 *```html
 * <form [ngFormModel]="myForm">
 *   <ion-segment ngControl="mapStyle" danger>
 *     <ion-segment-button value="standard">
 *       Standard
 *     </ion-segment-button>
 *     <ion-segment-button value="hybrid">
 *       Hybrid
 *     </ion-segment-button>
 *     <ion-segment-button value="sat">
 *       Satellite
 *     </ion-segment-button>
 *   </ion-segment>
 * </form>
 * ```
 *
 * @property {Any} [click] - expression to evaluate when a segment button has been clicked
 *
 * @demo /docs/v2/demos/segment/
 * @see {@link /docs/v2/components#segment Segment Component Docs}
 * @see {@link /docs/v2/api/components/segment/Segment/ Segment API Docs}
 */
export declare class SegmentButton {
    constructor(segment: Segment, elementRef: ElementRef, renderer: Renderer);
    /**
     * @private
     * Runs after the first check only
     */
    ngOnInit(): void;
    /**
     * @private
     * On click of a SegmentButton
     * @param {MouseEvent} event  The event that happens on click.
     */
    click(event: any): void;
}
