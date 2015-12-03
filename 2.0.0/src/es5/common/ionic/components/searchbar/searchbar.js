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

var _configDecorators = require('../../config/decorators');

var _iconIcon = require('../icon/icon');

/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a search bar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar [(ng-model)]="defaultSearch"></ion-searchbar>
 * ```
 *
 * @property [placeholder] - sets input placeholder to value passed in
 * @property [show-cancel] - shows the cancel button based on boolean value passed in
 * @property [cancel-text] - sets the cancel button text to the value passed in
 * @property [cancel-action] - the function that gets called by clicking the cancel button
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
var Searchbar = (function (_Ion) {
    _inherits(Searchbar, _Ion);

    function Searchbar(elementRef, config, ngControl, renderer) {
        _classCallCheck(this, Searchbar);

        _get(Object.getPrototypeOf(Searchbar.prototype), "constructor", this).call(this, elementRef, config);
        this.renderer = renderer;
        this.elementRef = elementRef;
        // If there is no control then we shouldn't do anything
        if (!ngControl) return;
        this.ngControl = ngControl;
        this.ngControl.valueAccessor = this;
    }

    /**
     * @private
     * After the view has initialized check if the searchbar has a value
     * and then store that value in query
     */

    _createClass(Searchbar, [{
        key: "afterViewInit",
        value: function afterViewInit() {
            // If the user passes in a value to the model we should left align
            this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
            this.query = this.ngControl.value || '';
        }

        /**
         * @private
         * Write a new value to the element.
         */
    }, {
        key: "writeValue",
        value: function writeValue(value) {
            this.query = value;
        }

        /**
         * @private
         * Set the function to be called when the control receives a change event.
         */
    }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
            this.onChange = fn;
        }

        /**
         * @private
         * Set the function to be called when the control receives a touch event.
         */
    }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
            this.onTouched = fn;
        }

        /**
         * @private
         * Updates the value of the control when the searchbar input changes.
         */
    }, {
        key: "inputChanged",
        value: function inputChanged(event) {
            this.writeValue(event.target.value);
            this.onChange(event.target.value);
        }

        /**
         * @private
         * Sets the searchbar to focused and aligned left on input focus.
         */
    }, {
        key: "inputFocused",
        value: function inputFocused() {
            this.isFocused = true;
            this.shouldLeftAlign = true;
        }

        /**
         * @private
         * Sets the searchbar to not focused and checks if it should align left
         * based on whether there is a value in the searchbar or not on input blur.
         */
    }, {
        key: "inputBlurred",
        value: function inputBlurred() {
            this.isFocused = false;
            this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
        }

        /**
         * @private
         * Clears the input field and triggers the control change.
         */
    }, {
        key: "clearInput",
        value: function clearInput(event) {
            this.writeValue('');
            this.onChange('');
        }

        /**
         * @private
         * Blurs the input field, clears the input field and removes the left align
         * then calls the custom cancel function if the user passed one in.
         */
    }, {
        key: "cancelSearchbar",
        value: function cancelSearchbar(event, query) {
            this.element = this.elementRef.nativeElement.querySelector('input');
            this.element.blur();
            this.clearInput();
            this.shouldLeftAlign = false;
            this.cancelAction && this.cancelAction(event, query);
        }
    }]);

    return Searchbar;
})(_ion.Ion);
exports.Searchbar = Searchbar;
exports.Searchbar = Searchbar = __decorate([(0, _configDecorators.ConfigComponent)({
    selector: 'ion-searchbar',
    defaultInputs: {
        'showCancel': false,
        'cancelText': 'Cancel',
        'placeholder': 'Search'
    },
    inputs: ['cancelAction'],
    host: {
        '[class.left-align]': 'shouldLeftAlign',
        '[class.focused]': 'isFocused'
    },
    template: '<div class="searchbar-input-container">' + '<button (click)="cancelSearchbar($event, query)" clear dark class="searchbar-cancel-icon"><icon arrow-back></icon></button>' + '<div class="searchbar-search-icon"></div>' + '<input [(value)]="query" (focus)="inputFocused()" (blur)="inputBlurred()" ' + '(input)="inputChanged($event)" class="searchbar-input" type="search" [attr.placeholder]="placeholder">' + '<button clear *ng-if="query" class="searchbar-close-icon" (click)="clearInput($event)"></button>' + '</div>' + '<button *ng-if="showCancel" (click)="cancelSearchbar($event, query)" class="searchbar-cancel">{{cancelText}}</button>',
    directives: [_angular2Angular2.FORM_DIRECTIVES, _angular2Angular2.NgIf, _angular2Angular2.NgClass, _iconIcon.Icon]
}), __metadata('design:paramtypes', [typeof (_a = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _a || Object, typeof (_b = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _b || Object, typeof (_c = typeof _angular2Angular2.NgControl !== 'undefined' && _angular2Angular2.NgControl) === 'function' && _c || Object, typeof (_d = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _d || Object])], Searchbar);
var _a, _b, _c, _d;