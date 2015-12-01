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
import { Directive, ElementRef, Renderer } from 'angular2/angular2';
import { Config } from '../../config/config';
export let Icon = class {
    constructor(elementRef, config, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.config = config;
        this.mode = config.get('iconMode');
    }
    /**
     * @private
     */
    onInit() {
        let ele = this.elementRef.nativeElement;
        if (this.mode == 'ios' && this.ios) {
            this.name = this.ios;
        }
        else if (this.mode == 'md' && this.md) {
            this.name = this.md;
        }
        else if (!this.name) {
            // looping through native dom attributes, eww
            // https://github.com/angular/angular/issues/3961
            for (let i = 0, l = ele.attributes.length; i < l; i++) {
                if (ele.attributes[i].value === '' && /_|item-|is-active|large|small|class/.test(ele.attributes[i].name) !== true) {
                    this.name = ele.attributes[i].name;
                    break;
                }
            }
        }
        if (!this.name)
            return;
        if (!(/^ion-/.test(this.name))) {
            // not an exact icon being used
            // add mode specific prefix
            this.name = 'ion-' + this.mode + '-' + this.name;
        }
        this.update();
    }
    get isActive() {
        return (this._isActive === undefined || this._isActive === true || this._isActive === 'true');
    }
    /**
     * @private
     */
    set isActive(val) {
        this._isActive = val;
        this.update();
    }
    /**
     * @private
     */
    update() {
        if (this.name && this.mode == 'ios') {
            if (this.isActive) {
                if (/-outline/.test(this.name)) {
                    this.name = this.name.replace('-outline', '');
                }
            }
            else if (!(/-outline/.test(this.name))) {
                this.name += '-outline';
            }
        }
        if (this._name !== this.name) {
            if (this._name) {
                this.renderer.setElementClass(this.elementRef, this._name, false);
            }
            this._name = this.name;
            this.renderer.setElementClass(this.elementRef, this.name, true);
            this.renderer.setElementAttribute(this.elementRef, 'aria-label', this.name.replace('ion-', '').replace('ios-', '').replace('md-', '').replace('-', ' '));
        }
    }
};
Icon = __decorate([
    Directive({
        selector: 'icon',
        inputs: [
            'name',
            'ios',
            'md',
            'isActive'
        ],
        host: {
            'role': 'img'
        }
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object, (typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c) || Object])
], Icon);
var _a, _b, _c;