var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, Renderer, ElementRef, Host, Optional, NgControl } from 'angular2/angular2';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
 * @description
 * A Segment is a group of buttons, sometimes known as Segmented Controls, that allow the user to interact with a compact group of a number of controls.
 *
 * Segments provide functionality similar to tabs, selecting one will unselect all others. You should use a tab bar instead of a segmented control when you want to let the user move back and forth between distinct pages in your app.
 *
 * @usage
 * ```html
 * <ion-segment [(ng-model)]="relationship" danger>
 *   <ion-segment-button value="friends">
 *     Friends
 *   </ion-segment-button>
 *   <ion-segment-button value="enemies">
 *     Enemies
 *   </ion-segment-button>
 * </ion-segment>
 *
 *
 * <form [ng-form-model]="myForm">
 *   <ion-segment ng-control="mapStyle" danger>
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
 */
export let Segment = class extends Ion {
    constructor(ngControl, elementRef, config) {
        super(elementRef, config);
        /**
         * @private
         */
        this.buttons = [];
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
        if (ngControl)
            ngControl.valueAccessor = this;
    }
    /**
     * @private
     */
    writeValue(value) {
        this.value = !value ? '' : value;
    }
    /**
     * @private
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @private
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @private
     * Called by child SegmentButtons to bind themselves to
     * the Segment.
     * @param {SegmentButton} segmentButton  The child SegmentButton to register.
     */
    register(segmentButton) {
        this.buttons.push(segmentButton);
        // If this button is registered and matches our value,
        // make sure to select it
        if (this.value == segmentButton.value) {
            this.selected(segmentButton);
        }
    }
    /**
     * @private
     * Select the button with the given value.
     * @param {string} value  Value of the button to select.
     */
    selectFromValue(value) {
        if (this.buttons.length == 0) {
            return;
        }
        this.buttons.forEach(function (button) {
            if (button.value === value) {
                button.isActive = true;
            }
        });
    }
    /**
     * @private
     * Indicate a button should be selected.
     * @param {SegmentButton} segmentButton  The button to select.
     */
    selected(segmentButton) {
        this.buttons.forEach(function (button) {
            button.isActive = false;
        });
        segmentButton.isActive = true;
        this.value = segmentButton.value;
        this.onChange(segmentButton.value);
    }
};
Segment = __decorate([
    Directive({
        selector: 'ion-segment'
    }),
    __param(0, Optional()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof NgControl !== 'undefined' && NgControl) === 'function' && _a) || Object, (typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c) || Object])
], Segment);
export let SegmentButton = class {
    constructor(segment, elementRef, renderer) {
        this.segment = segment;
        renderer.setElementAttribute(elementRef, 'button', '');
        renderer.setElementAttribute(elementRef, 'outline', '');
    }
    /**
     * @private
     */
    onInit() {
        this.segment.register(this);
    }
    /**
     * @private
     */
    click(event) {
        this.segment.selected(this, event);
    }
};
SegmentButton = __decorate([
    Directive({
        selector: 'ion-segment-button',
        inputs: [
            'value'
        ],
        host: {
            '(click)': 'click($event)',
            '[class.activated]': 'isActive',
        }
    }),
    __param(0, Host()), 
    __metadata('design:paramtypes', [Segment, (typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d) || Object, (typeof (_e = typeof Renderer !== 'undefined' && Renderer) === 'function' && _e) || Object])
], SegmentButton);
var _a, _b, _c, _d, _e;