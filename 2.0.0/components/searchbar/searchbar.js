var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var ion_1 = require('../ion');
var config_1 = require('../../config/config');
var icon_1 = require('../icon/icon');
var button_1 = require('../button/button');
var util_1 = require('../../util/util');
/**
* @private
*/
var SearchbarInput = (function () {
    function SearchbarInput(_elementRef) {
        this._elementRef = _elementRef;
    }
    SearchbarInput.prototype.stopInput = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    __decorate([
        core_1.HostListener('input', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SearchbarInput.prototype, "stopInput", null);
    SearchbarInput = __decorate([
        core_1.Directive({
            selector: '.searchbar-input',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SearchbarInput);
    return SearchbarInput;
})();
exports.SearchbarInput = SearchbarInput;
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar [(ngModel)]="defaultSearch" (input)="triggerInput($event)" (cancel)="onCancelSearchbar($event)" (clear)="onClearSearchbar($event)"></ion-searchbar>
 * ```
 *
 * @property {string} [cancelButtonText=Cancel] - Sets the cancel button text to the value passed in
 * @property {boolean} [hideCancelButton=false] - Hides the cancel button
 * @property {string} [placeholder=Search] - Sets input placeholder to the value passed in
 *
 * @property {Any} [input] - Expression to evaluate when the Searchbar input has changed including cleared
 * @property {Any} [keydown] - Expression to evaluate when a key is pushed down in the Searchbar input
 * @property {Any} [keypress] - Expression to evaluate when a character is inserted in the Searchbar input
 * @property {Any} [keyup] - Expression to evaluate when a key is released in the Searchbar input
 * @property {Any} [blur] - Expression to evaluate when the Searchbar input has blurred
 * @property {Any} [focus] - Expression to evaluate when the Searchbar input has focused
 * @property {Any} [cancel] - Expression to evaluate when the cancel button is clicked
 * @property {Any} [clear] - Expression to evaluate when the clear input button is clicked
 *
 * @see {@link /docs/v2/components#searchbar Searchbar Component Docs}
 */
var Searchbar = (function (_super) {
    __extends(Searchbar, _super);
    function Searchbar(_elementRef, _config, ngControl) {
        _super.call(this, _elementRef);
        this._elementRef = _elementRef;
        this._config = _config;
        /**
         * @private
         */
        this.input = new core_1.EventEmitter();
        /**
         * @private
         */
        this.blur = new core_1.EventEmitter();
        /**
         * @private
         */
        this.focus = new core_1.EventEmitter();
        /**
         * @private
         */
        this.cancel = new core_1.EventEmitter();
        /**
         * @private
         */
        this.clear = new core_1.EventEmitter();
        this.value = '';
        this.blurInput = true;
        /**
         * @private
         */
        this.onChange = function (_) { };
        /**
         * @private
         */
        this.onTouched = function () { };
        // If the user passed a ngControl we need to set the valueAccessor
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    /**
     * @private
     * On Initialization check for attributes
     */
    Searchbar.prototype.ngOnInit = function () {
        this.mode = this._config.get('mode');
        var hideCancelButton = this.hideCancelButton;
        if (typeof hideCancelButton === 'string') {
            this.hideCancelButton = (hideCancelButton === '' || hideCancelButton === 'true');
        }
        this.cancelButtonText = this.cancelButtonText || 'Cancel';
        this.placeholder = this.placeholder || 'Search';
        if (this.ngModel)
            this.value = this.ngModel;
        this.onChange(this.value);
        this.shouldLeftAlign = this.value && this.value.trim() != '';
        // Using querySelector instead of searchbarInput because at this point it doesn't exist
        this.inputElement = this._elementRef.nativeElement.querySelector('.searchbar-input');
        this.searchIconElement = this._elementRef.nativeElement.querySelector('.searchbar-search-icon');
        this.setElementLeft();
    };
    /**
     * @private
     * After View Initialization check the value
     */
    Searchbar.prototype.ngAfterViewInit = function () {
        // If the user passes an undefined variable to ngModel this will warn
        // and set the value to an empty string
        if (!util_1.isDefined(this.value)) {
            void 0;
            this.value = '';
            this.onChange(this.value);
        }
    };
    /**
     * @private
     * Determines whether or not to add style to the element
     * to center it properly (ios only)
     */
    Searchbar.prototype.setElementLeft = function () {
        if (this.mode !== 'ios')
            return;
        if (this.shouldLeftAlign) {
            this.inputElement.removeAttribute("style");
            this.searchIconElement.removeAttribute("style");
        }
        else {
            this.addElementLeft();
        }
    };
    /**
     * @private
     * Calculates the amount of padding/margin left for the elements
     * in order to center them based on the placeholder width
     */
    Searchbar.prototype.addElementLeft = function () {
        // Create a dummy span to get the placeholder width
        var tempSpan = document.createElement('span');
        tempSpan.innerHTML = this.placeholder;
        document.body.appendChild(tempSpan);
        // Get the width of the span then remove it
        var textWidth = tempSpan.offsetWidth;
        tempSpan.remove();
        // Set the input padding left
        var inputLeft = "calc(50% - " + (textWidth / 2) + "px)";
        this.inputElement.style.paddingLeft = inputLeft;
        // Set the icon margin left
        var iconLeft = "calc(50% - " + ((textWidth / 2) + 30) + "px)";
        this.searchIconElement.style.marginLeft = iconLeft;
    };
    /**
     * @private
     * Update the Searchbar input value when the input changes
     */
    Searchbar.prototype.inputChanged = function (ev) {
        this.value = ev.target.value;
        this.onChange(this.value);
        this.input.emit(this);
    };
    /**
     * @private
     * Sets the Searchbar to focused and aligned left on input focus.
     */
    Searchbar.prototype.inputFocused = function () {
        this.focus.emit(this);
        this.isFocused = true;
        this.shouldLeftAlign = true;
        this.setElementLeft();
    };
    /**
     * @private
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    Searchbar.prototype.inputBlurred = function () {
        // blurInput determines if it should blur
        // if we are clearing the input we still want to stay focused in the input
        if (this.blurInput == false) {
            this.searchbarInput._elementRef.nativeElement.focus();
            this.blurInput = true;
            return;
        }
        this.blur.emit(this);
        this.isFocused = false;
        this.shouldLeftAlign = this.value && this.value.trim() != '';
        this.setElementLeft();
    };
    /**
     * @private
     * Clears the input field and triggers the control change.
     */
    Searchbar.prototype.clearInput = function () {
        this.clear.emit(this);
        this.value = '';
        this.onChange(this.value);
        this.input.emit(this);
        this.blurInput = false;
    };
    /**
     * @private
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    Searchbar.prototype.cancelSearchbar = function () {
        this.cancel.emit(this);
        this.clearInput();
        this.blurInput = true;
    };
    /**
     * @private
     * Write a new value to the element.
     */
    Searchbar.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    Searchbar.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    Searchbar.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.ViewChild(SearchbarInput), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "searchbarInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Searchbar.prototype, "cancelButtonText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "hideCancelButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Searchbar.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "ngModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "input", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "blur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "focus", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "cancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "clear", void 0);
    __decorate([
        core_1.HostBinding('class.searchbar-focused'), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "isFocused", void 0);
    __decorate([
        core_1.HostBinding('class.searchbar-left-aligned'), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "shouldLeftAlign", void 0);
    Searchbar = __decorate([
        core_1.Component({
            selector: 'ion-searchbar',
            template: '<div class="searchbar-input-container">' +
                '<button (click)="cancelSearchbar()" (mousedown)="cancelSearchbar()" clear dark class="searchbar-md-cancel">' +
                '<ion-icon name="arrow-back"></ion-icon>' +
                '</button>' +
                '<div class="searchbar-search-icon"></div>' +
                '<input [value]="value" (keyup)="inputChanged($event)" (blur)="inputBlurred()" (focus)="inputFocused()" class="searchbar-input" type="search" [attr.placeholder]="placeholder">' +
                '<button clear *ngIf="value" class="searchbar-clear-icon" (click)="clearInput()" (mousedown)="clearInput()"></button>' +
                '</div>' +
                '<button clear (click)="cancelSearchbar()" (mousedown)="cancelSearchbar()" [hidden]="hideCancelButton" class="searchbar-ios-cancel">{{cancelButtonText}}</button>',
            directives: [common_1.FORM_DIRECTIVES, common_1.NgIf, common_1.NgClass, icon_1.Icon, button_1.Button, SearchbarInput]
        }),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [core_1.ElementRef, config_1.Config, common_1.NgControl])
    ], Searchbar);
    return Searchbar;
})(ion_1.Ion);
exports.Searchbar = Searchbar;
