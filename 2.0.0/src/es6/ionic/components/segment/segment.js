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
import { Component, Directive, Renderer, ElementRef, EventEmitter, Host, forwardRef, Optional } from 'angular2/angular2';
import { NgControl } from 'angular2/angular2';
import { Ion } from '../ion';
import { Config } from '../../config/config';
/**
 * TODO
 */
export let Segment = class extends Ion {
    /**
     * TODO
     * @param {NgControl} ngControl  TODO
     * @param {ElementRef} elementRef  TODO
     * @param {Config} config  TODO
     * @param {Renderer} renderer  TODO
     */
    constructor(ngControl, elementRef, config, renderer) {
        super(elementRef, config);
        this.ele = elementRef.nativeElement;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.change = new EventEmitter('change');
        this.input = new EventEmitter('input');
        this.ngControl = ngControl;
        this.buttons = [];
    }
    /**
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
     * Indicate a button should be selected.
     * @param {SegmentButton} segmentButton  The button to select.
     */
    selected(segmentButton) {
        this.buttons.forEach(function (button) {
            button.isActive = false;
        });
        segmentButton.isActive = true;
        //this.onChange();
        if (!this.ngControl) {
            return;
        }
        setTimeout(() => {
            this.value = segmentButton.value;
            this.ngControl.valueAccessor.writeValue(segmentButton.value);
            this.selectFromValue(segmentButton.value);
            this.ngControl.control.updateValue(segmentButton.value);
            // Trigger on change
            this.change.next();
        });
        //this.ngControl.control().updateValue(this.value);
        // TODO: Better way to do this?
        //this.controlDirective._control().updateValue(this.value);
    }
};
Segment = __decorate([
    Component({
        selector: 'ion-segment',
        inputs: [
            'value'
        ],
        host: {
            //'(click)': 'buttonClicked($event)',
            '(change)': 'onChange($event)',
        },
        template: '<div class="ion-segment"><ng-content></ng-content></div>',
        directives: [forwardRef(() => SegmentButton)]
    }),
    __param(0, Optional()), 
    __metadata('design:paramtypes', [(typeof (_a = typeof NgControl !== 'undefined' && NgControl) === 'function' && _a) || Object, (typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c) || Object, (typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d) || Object])
], Segment);
/**
 * TODO
 */
export let SegmentControlValueAccessor = class {
    /**
     * TODO
     * @param {NgControl} ngControl  TODO
     * @param {Renderer} renderer  TODO
     * @param {ElementRef} elementRef  TODO
     * @param {Segment} segment  TODO
     */
    constructor(ngControl, renderer, elementRef, segment) {
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
        if (!ngControl) {
            // They don't want to do anything that works, so we won't do anything that breaks
            return;
        }
        this.ngControl = ngControl;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.segment = segment;
        ngControl.valueAccessor = this;
    }
    writeValue(value) {
        // both this.value and setProperty are required at the moment
        // remove when a proper imperative API is provided
        this.value = !value ? '' : value;
        this.renderer.setElementProperty(this.elementRef, 'value', this.value);
        this.segment.value = this.value;
        this.segment.selectFromValue(value);
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
};
SegmentControlValueAccessor = __decorate([
    Directive({
        selector: 'ion-segment',
        //inputs: ['value'],
        host: {
            '(change)': 'onChange($event.target.value)',
            '(input)': 'onChange($event.target.value)',
            '(blur)': 'onTouched()',
        }
    }),
    __param(0, Optional()), 
    __metadata('design:paramtypes', [(typeof (_e = typeof NgControl !== 'undefined' && NgControl) === 'function' && _e) || Object, (typeof (_f = typeof Renderer !== 'undefined' && Renderer) === 'function' && _f) || Object, (typeof (_g = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _g) || Object, Segment])
], SegmentControlValueAccessor);
/**
 * TODO
 */
export let SegmentButton = class {
    /**
     * TODO
     * @param {Segment} segment  TODO
     * @param {ElementRef} elementRef  TODO
     */
    constructor(segment, elementRef, renderer) {
        this.segment = segment;
        this.renderer = renderer;
        this.isButton = true;
        // This is a button, and it's outlined
        this.renderer.setElementAttribute(elementRef, 'button', '');
        this.renderer.setElementAttribute(elementRef, 'outline', '');
    }
    onInit() {
        this.segment.register(this);
    }
    buttonClicked(event) {
        this.segment.selected(this, event);
        event.preventDefault();
    }
};
SegmentButton = __decorate([
    Directive({
        selector: 'ion-segment-button',
        inputs: [
            'value'
        ],
        host: {
            '(click)': 'buttonClicked($event)',
            '[class.activated]': 'isActive',
        }
    }),
    __param(0, Host()), 
    __metadata('design:paramtypes', [Segment, (typeof (_h = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _h) || Object, (typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j) || Object])
], SegmentButton);
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
// TODO Android animation similar to tabs
// /**
//  * @private
//  * TODO
//  */
// @Directive({
//   selector: 'tab-highlight'
// })
// class TabHighlight {
//   constructor(@Host() tabs: Tabs, config: Config, elementRef: ElementRef) {
//     if (config.get('mode') === 'md') {
//       tabs.highlight = this;
//       this.elementRef = elementRef;
//     }
//   }
//
//   select(tab) {
//     setTimeout(() => {
//       let d = tab.btn.getDimensions();
//       let ele = this.elementRef.nativeElement;
//       ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
//
//       if (!this.init) {
//         this.init = true;
//         setTimeout(() => {
//           ele.classList.add('animate');
//         }, 64)
//       }
//     }, 32);
//   }
//
// }