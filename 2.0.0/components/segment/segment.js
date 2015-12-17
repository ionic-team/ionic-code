var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var ion_1 = require('../ion');
var config_1 = require('../../config/config');
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
var Segment = (function (_super) {
    __extends(Segment, _super);
    function Segment(ngControl, elementRef, config) {
        _super.call(this, elementRef, config);
        this.change = new core_1.EventEmitter();
        /**
         * @private
         * {Array<SegmentButton>} buttons  The children SegmentButton's
         */
        this.buttons = [];
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        if (ngControl)
            ngControl.valueAccessor = this;
    }
    /**
     * @private
     * Write a new value to the element.
     */
    Segment.prototype.writeValue = function (value) {
        this.value = !value ? '' : value;
        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var button = _a[_i];
            button.isActive = (button.value === value);
        }
    };
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    Segment.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    Segment.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     * Called by child SegmentButtons to bind themselves to
     * the Segment.
     * @param {SegmentButton} segmentButton  The child SegmentButton to register.
     */
    Segment.prototype.register = function (segmentButton) {
        this.buttons.push(segmentButton);
        // If this button is registered and matches our value,
        // make sure to select it
        if (this.value == segmentButton.value) {
            this.selected(segmentButton);
        }
    };
    /**
     * @private
     * Indicate a button should be selected.
     * @param {SegmentButton} segmentButton  The button to select.
     */
    Segment.prototype.selected = function (segmentButton) {
        this.buttons.forEach(function (button) {
            button.isActive = false;
        });
        segmentButton.isActive = true;
        this.value = segmentButton.value;
        this.onChange(segmentButton.value);
        this.change.emit(this.value);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], Segment.prototype, "change");
    Segment = __decorate([
        core_1.Directive({
            selector: 'ion-segment'
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_b = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object, (typeof (_d = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _d) || Object])
    ], Segment);
    return Segment;
    var _a, _b, _c, _d;
})(ion_1.Ion);
exports.Segment = Segment;
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
var SegmentButton = (function () {
    function SegmentButton(segment, elementRef, renderer) {
        this.segment = segment;
        renderer.setElementClass(elementRef, 'segment-button', true);
        renderer.setElementAttribute(elementRef, 'tappable', '');
    }
    /**
     * @private
     * Runs after the first check only
     */
    SegmentButton.prototype.ngOnInit = function () {
        this.segment.register(this);
    };
    /**
     * @private
     * On click of a SegmentButton
     * @param {MouseEvent} event  The event that happens on click.
     */
    SegmentButton.prototype.click = function (event) {
        this.segment.selected(this, event);
    };
    SegmentButton = __decorate([
        core_1.Directive({
            selector: 'ion-segment-button',
            inputs: [
                'value'
            ],
            host: {
                '(click)': 'click($event)',
                '[class.segment-activated]': 'isActive'
            }
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Segment, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
    ], SegmentButton);
    return SegmentButton;
    var _a, _b;
})();
exports.SegmentButton = SegmentButton;