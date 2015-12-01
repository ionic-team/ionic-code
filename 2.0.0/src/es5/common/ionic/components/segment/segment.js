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

    function Segment(ngControl, elementRef, config) {
        _classCallCheck(this, Segment);

        _get(Object.getPrototypeOf(Segment.prototype), "constructor", this).call(this, elementRef, config);
        /**
         * @private
         */
        this.buttons = [];
        this.onChange = function (_) {};
        this.onTouched = function (_) {};
        if (ngControl) ngControl.valueAccessor = this;
    }

    /**
     * @private
     */

    _createClass(Segment, [{
        key: "writeValue",
        value: function writeValue(value) {
            this.value = !value ? '' : value;
        }

        /**
         * @private
         */
    }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
            this.onChange = fn;
        }

        /**
         * @private
         */
    }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
            this.onTouched = fn;
        }

        /**
         * @private
         * Called by child SegmentButtons to bind themselves to
         * the Segment.
         * @param {SegmentButton} segmentButton  The child SegmentButton to register.
         */
    }, {
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
         * @private
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
         * @private
         * Indicate a button should be selected.
         * @param {SegmentButton} segmentButton  The button to select.
         */
    }, {
        key: "selected",
        value: function selected(segmentButton) {
            this.buttons.forEach(function (button) {
                button.isActive = false;
            });
            segmentButton.isActive = true;
            this.value = segmentButton.value;
            this.onChange(segmentButton.value);
        }
    }]);

    return Segment;
})(_ion.Ion);
exports.Segment = Segment;
exports.Segment = Segment = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'ion-segment'
}), __param(0, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [typeof (_a = typeof _angular2Angular2.NgControl !== 'undefined' && _angular2Angular2.NgControl) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object, typeof (_c = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _c || Object])], Segment);
var SegmentButton = (function () {
    function SegmentButton(segment, elementRef, renderer) {
        _classCallCheck(this, SegmentButton);

        this.segment = segment;
        renderer.setElementAttribute(elementRef, 'button', '');
        renderer.setElementAttribute(elementRef, 'outline', '');
    }

    /**
     * @private
     */

    _createClass(SegmentButton, [{
        key: "onInit",
        value: function onInit() {
            this.segment.register(this);
        }

        /**
         * @private
         */
    }, {
        key: "click",
        value: function click(event) {
            this.segment.selected(this, event);
        }
    }]);

    return SegmentButton;
})();
exports.SegmentButton = SegmentButton;
exports.SegmentButton = SegmentButton = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'ion-segment-button',
    inputs: ['value'],
    host: {
        '(click)': 'click($event)',
        '[class.activated]': 'isActive'
    }
}), __param(0, (0, _angular2Angular2.Host)()), __metadata('design:paramtypes', [Segment, typeof (_d = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _d || Object, typeof (_e = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _e || Object])], SegmentButton);
var _a, _b, _c, _d, _e;