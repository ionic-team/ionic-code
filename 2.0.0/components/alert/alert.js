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
var util_1 = require('../../util/util');
var nav_params_1 = require('../nav/nav-params');
var view_controller_1 = require('../nav/view-controller');
/**
 * @name Alert
 * @description
 * An Alert is a dialog that presents users with either information, or used
 * to receive information from the user using inputs. An alert appears on top
 * of the app's content, and must be manually dismissed by the user before
 * they can resume interaction with the app.
 *
 * An alert is created from an array of `buttons` and optionally an array of
 * `inputs`. Each button includes properties for its `text`, and optionally a
 * `handler`. If a handler returns `false` then the alert will not be dismissed.
 * An alert can also optionally have a `title`, `subTitle` and `message`.
 *
 * All buttons will show up in the order they have been added to the `buttons`
 * array, from left to right. Note: The right most button (the last one in the
 * array) is the main button.
 *
 * Alerts can also include inputs whos data can be passed back to the app.
 * Inputs can be used to prompt users for information.
 *
 * Its shorthand is to add all the alert's options from within the
 * `Alert.create(opts)` first argument. Otherwise the alert's
 * instance has methods to add options, such as `setTitle()` or `addButton()`.
 *
 * @usage
 * ```ts
 * constructor(nav: NavController) {
 *   this.nav = nav;
 * }
 *
 * presentAlert() {
 *   let alert = Alert.create({
 *     title: 'Low battery',
 *     subTitle: '10% of battery remaining',
 *     buttons: ['Dismiss']
 *   });
 *   this.nav.present(alert);
 * }
 *
 * presentConfirm() {
 *   let alert = Alert.create({
 *     title: 'Confirm purchase',
 *     message: 'Do you want to buy this book?',
 *     buttons: [
 *       {
 *         text: 'Cancel',
 *         handler: () => {
 *           console.log('Cancel clicked');
 *         }
 *       },
 *       {
 *         text: 'Buy',
 *         handler: () => {
 *           console.log('Buy clicked');
 *         }
 *       }
 *     ]
 *   });
 *   this.nav.present(alert);
 * }
 *
 * presentPrompt() {
 *   let alert = Alert.create({
 *     title: 'Login',
 *     inputs: [
 *       {
 *         name: 'username',
 *         placeholder: 'Username'
 *       },
 *       {
 *         name: 'password',
 *         placeholder: 'Password',
 *         type: 'password'
 *       }
 *     ],
 *     buttons: [
 *       {
 *         text: 'Cancel',
 *         handler: data => {
 *           console.log('Cancel clicked');
 *         }
 *       },
 *       {
 *         text: 'Login',
 *         handler: data => {
 *           if (User.isValid(data.username, data.password)) {
 *             // logged in!
 *           } else {
 *             // invalid login
 *             return false;
 *           }
 *         }
 *       }
 *     ]
 *   });
 *   this.nav.present(alert);
 * }
 * ```
 *
 */
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert(opts) {
        if (opts === void 0) { opts = {}; }
        opts.inputs = opts.inputs || [];
        opts.buttons = opts.buttons || [];
        _super.call(this, AlertCmp, opts);
        this.viewType = 'alert';
    }
    /**
    * @private
    */
    Alert.prototype.getTransitionName = function (direction) {
        var key = (direction === 'back' ? 'alertLeave' : 'alertEnter');
        return this._nav && this._nav.config.get(key);
    };
    /**
     * @param {string} title Alert title
     */
    Alert.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    /**
     * @param {string} subTitle Alert subtitle
     */
    Alert.prototype.setSubTitle = function (subTitle) {
        this.data.subTitle = subTitle;
    };
    /**
     * @private
     */
    Alert.prototype.setBody = function (message) {
        // deprecated warning
        void 0;
        this.setMessage(message);
    };
    /**
     * @param {string} message  Alert message content
     */
    Alert.prototype.setMessage = function (message) {
        this.data.message = message;
    };
    /**
     * @param {object} input Alert input
     */
    Alert.prototype.addInput = function (input) {
        this.data.inputs.push(input);
    };
    /**
     * @param {object} button Alert button
     */
    Alert.prototype.addButton = function (button) {
        this.data.buttons.push(button);
    };
    /**
     * @param {string} cssClass CSS class name to add to the alert's outer wrapper
     */
    Alert.prototype.setCssClass = function (cssClass) {
        this.data.cssClass = cssClass;
    };
    /**
     * @param {Object} opts Alert options
     */
    Alert.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new Alert(opts);
    };
    return Alert;
})(view_controller_1.ViewController);
exports.Alert = Alert;
/**
* @private
*/
var AlertCmp = (function () {
    function AlertCmp(_viewCtrl, _elementRef, _config, params, renderer) {
        this._viewCtrl = _viewCtrl;
        this._elementRef = _elementRef;
        this._config = _config;
        this.d = params.data;
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(function (cssClass) {
                renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
        this.id = (++alertIds);
        this.descId = '';
        this.hdrId = 'alert-hdr-' + this.id;
        this.subHdrId = 'alert-subhdr-' + this.id;
        this.msgId = 'alert-msg-' + this.id;
        this.activeId = '';
        if (this.d.message) {
            this.descId = this.msgId;
        }
        else if (this.d.subTitle) {
            this.descId = this.subHdrId;
        }
    }
    AlertCmp.prototype.onPageLoaded = function () {
        var _this = this;
        // normalize the data
        var data = this.d;
        if (data.body) {
            // deprecated warning
            void 0;
            data.message = data.body;
        }
        data.buttons = data.buttons.map(function (button) {
            if (typeof button === 'string') {
                return { text: button };
            }
            return button;
        });
        data.inputs = data.inputs.map(function (input, index) {
            return {
                type: input.type || 'text',
                name: util_1.isDefined(input.name) ? input.name : index,
                placeholder: util_1.isDefined(input.placeholder) ? input.placeholder : '',
                value: util_1.isDefined(input.value) ? input.value : '',
                label: input.label,
                checked: !!input.checked,
                id: 'alert-input-' + _this.id + '-' + index
            };
        });
        this.inputType = (data.inputs.length ? data.inputs[0].type : null);
        var checkedInput = this.d.inputs.find(function (input) { return input.checked; });
        if (checkedInput) {
            this.activeId = checkedInput.id;
        }
        var self = this;
        self.keyUp = function (ev) {
            if (ev.keyCode === 13) {
                // enter
                void 0;
                var button = self.d.buttons[self.d.buttons.length - 1];
                self.btnClick(button);
            }
            else if (ev.keyCode === 27) {
                void 0;
                self.dismiss();
            }
        };
        document.addEventListener('keyup', this.keyUp);
    };
    AlertCmp.prototype.onPageDidEnter = function () {
        var activeElement = document.activeElement;
        if (activeElement) {
            activeElement.blur();
        }
        if (this.d.inputs.length) {
            var firstInput = this._elementRef.nativeElement.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }
    };
    AlertCmp.prototype.btnClick = function (button) {
        var _this = this;
        var shouldDismiss = true;
        if (button.handler) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            if (button.handler(this.getValues()) === false) {
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
    AlertCmp.prototype.rbClick = function (checkedInput) {
        this.d.inputs.forEach(function (input) {
            input.checked = (checkedInput === input);
        });
        this.activeId = checkedInput.id;
    };
    AlertCmp.prototype.cbClick = function (checkedInput) {
        checkedInput.checked = !checkedInput.checked;
    };
    AlertCmp.prototype.dismiss = function () {
        return this._viewCtrl.dismiss(this.getValues());
    };
    AlertCmp.prototype.getValues = function () {
        if (this.inputType === 'radio') {
            // this is an alert with radio buttons (single value select)
            // return the one value which is checked, otherwise undefined
            var checkedInput = this.d.inputs.find(function (i) { return i.checked; });
            return checkedInput ? checkedInput.value : undefined;
        }
        if (this.inputType === 'checkbox') {
            // this is an alert with checkboxes (multiple value select)
            // return an array of all the checked values
            return this.d.inputs.filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
        }
        // this is an alert with text inputs
        // return an object of all the values with the input name as the key
        var values = {};
        this.d.inputs.forEach(function (i) {
            values[i.name] = i.value;
        });
        return values;
    };
    AlertCmp.prototype.onPageDidLeave = function () {
        document.removeEventListener('keyup', this.keyUp);
    };
    AlertCmp = __decorate([
        core_1.Component({
            selector: 'ion-alert',
            template: '<div (click)="dismiss()" tappable disable-activated class="backdrop" role="presentation"></div>' +
                '<div class="alert-wrapper">' +
                '<div class="alert-head">' +
                '<h2 id="{{hdrId}}" class="alert-title" *ngIf="d.title" [innerHTML]="d.title"></h2>' +
                '<h3 id="{{subHdrId}}" class="alert-sub-title" *ngIf="d.subTitle" [innerHTML]="d.subTitle"></h3>' +
                '</div>' +
                '<div id="{{msgId}}" class="alert-message" *ngIf="d.message" [innerHTML]="d.message"></div>' +
                '<div *ngIf="d.inputs.length" [ngSwitch]="inputType">' +
                '<template ngSwitchWhen="radio">' +
                '<div class="alert-radio-group" role="radiogroup" [attr.aria-labelledby]="hdrId" [attr.aria-activedescendant]="activeId">' +
                '<div *ngFor="#i of d.inputs" (click)="rbClick(i)" [attr.aria-checked]="i.checked" [attr.id]="i.id" class="alert-tappable alert-radio" tappable role="radio">' +
                '<div class="alert-radio-icon"></div>' +
                '<div class="alert-radio-label">' +
                '{{i.label}}' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</template>' +
                '<template ngSwitchWhen="checkbox">' +
                '<div class="alert-checkbox-group">' +
                '<div *ngFor="#i of d.inputs" (click)="cbClick(i)" [attr.aria-checked]="i.checked" class="alert-tappable alert-checkbox" tappable role="checkbox">' +
                '<div class="alert-checkbox-icon"></div>' +
                '<div class="alert-checkbox-label">' +
                '{{i.label}}' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</template>' +
                '<template ngSwitchDefault>' +
                '<div class="alert-input-group">' +
                '<div *ngFor="#i of d.inputs" class="alert-input-wrapper">' +
                '<input [placeholder]="i.placeholder" [(ngModel)]="i.value" [type]="i.type" class="alert-input">' +
                '</div>' +
                '</div>' +
                '</template>' +
                '</div>' +
                '<div class="alert-button-group">' +
                '<button *ngFor="#b of d.buttons" (click)="btnClick(b)" [ngClass]="b.cssClass" class="alert-button">' +
                '{{b.text}}' +
                '</button>' +
                '</div>' +
                '</div>',
            host: {
                'role': 'dialog',
                '[attr.aria-labelledby]': 'hdrId',
                '[attr.aria-describedby]': 'descId'
            },
            directives: [common_1.NgClass, common_1.NgSwitch, common_1.NgIf, common_1.NgFor]
        }), 
        __metadata('design:paramtypes', [view_controller_1.ViewController, core_1.ElementRef, config_1.Config, nav_params_1.NavParams, core_1.Renderer])
    ], AlertCmp);
    return AlertCmp;
})();
/**
 * Animations for alerts
 */
var AlertPopIn = (function (_super) {
    __extends(AlertPopIn, _super);
    function AlertPopIn(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
        backdrop.fromTo('opacity', '0.01', '0.3');
        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop, wrapper);
    }
    return AlertPopIn;
})(animation_1.Animation);
animation_1.Animation.register('alert-pop-in', AlertPopIn);
var AlertPopOut = (function (_super) {
    __extends(AlertPopOut, _super);
    function AlertPopOut(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
        backdrop.fromTo('opacity', '0.3', '0');
        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop, wrapper);
    }
    return AlertPopOut;
})(animation_1.Animation);
animation_1.Animation.register('alert-pop-out', AlertPopOut);
var AlertMdPopIn = (function (_super) {
    __extends(AlertMdPopIn, _super);
    function AlertMdPopIn(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
        backdrop.fromTo('opacity', '0.01', '0.5');
        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop, wrapper);
    }
    return AlertMdPopIn;
})(animation_1.Animation);
animation_1.Animation.register('alert-md-pop-in', AlertMdPopIn);
var AlertMdPopOut = (function (_super) {
    __extends(AlertMdPopOut, _super);
    function AlertMdPopOut(enteringView, leavingView, opts) {
        _super.call(this, null, opts);
        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('.backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
        backdrop.fromTo('opacity', '0.5', '0');
        this
            .easing('ease-in-out')
            .duration(200)
            .add(backdrop, wrapper);
    }
    return AlertMdPopOut;
})(animation_1.Animation);
animation_1.Animation.register('alert-md-pop-out', AlertMdPopOut);
var alertIds = -1;
