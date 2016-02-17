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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var animation_1 = require('../../animations/animation');
var config_1 = require('../../config/config');
var icon_1 = require('../icon/icon');
var nav_params_1 = require('../nav/nav-params');
var view_controller_1 = require('../nav/view-controller');
/**
 * @name ActionSheet
 * @description
 * An Action Sheet is a dialog that lets the user choose from a set of
 * options. It appears on top of the app's content, and must be manually
 * dismissed by the user before they can resume interaction with the app.
 * Dangerous (destructive) options are made obvious. There are easy
 * ways to cancel out of the action sheet, such as tapping the backdrop or
 * hitting the escape key on desktop.
 *
 * An action sheet is created from an array of `buttons`, with each button
 * including properties for its `text`, and optionally a `style` and `handler`.
 * If a handler returns `false` then the action sheet will not be dismissed. An
 * action sheet can also optionally have a `title` and a `subTitle`.
 *
 * A button's `style` property can either be `destructive` or `cancel`. Buttons
 * without a style property will have a default style for its platform. Buttons
 * with the `cancel` style will always load as the bottom button, no matter where
 * it shows up in the array. All other buttons will show up in the order they
 * have been added to the `buttons` array. Note: We recommend that `destructive`
 * buttons show be the first button in the array, making it the button on top.
 *
 * Its shorthand is to add all the action sheet's options from within the
 * `ActionSheet.create(opts)` first argument. Otherwise the action sheet's
 * instance has methods to add options, such as `setTitle()` or `addButton()`.
 *
 * @usage
 * ```ts
 * constructor(nav: NavController) {
 *   this.nav = nav;
 * }
 *
 * presentActionSheet() {
 *   let actionSheet = ActionSheet.create({
 *     title: 'Modify your album',
 *     buttons: [
 *       {
 *         text: 'Destructive',
 *         style: 'destructive',
 *         handler: () => {
 *           console.log('Destructive clicked');
 *         }
 *       },
 *       {
 *         text: 'Archive',
 *         handler: () => {
 *           console.log('Archive clicked');
 *         }
 *       },
 *       {
 *         text: 'Cancel',
 *         style: 'cancel',
 *         handler: () => {
 *           console.log('Cancel clicked');
 *         }
 *       }
 *     ]
 *   });
 *
 *   this.nav.present(actionSheet);
 * }
 * ```
 *
 * @demo /docs/v2/demos/action-sheet/
 * @see {@link /docs/v2/components#action-sheets ActionSheet Component Docs}
 */
var ActionSheet = (function (_super) {
    __extends(ActionSheet, _super);
    function ActionSheet(opts) {
        if (opts === void 0) { opts = {}; }
        opts.buttons = opts.buttons || [];
        _super.call(this, ActionSheetCmp, opts);
        this.viewType = 'action-sheet';
    }
    /**
    * @private
    */
    ActionSheet.prototype.getTransitionName = function (direction) {
        var key = 'actionSheet' + (direction === 'back' ? 'Leave' : 'Enter');
        return this._nav && this._nav.config.get(key);
    };
    /**
     * @param {string} title Action sheet title
     */
    ActionSheet.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    /**
     * @param {string} subTitle Action sheet subtitle
     */
    ActionSheet.prototype.setSubTitle = function (subTitle) {
        this.data.subTitle = subTitle;
    };
    /**
     * @param {object} button Action sheet button
     */
    ActionSheet.prototype.addButton = function (button) {
        this.data.buttons.push(button);
    };
    /**
     * @param {object} opts Action sheet options
     */
    ActionSheet.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new ActionSheet(opts);
    };
    return ActionSheet;
})(view_controller_1.ViewController);
exports.ActionSheet = ActionSheet;
/**
* @private
*/
var ActionSheetCmp = (function () {
    function ActionSheetCmp(_viewCtrl, _config, elementRef, params, renderer) {
        this._viewCtrl = _viewCtrl;
        this._config = _config;
        this.d = params.data;
        if (this.d.cssClass) {
            renderer.setElementClass(elementRef.nativeElement, this.d.cssClass, true);
        }
    }
    ActionSheetCmp.prototype.click = function (button) {
        var _this = this;
        var shouldDismiss = true;
        if (button.handler) {
            // a handler has been provided, execute it
            if (button.handler() === false) {
                // if the return value of the handler is false then do not dismiss
                shouldDismiss = false;
            }
        }
        if (shouldDismiss) {
            setTimeout(function () {
                _this.dismiss();
            }, this._config.get('pageTransitionDelay'));
        }
    };
    ActionSheetCmp.prototype.dismiss = function () {
        return this._viewCtrl.dismiss(null);
    };
    ActionSheetCmp.prototype.onPageLoaded = function () {
        var _this = this;
        // normalize the data
        var buttons = [];
        this.d.buttons.forEach(function (button) {
            if (typeof button === 'string') {
                button = { text: button };
            }
            if (!button.cssClass) {
                button.cssClass = '';
            }
            if (button.style === 'cancel') {
                _this.d.cancelButton = button;
            }
            else {
                if (button.style === 'destructive') {
                    button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive';
                }
                buttons.push(button);
            }
        });
        this.d.buttons = buttons;
        var self = this;
        self.keyUp = function (ev) {
            if (ev.keyCode === 27) {
                void 0;
                self.dismiss();
            }
        };
        document.addEventListener('keyup', this.keyUp);
    };
    ActionSheetCmp.prototype.onPageDidLeave = function () {
        document.removeEventListener('keyup', this.keyUp);
    };
    ActionSheetCmp = __decorate([
        core_1.Component({
            selector: 'ion-action-sheet',
            template: '<div (click)="dismiss()" tappable disable-activated class="backdrop" role="presentation"></div>' +
                '<div class="action-sheet-wrapper">' +
                '<div class="action-sheet-container">' +
                '<div class="action-sheet-group">' +
                '<div class="action-sheet-title" *ngIf="d.title">{{d.title}}</div>' +
                '<div class="action-sheet-sub-title" *ngIf="d.subTitle">{{d.subTitle}}</div>' +
                '<button (click)="click(b)" *ngFor="#b of d.buttons" class="action-sheet-button disable-hover" [ngClass]="b.cssClass">' +
                '<ion-icon [name]="b.icon" *ngIf="b.icon" class="action-sheet-icon"></ion-icon> ' +
                '{{b.text}}' +
                '</button>' +
                '</div>' +
                '<div class="action-sheet-group" *ngIf="d.cancelButton">' +
                '<button (click)="click(d.cancelButton)" class="action-sheet-button action-sheet-cancel disable-hover" [ngClass]="d.cancelButton.cssClass">' +
                '<ion-icon [name]="d.cancelButton.icon" *ngIf="d.cancelButton.icon" class="action-sheet-icon"></ion-icon> ' +
                '{{d.cancelButton.text}}' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>',
            host: {
                'role': 'dialog'
            },
            directives: [common_1.NgFor, common_1.NgIf, icon_1.Icon]
        }), 
        __metadata('design:paramtypes', [view_controller_1.ViewController, config_1.Config, core_1.ElementRef, nav_params_1.NavParams, core_1.Renderer])
    ], ActionSheetCmp);
    return ActionSheetCmp;
})();
var ActionSheetSlideIn = (function (_super) {
    __extends(ActionSheetSlideIn, _super);
    function ActionSheetSlideIn(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.4);
        wrapper.fromTo('translateY', '100%', '0%');
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add([backdrop, wrapper]);
    }
    return ActionSheetSlideIn;
})(animation_1.Animation);
animation_1.Animation.register('action-sheet-slide-in', ActionSheetSlideIn);
var ActionSheetSlideOut = (function (_super) {
    __extends(ActionSheetSlideOut, _super);
    function ActionSheetSlideOut(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.4, 0);
        wrapper.fromTo('translateY', '0%', '100%');
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(300).add([backdrop, wrapper]);
    }
    return ActionSheetSlideOut;
})(animation_1.Animation);
animation_1.Animation.register('action-sheet-slide-out', ActionSheetSlideOut);
var ActionSheetMdSlideIn = (function (_super) {
    __extends(ActionSheetMdSlideIn, _super);
    function ActionSheetMdSlideIn(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.26);
        wrapper.fromTo('translateY', '100%', '0%');
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add([backdrop, wrapper]);
    }
    return ActionSheetMdSlideIn;
})(animation_1.Animation);
animation_1.Animation.register('action-sheet-md-slide-in', ActionSheetMdSlideIn);
var ActionSheetMdSlideOut = (function (_super) {
    __extends(ActionSheetMdSlideOut, _super);
    function ActionSheetMdSlideOut(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.26, 0);
        wrapper.fromTo('translateY', '0%', '100%');
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add([backdrop, wrapper]);
    }
    return ActionSheetMdSlideOut;
})(animation_1.Animation);
animation_1.Animation.register('action-sheet-md-slide-out', ActionSheetMdSlideOut);
