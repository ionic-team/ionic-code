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
import { ElementRef, NgControl, Renderer, FORM_DIRECTIVES, NgIf, NgClass } from 'angular2/angular2';
import { Ion } from '../ion';
import { Config } from '../../config/config';
import { ConfigComponent } from '../../config/decorators';
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
export let SearchBar = class extends Ion {
    /**
     * TODO
     * @param {ElementRef} elementRef  TODO
     * @param {Config} config  TODO
     */
    constructor(elementRef, config, ngControl, renderer) {
        super(elementRef, config);
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
    afterViewInit() {
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
    writeValue(value) {
        this.query = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    inputChanged(event) {
        console.log('input changed');
        this.writeValue(event.target.value);
        this.onChange(event.target.value);
    }
    inputFocused() {
        this.isFocused = true;
        this.shouldLeftAlign = true;
        if (this.cancelButton) {
            this.cancelButton.style.marginRight = "0px";
        }
    }
    inputBlurred() {
        this.isFocused = false;
        this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
        if (this.cancelButton) {
            this.cancelButton.style.marginRight = "-" + this.cancelWidth + "px";
        }
    }
    clearInput(event) {
        this.writeValue('');
        this.onChange('');
    }
};
SearchBar = __decorate([
    ConfigComponent({
        selector: 'ion-search-bar',
        defaultInputs: {
            'showCancel': false,
            'cancelText': 'Cancel',
            'placeholder': 'Search',
            'cancelAction': function (event, model) {
                // The cancel button now works on its own to blur the input
                console.log('Default Cancel');
            }
        },
        template: '<div class="search-bar-input-container" [class.left-align]="shouldLeftAlign">' +
            '<div class="search-bar-search-icon"></div>' +
            '<input [(value)]="query" (focus)="inputFocused()" (blur)="inputBlurred()" ' +
            '(input)="inputChanged($event)" class="search-bar-input" type="search" [attr.placeholder]="placeholder">' +
            '<button clear *ng-if="query" class="search-bar-close-icon" (click)="clearInput($event)"></button>' +
            '</div>' +
            '<button *ng-if="showCancel" (click)="cancelAction($event, model)" class="search-bar-cancel" [class.left-align]="shouldLeftAlign">{{cancelText}}</button>',
        directives: [FORM_DIRECTIVES, NgIf, NgClass]
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object, (typeof (_c = typeof NgControl !== 'undefined' && NgControl) === 'function' && _c) || Object, (typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d) || Object])
], SearchBar);
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