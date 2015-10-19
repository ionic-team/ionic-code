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

/**
 * @name Search Bar
 * @description
 * The Search Bar service adds an input field which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-search-bar ng-control="searchQuery"></ion-search-bar>
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
var SearchBar = (function (_Ion) {
    _inherits(SearchBar, _Ion);

    /**
     * TODO
     * @param {ElementRef} elementRef  TODO
     * @param {Config} config  TODO
     */

    function SearchBar(elementRef, config, ngControl, renderer) {
        _classCallCheck(this, SearchBar);

        _get(Object.getPrototypeOf(SearchBar.prototype), "constructor", this).call(this, elementRef, config);
        this.renderer = renderer;
        this.elementRef = elementRef;
        if (!ngControl) {
            // They don't want to do anything that works, so we won't do anything that breaks
            return;
        }
        this.ngControl = ngControl;
        this.ngControl.valueAccessor = this;
    }

    // Add the margin for iOS

    _createClass(SearchBar, [{
        key: "afterViewInit",
        value: function afterViewInit() {
            this.cancelButton = this.elementRef.nativeElement.querySelector('.search-bar-cancel');
            if (this.cancelButton) {
                this.cancelWidth = this.cancelButton.offsetWidth;
                this.cancelButton.style.marginRight = "-" + this.cancelWidth + "px";
            }
            // If the user passes in a value to the model we should left align
            this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
            this.query = this.ngControl.value || '';
        }

        /**
         * Much like ngModel, this is called from our valueAccessor for the attached
         * ControlDirective to update the value internally.
         */
    }, {
        key: "writeValue",
        value: function writeValue(value) {
            this.query = value;
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
    }, {
        key: "inputChanged",
        value: function inputChanged(event) {
            console.log('input changed');
            this.writeValue(event.target.value);
            this.onChange(event.target.value);
        }
    }, {
        key: "inputFocused",
        value: function inputFocused() {
            this.isFocused = true;
            this.shouldLeftAlign = true;
            if (this.cancelButton) {
                this.cancelButton.style.marginRight = "0px";
            }
        }
    }, {
        key: "inputBlurred",
        value: function inputBlurred() {
            this.isFocused = false;
            this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
            if (this.cancelButton) {
                this.cancelButton.style.marginRight = "-" + this.cancelWidth + "px";
            }
        }
    }, {
        key: "clearInput",
        value: function clearInput(event) {
            this.writeValue('');
            this.onChange('');
        }
    }]);

    return SearchBar;
})(_ion.Ion);
exports.SearchBar = SearchBar;
exports.SearchBar = SearchBar = __decorate([(0, _configDecorators.ConfigComponent)({
    selector: 'ion-search-bar',
    defaultInputs: {
        'showCancel': false,
        'cancelText': 'Cancel',
        'placeholder': 'Search',
        'cancelAction': function cancelAction(event, model) {
            // The cancel button now works on its own to blur the input
            console.log('Default Cancel');
        }
    },
    template: '<div class="search-bar-input-container" [class.left-align]="shouldLeftAlign">' + '<div class="search-bar-search-icon"></div>' + '<input [(value)]="query" (focus)="inputFocused()" (blur)="inputBlurred()" ' + '(input)="inputChanged($event)" class="search-bar-input" type="search" [attr.placeholder]="placeholder">' + '<button clear *ng-if="query" class="search-bar-close-icon" (click)="clearInput($event)"></button>' + '</div>' + '<button *ng-if="showCancel" (click)="cancelAction($event, model)" class="search-bar-cancel" [class.left-align]="shouldLeftAlign">{{cancelText}}</button>',
    directives: [_angular2Angular2.FORM_DIRECTIVES, _angular2Angular2.NgIf, _angular2Angular2.NgClass]
}), __metadata('design:paramtypes', [typeof (_a = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _a || Object, typeof (_b = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _b || Object, typeof (_c = typeof _angular2Angular2.NgControl !== 'undefined' && _angular2Angular2.NgControl) === 'function' && _c || Object, typeof (_d = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _d || Object])], SearchBar);
var _a, _b, _c, _d;
/*
export class SearchPipe extends Pipe {
  constructor() {
    super();
    this.state = 0;
  }

  supports(newValue) {
    return true;
  }

  transform(value, ...args) {
    return value;
    //return `${value} state:${this.state ++}`;
  }

  create(cdRef) {
    return new SearchPipe(cdRef);
  }
}
*/