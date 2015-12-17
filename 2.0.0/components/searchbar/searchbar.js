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
var decorators_1 = require('../../config/decorators');
var icon_1 = require('../icon/icon');
var button_1 = require('../button/button');
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar [(ngModel)]="defaultSearch"></ion-searchbar>
 * ```
 *
 * @property {function} [cancelButtonAction] - the function that gets called by clicking the cancel button
 * @property {string} [cancelButtonText=Cancel] - sets the cancel button text to the value passed in
 * @property {boolean} [hideCancelButton=false] - Hides the cancel button
 * @property {string} [placeholder=Search] - Sets input placeholder to the value passed in
 *
 * @see {@link /docs/v2/components#search Search Component Docs}
 */
var Searchbar = (function (_super) {
    __extends(Searchbar, _super);
    function Searchbar(elementRef, config, ngControl, renderer) {
        _super.call(this, elementRef, config);
        this.blurInput = true;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.input = new core_1.EventEmitter('input');
        // If there is no control then we shouldn't do anything
        if (!ngControl)
            return;
        this.ngControl = ngControl;
        this.ngControl.valueAccessor = this;
        this.query = '';
    }
    /**
     * @private
     * On Initialization check for attributes
     */
    Searchbar.prototype.ngOnInit = function () {
        var hideCancelButton = this.hideCancelButton;
        if (typeof hideCancelButton === 'string') {
            this.hideCancelButton = (hideCancelButton === '' || hideCancelButton === 'true');
        }
        this.cancelButtonText = this.cancelButtonText || 'Cancel';
        this.placeholder = this.placeholder || 'Search';
    };
    /**
     * @private
     * After the view has initialized check if the Searchbar has a value
     */
    Searchbar.prototype.ngAfterViewInit = function () {
        this.shouldLeftAlign = this.searchbarInput.value && this.searchbarInput.value.trim() != '';
    };
    /**
     * @private
     * Sets the Searchbar to focused and aligned left on input focus.
     */
    Searchbar.prototype.inputFocused = function () {
        this.isFocused = true;
        this.shouldLeftAlign = true;
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
            this.searchbarInput.elementRef.nativeElement.focus();
            this.blurInput = true;
            return;
        }
        //console.log("Blurring input");
        this.isFocused = false;
        this.shouldLeftAlign = this.searchbarInput.value && this.searchbarInput.value.trim() != '';
    };
    /**
     * @private
     * Clears the input field and triggers the control change.
     */
    Searchbar.prototype.clearInput = function () {
        //console.log("Clearing input");
        this.searchbarInput.writeValue('');
        this.searchbarInput.onChange('');
        this.blurInput = false;
    };
    /**
     * @private
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    Searchbar.prototype.cancelSearchbar = function (event, value) {
        //console.log("Cancel searchbar");
        this.clearInput();
        this.blurInput = true;
        this.cancelButtonAction && this.cancelButtonAction(event, value);
    };
    /**
    * @private
    * Updates the value of query
    */
    Searchbar.prototype.updateQuery = function (value) {
        this.query = value;
        this.input.next(value);
    };
    __decorate([
        core_1.ViewChild(core_1.forwardRef(function () { return SearchbarInput; })), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "searchbarInput");
    Searchbar = __decorate([
        decorators_1.ConfigComponent({
            selector: 'ion-searchbar',
            inputs: [
                'cancelButtonAction',
                'cancelButtonText',
                'hideCancelButton',
                'placeholder'
            ],
            outputs: ['input'],
            host: {
                '[class.searchbar-left-aligned]': 'shouldLeftAlign',
                '[class.searchbar-focused]': 'isFocused',
            },
            template: '<div class="searchbar-input-container">' +
                '<button (click)="cancelSearchbar($event, query)" (mousedown)="cancelSearchbar($event, query)" clear dark class="searchbar-md-cancel">' +
                '<icon arrow-back></icon>' +
                '</button>' +
                '<div class="searchbar-search-icon"></div>' +
                '<input [value]="query" (blur)="inputBlurred($event)" (focus)="inputFocused()" class="searchbar-input" type="search" [attr.placeholder]="placeholder">' +
                '<button clear *ngIf="query" class="searchbar-clear-icon" (click)="clearInput()" (mousedown)="clearInput()"></button>' +
                '</div>' +
                '<button clear (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" [hidden]="hideCancelButton" class="searchbar-ios-cancel">{{cancelButtonText}}</button>',
            directives: [common_1.FORM_DIRECTIVES, common_1.NgIf, common_1.NgClass, icon_1.Icon, button_1.Button, core_1.forwardRef(function () { return SearchbarInput; })]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _c) || Object, (typeof (_d = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _d) || Object])
    ], Searchbar);
    return Searchbar;
    var _a, _b, _c, _d;
})(ion_1.Ion);
exports.Searchbar = Searchbar;
var SearchbarInput = (function () {
    function SearchbarInput(searchbar, elementRef, renderer) {
        this.searchbar = searchbar;
        this.renderer = renderer;
        this.elementRef = elementRef;
        if (!searchbar.ngControl)
            return;
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        this.ngControl = searchbar.ngControl;
        this.ngControl.valueAccessor = this;
    }
    /**
     * @private
     * Write a new value to the element.
     */
    SearchbarInput.prototype.writeValue = function (value) {
        this.value = value;
        if (typeof value === 'string') {
            this.searchbar.updateQuery(value);
        }
    };
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    SearchbarInput.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    SearchbarInput.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * @private
     * Update the Searchbar input value when the input changes
     */
    SearchbarInput.prototype.inputChanged = function (event) {
        this.writeValue(event.target.value);
        this.onChange(event.target.value);
    };
    SearchbarInput = __decorate([
        core_1.Directive({
            selector: '.searchbar-input',
            host: {
                '(keyup)': 'inputChanged($event)'
            }
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Searchbar, (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
    ], SearchbarInput);
    return SearchbarInput;
    var _a, _b;
})();
exports.SearchbarInput = SearchbarInput;