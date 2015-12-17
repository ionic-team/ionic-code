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
var core_1 = require('angular2/core');
var config_1 = require('../../config/config');
/**
 * @name Icon
 * @description
 * Icons can be used on their own, or inside of a number of Ionic components. For a full list of available icons,
 * check out the [Ionicons resource docs](../../../../resources/ionicons).
 *
 * @usage
 * ```html
 * <!-- use the appropriate home icon for ios and md -->
 * <icon home></icon>
 *
 * <!-- explicity set the icon for each platform -->
 * <icon ios="ion-ios-home" md="ion-md-home"></icon>
 * ```
 *
 * @property {boolean} [isActive] - Whether or not the icon is active. Icons that are not active will use an outlined version of the icon.
 * If there is not an outlined version for the particular icon, it will use the default (full) version.
 * @property {string} [ios] - Explicitly set the icon to use on iOS.
 * @property {string} [md] - Explicitly set the icon to use on Android.
 * @see {@link /docs/v2/components#icons Icon Component Docs}
 *
 */
var Icon = (function () {
    function Icon(elementRef, config, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.config = config;
        this.mode = config.get('iconMode');
    }
    /**
     * @private
     */
    Icon.prototype.ngOnInit = function () {
        var ele = this.elementRef.nativeElement;
        if (this.mode == 'ios' && this.ios) {
            this.name = this.ios;
        }
        else if (this.mode == 'md' && this.md) {
            this.name = this.md;
        }
        else if (!this.name) {
            // looping through native dom attributes, eww
            // https://github.com/angular/angular/issues/1818
            for (var i = 0, l = ele.attributes.length; i < l; i++) {
                if (ele.attributes[i].value === '' && /_|item-|isActive|large|small|class/.test(ele.attributes[i].name) !== true) {
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
    };
    Object.defineProperty(Icon.prototype, "isActive", {
        get: function () {
            return (this._isActive === undefined || this._isActive === true || this._isActive === 'true');
        },
        /**
         * @private
         */
        set: function (val) {
            this._isActive = val;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Icon.prototype.update = function () {
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
    };
    Icon = __decorate([
        core_1.Directive({
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
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object])
    ], Icon);
    return Icon;
    var _a, _b, _c;
})();
exports.Icon = Icon;