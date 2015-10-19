"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _angular2Angular2 = require('angular2/angular2');

var _ion = require('../ion');

var _configConfig = require('../../config/config');

/**
 * TODO
 */
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
var Segment = (function (_Ion) {
    _inherits(Segment, _Ion);

    /**
     * TODO
     * @param {NgControl} ngControl  TODO
     * @param {ElementRef} elementRef  TODO
     * @param {Config} config  TODO
     * @param {Renderer} renderer  TODO
     */

    function Segment(ngControl, elementRef, config, renderer) {
        _classCallCheck(this, Segment);

        _get(Object.getPrototypeOf(Segment.prototype), "constructor", this).call(this, elementRef, config);
        this.ele = elementRef.nativeElement;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.change = new _angular2Angular2.EventEmitter('change');
        this.input = new _angular2Angular2.EventEmitter('input');
        this.ngControl = ngControl;
        this.buttons = [];
    }

    /**
     * Called by child SegmentButtons to bind themselves to
     * the Segment.
     * @param {SegmentButton} segmentButton  The child SegmentButton to register.
     */

    _createClass(Segment, [{
        key: "register",
        value: function register(segmentButton) {
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
    }, {
        key: "selectFromValue",
        value: function selectFromValue(value) {
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
    }, {
        key: "selected",
        value: function selected(segmentButton) {
            var _this = this;

            this.buttons.forEach(function (button) {
                button.isActive = false;
            });
            segmentButton.isActive = true;
            //this.onChange();
            if (!this.ngControl) {
                return;
            }
            setTimeout(function () {
                _this.value = segmentButton.value;
                _this.ngControl.valueAccessor.writeValue(segmentButton.value);
                _this.selectFromValue(segmentButton.value);
                _this.ngControl.control.updateValue(segmentButton.value);
                // Trigger on change
                _this.change.next();
            });
            //this.ngControl.control().updateValue(this.value);
            // TODO: Better way to do this?
            //this.controlDirective._control().updateValue(this.value);
        }
    }]);

    return Segment;
})(_ion.Ion);
exports.Segment = Segment;
exports.Segment = Segment = __decorate([(0, _angular2Angular2.Component)({
    selector: 'ion-segment',
    inputs: ['value'],
    host: {
        //'(click)': 'buttonClicked($event)',
        '(change)': 'onChange($event)'
    },
    template: '<div class="ion-segment"><ng-content></ng-content></div>',
    directives: [(0, _angular2Angular2.forwardRef)(function () {
        return SegmentButton;
    })]
}), __param(0, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [typeof (_a = typeof _angular2Angular2.NgControl !== 'undefined' && _angular2Angular2.NgControl) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object, typeof (_c = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _c || Object, typeof (_d = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _d || Object])], Segment);
/**
 * TODO
 */
var SegmentControlValueAccessor = (function () {
    /**
     * TODO
     * @param {NgControl} ngControl  TODO
     * @param {Renderer} renderer  TODO
     * @param {ElementRef} elementRef  TODO
     * @param {Segment} segment  TODO
     */

    function SegmentControlValueAccessor(ngControl, renderer, elementRef, segment) {
        _classCallCheck(this, SegmentControlValueAccessor);

        this.onChange = function (_) {};
        this.onTouched = function (_) {};
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

    _createClass(SegmentControlValueAccessor, [{
        key: "writeValue",
        value: function writeValue(value) {
            // both this.value and setProperty are required at the moment
            // remove when a proper imperative API is provided
            this.value = !value ? '' : value;
            this.renderer.setElementProperty(this.elementRef, 'value', this.value);
            this.segment.value = this.value;
            this.segment.selectFromValue(value);
        }
    }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
            this.onChange = fn;
        }
    }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
            this.onTouched = fn;
        }
    }]);

    return SegmentControlValueAccessor;
})();
exports.SegmentControlValueAccessor = SegmentControlValueAccessor;
exports.SegmentControlValueAccessor = SegmentControlValueAccessor = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'ion-segment',
    //inputs: ['value'],
    host: {
        '(change)': 'onChange($event.target.value)',
        '(input)': 'onChange($event.target.value)',
        '(blur)': 'onTouched()'
    }
}), __param(0, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [typeof (_e = typeof _angular2Angular2.NgControl !== 'undefined' && _angular2Angular2.NgControl) === 'function' && _e || Object, typeof (_f = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _f || Object, typeof (_g = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _g || Object, Segment])], SegmentControlValueAccessor);
/**
 * TODO
 */
var SegmentButton = (function () {
    /**
     * TODO
     * @param {Segment} segment  TODO
     * @param {ElementRef} elementRef  TODO
     */

    function SegmentButton(segment, elementRef, renderer) {
        _classCallCheck(this, SegmentButton);

        this.segment = segment;
        this.renderer = renderer;
        this.isButton = true;
        // This is a button, and it's outlined
        this.renderer.setElementAttribute(elementRef, 'button', '');
        this.renderer.setElementAttribute(elementRef, 'outline', '');
    }

    _createClass(SegmentButton, [{
        key: "onInit",
        value: function onInit() {
            this.segment.register(this);
        }
    }, {
        key: "buttonClicked",
        value: function buttonClicked(event) {
            this.segment.selected(this, event);
            event.preventDefault();
        }
    }]);

    return SegmentButton;
})();
exports.SegmentButton = SegmentButton;
exports.SegmentButton = SegmentButton = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'ion-segment-button',
    inputs: ['value'],
    host: {
        '(click)': 'buttonClicked($event)',
        '[class.activated]': 'isActive'
    }
}), __param(0, (0, _angular2Angular2.Host)()), __metadata('design:paramtypes', [Segment, typeof (_h = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _h || Object, typeof (_j = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _j || Object])], SegmentButton);
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