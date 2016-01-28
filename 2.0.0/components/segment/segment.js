var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var util_1 = require('../../util/util');
/**
 * @name SegmentButton
 * @description
 * The child buttons of the `ion-segment` component. Each `ion-segment-button` must have a value.
 * @property {string} [value] - the value of the segment-button. Required.
 * @usage
 * ```html
 * <ion-segment [(ngModel)]="relationship" primary>
 *   <ion-segment-button value="friends" (select)="selectedFriends()">
 *     Friends
 *   </ion-segment-button>
 *   <ion-segment-button value="enemies" (select)="selectedEnemies()">
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
    function SegmentButton(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.select = new core_1.EventEmitter();
    }
    /**
     * @private
     * On click of a SegmentButton
     */
    SegmentButton.prototype.onClick = function (ev) {
        void 0;
        this.select.emit(this);
    };
    /**
     * @private
     */
    SegmentButton.prototype.ngOnInit = function () {
        if (!util_1.isDefined(this.value)) {
            void 0;
        }
    };
    Object.defineProperty(SegmentButton.prototype, "isActive", {
        /**
         * @private
         */
        set: function (isActive) {
            this._renderer.setElementClass(this._elementRef.nativeElement, 'segment-activated', isActive);
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-pressed', isActive);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SegmentButton.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SegmentButton.prototype, "select", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SegmentButton.prototype, "onClick", null);
    SegmentButton = __decorate([
        core_1.Directive({
            selector: 'ion-segment-button',
            host: {
                'tappable': '',
                'class': 'segment-button',
                'role': 'button'
            }
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], SegmentButton);
    return SegmentButton;
})();
exports.SegmentButton = SegmentButton;
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
var Segment = (function () {
    function Segment(ngControl) {
        this.change = new core_1.EventEmitter();
        /**
         * @private
         */
        this.onChange = function (_) { };
        /**
         * @private
         */
        this.onTouched = function (_) { };
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    /**
     * @private
     * Write a new value to the element.
     */
    Segment.prototype.writeValue = function (value) {
        this.value = util_1.isDefined(value) ? value : '';
        if (this._buttons) {
            var buttons = this._buttons.toArray();
            for (var _i = 0; _i < buttons.length; _i++) {
                var button = buttons[_i];
                button.isActive = (button.value === this.value);
            }
        }
    };
    /**
     * @private
     */
    Segment.prototype.ngAfterViewInit = function () {
        var _this = this;
        var buttons = this._buttons.toArray();
        for (var _i = 0; _i < buttons.length; _i++) {
            var button = buttons[_i];
            button.select.subscribe(function (selectedButton) {
                _this.writeValue(selectedButton.value);
                _this.onChange(selectedButton.value);
                _this.change.emit(selectedButton);
            });
            if (util_1.isDefined(this.value)) {
                button.isActive = (button.value === this.value);
            }
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Segment.prototype, "change", void 0);
    __decorate([
        core_1.ContentChildren(SegmentButton), 
        __metadata('design:type', core_1.QueryList)
    ], Segment.prototype, "_buttons", void 0);
    Segment = __decorate([
        core_1.Directive({
            selector: 'ion-segment'
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [common_1.NgControl])
    ], Segment);
    return Segment;
})();
exports.Segment = Segment;
