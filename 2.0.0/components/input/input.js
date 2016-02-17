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
var button_1 = require('../button/button');
var config_1 = require('../../config/config');
var content_1 = require('../content/content');
var form_1 = require('../../util/form');
var input_base_1 = require('./input-base');
var app_1 = require('../app/app');
var item_1 = require('../item/item');
var native_input_1 = require('./native-input');
var nav_controller_1 = require('../nav/nav-controller');
var platform_1 = require('../../platform/platform');
/**
 * @name Input
 * @description
 *
 * `ion-input` is meant for text type inputs only, such as `text`,
 * `password`, `email`, `number`, `search`, `tel`, and `url`. Ionic
 * still uses an actual `<input type="text">` HTML element within the
 * component, however, with Ionic wrapping the native HTML input
 * element it's able to better handle the user experience and
 * interactivity.
 *
 * Similarily, `<ion-textarea>` should be used in place of `<textarea>`.
 *
 * An `ion-input` is **not** used for non-text type inputs, such as a
 * `checkbox`, `radio`, `toggle`, `range`, `select`, etc.
 *
 * @property [inset] - The input will be inset
 * @property [clearInput] - A clear icon will appear in the input which clears it
 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Username</ion-label>
 *    <ion-input></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-labe fixed>Website</ion-label>
 *    <ion-input type="url"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label floating>Email</ion-label>
 *    <ion-input type="email"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label stacked>Phone</ion-label>
 *    <ion-input type="tel"></ion-input>
 *  </ion-item>
 *
 *  <ion-item clearInput>
 *    <ion-input placeholder="Username"></ion-input>
 *  </ion-item>
 * ```
 *
 */
var TextInput = (function (_super) {
    __extends(TextInput, _super);
    function TextInput(config, form, item, app, platform, elementRef, scrollView, nav, ngControl) {
        _super.call(this, config, form, item, app, platform, elementRef, scrollView, nav, ngControl);
    }
    TextInput = __decorate([
        core_1.Component({
            selector: 'ion-input',
            template: '<input [type]="type" [(ngModel)]="_value" [placeholder]="placeholder" class="text-input">' +
                '<input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist">' +
                '<button clear *ngIf="clearInput && value" class="text-input-clear-icon" (click)="clearTextInput()" (mousedown)="clearTextInput()"></button>' +
                '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" *ngIf="_useAssist"></div>',
            directives: [
                common_1.NgIf,
                native_input_1.NextInput,
                native_input_1.NativeInput,
                button_1.Button
            ]
        }),
        __param(6, core_1.Optional()),
        __param(7, core_1.Optional()),
        __param(8, core_1.Optional()), 
        __metadata('design:paramtypes', [config_1.Config, form_1.Form, item_1.Item, app_1.IonicApp, platform_1.Platform, core_1.ElementRef, content_1.Content, nav_controller_1.NavController, common_1.NgControl])
    ], TextInput);
    return TextInput;
})(input_base_1.InputBase);
exports.TextInput = TextInput;
/**
 * @name TextArea
 * @description
 *
 * `ion-textarea` is is used for multi-line text inputs. Ionic still
 * uses an actual `<textarea>` HTML element within the component,
 * however, with Ionic wrapping the native HTML textarea element then
 * Ionic is able to better handle the user experience and interactivity.
 *
 * Not that `<ion-textarea>` must load its value from the `value` or
 * `[(ngModel)]` attribute. Unlike the native `<textarea>` element,
 * `<ion-textarea>` does not support loading its value from the
 * textarea's inner content.
 *
 * When requiring only a single-line text input it's recommended
 * to use `<ion-input>` instead.
 *
 * @property [inset] - The textarea will be inset
 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Comments</ion-label>
 *    <ion-textarea></ion-textarea>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-labe stacked>Message</ion-label>
 *    <ion-textarea [(ngModel)]="msg"></ion-textarea>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-labe floating>Description</ion-label>
 *    <ion-textarea></ion-textarea>
 *  </ion-item>
 * ```
 *
 */
var TextArea = (function (_super) {
    __extends(TextArea, _super);
    function TextArea(config, form, item, app, platform, elementRef, scrollView, nav, ngControl) {
        _super.call(this, config, form, item, app, platform, elementRef, scrollView, nav, ngControl);
    }
    TextArea.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this._item) {
            this._item.setCssClass('item-textarea', true);
        }
    };
    TextArea = __decorate([
        core_1.Component({
            selector: 'ion-textarea',
            template: '<textarea [(ngModel)]="_value" [placeholder]="placeholder" class="text-input"></textarea>' +
                '<input type="text" aria-hidden="true" next-input *ngIf="_useAssist">' +
                '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" *ngIf="_useAssist"></div>',
            directives: [
                common_1.NgIf,
                native_input_1.NextInput,
                native_input_1.NativeInput
            ]
        }),
        __param(6, core_1.Optional()),
        __param(7, core_1.Optional()),
        __param(8, core_1.Optional()), 
        __metadata('design:paramtypes', [config_1.Config, form_1.Form, item_1.Item, app_1.IonicApp, platform_1.Platform, core_1.ElementRef, content_1.Content, nav_controller_1.NavController, common_1.NgControl])
    ], TextArea);
    return TextArea;
})(input_base_1.InputBase);
exports.TextArea = TextArea;
