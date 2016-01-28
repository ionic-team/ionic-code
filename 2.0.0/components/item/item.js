var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var button_1 = require('../button/button');
var form_1 = require('../../util/form');
var icon_1 = require('../icon/icon');
var label_1 = require('../label/label');
/**
 * @name Item
 * @description
 * Creates a list-item that can easily be swiped, deleted, reordered, edited, and more.
 *
 * There are three common ways to use an item:
 * - Use `<ion-item>` for something that is only non-clickable text.
 * - Use `<button ion-item>` for something that can be clicked/tapped. Typically this element will also have a `(click)` handler.
 * - Use `<a ion-item>` for when the item needs to contain a `href`.
 *
 * By default, `<button ion-item>` and `<a ion-item>` will receive a right arrow icon on iOS to signal that tapping the item will reveal more information.
 * To hide this icon, add the `detail-none` attribute to the item (eg: `<button ion-item detail-none>`). To add the icon when it is not displayed by default,
 * add the `detail-push` attribute (eg: `<ion-item detail-push>`).
 *
 *
 * @usage
 * ```html
 *
 * <ion-list>
 *
 *   // default item
 *   <ion-item>
 *     {{item.title}}
 *   </ion-item>
 *
 * </ion-list>
 *
 *  ```
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../../list/List List API Docs}
 */
var Item = (function () {
    function Item(form, _renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._ids = -1;
        this._inputs = [];
        this._viewLabel = true;
        this.labelId = null;
        this.id = form.nextId().toString();
    }
    /**
     * @private
     */
    Item.prototype.registerInput = function (type) {
        this._inputs.push(type);
        return this.id + '-' + (++this._ids);
    };
    /**
     * @private
     */
    Item.prototype.ngAfterContentInit = function () {
        if (this._viewLabel && this._inputs.length) {
            var labelText = this.getLabelText().trim();
            this._viewLabel = (labelText.length > 0);
        }
        if (this._inputs.length > 1) {
            this.setCssClass('item-multiple-inputs', true);
        }
    };
    /**
     * @private
     */
    Item.prototype.setCssClass = function (cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    };
    /**
     * @private
     */
    Item.prototype.getLabelText = function () {
        return this._label ? this._label.text : '';
    };
    Object.defineProperty(Item.prototype, "contentLabel", {
        set: function (label) {
            if (label) {
                this._label = label;
                this.labelId = label.id = ('lbl-' + this.id);
                if (label.type) {
                    this.setCssClass('item-label-' + label.type, true);
                }
                this._viewLabel = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "viewLabel", {
        set: function (label) {
            if (!this._label) {
                this._label = label;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "_buttons", {
        /**
         * @private
         */
        set: function (buttons) {
            buttons.toArray().forEach(function (button) {
                if (!button.isItem) {
                    button.addClass('item-button');
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "_icons", {
        /**
         * @private
         */
        set: function (icons) {
            icons.toArray().forEach(function (icon) {
                icon.addClass('item-icon');
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ContentChild(label_1.Label), 
        __metadata('design:type', label_1.Label), 
        __metadata('design:paramtypes', [label_1.Label])
    ], Item.prototype, "contentLabel", null);
    __decorate([
        core_1.ViewChild(label_1.Label), 
        __metadata('design:type', label_1.Label), 
        __metadata('design:paramtypes', [label_1.Label])
    ], Item.prototype, "viewLabel", null);
    __decorate([
        core_1.ContentChildren(button_1.Button), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Item.prototype, "_buttons", null);
    __decorate([
        core_1.ContentChildren(icon_1.Icon), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], Item.prototype, "_icons", null);
    Item = __decorate([
        core_1.Component({
            selector: 'ion-item,[ion-item]',
            template: '<ng-content select="[item-left],ion-checkbox"></ng-content>' +
                '<div class="item-inner">' +
                '<ng-content select="ion-label"></ng-content>' +
                '<ion-label *ngIf="_viewLabel">' +
                '<ng-content></ng-content>' +
                '</ion-label>' +
                '<ng-content select="[item-right],ion-radio,ion-toggle,ion-select,ion-input,ion-textarea"></ng-content>' +
                '</div>',
            host: {
                'class': 'item'
            },
            directives: [common_1.NgIf, label_1.Label]
        }), 
        __metadata('design:paramtypes', [form_1.Form, core_1.Renderer, core_1.ElementRef])
    ], Item);
    return Item;
})();
exports.Item = Item;
