System.register("ionic/components/popup/popup", ["angular2/angular2", "../overlay/overlay-controller", "../../config/config", "../../animations/animation", "../nav/nav-controller", "../button/button", "../../util/util"], function (_export) {
    /**
     * The Ionic Popup service allows the creation of popup windows that require the user to respond in order to continue.
     *
     * The popup service has support for more flexible versions of the built in `alert()`, `prompt()`, and `confirm()` functions that users are used to, in addition to allowing popups with completely custom content and look.
     *
     * @usage
     * ```ts
     * class myApp {
     *
     *   constructor(popup: Popup) {
     *     this.popup = popup;
     *   }
     *
     *   doAlert() {
     *     this.popup.alert({
     *       title: "New Friend!",
     *       template: "Your friend, Obi wan Kenobi, just accepted your friend request!",
     *       cssClass: 'my-alert'
     *     }).then(() => {
     *       console.log('Alert closed');
     *     });
     *   }
     *
     *   doPrompt() {
     *     this.popup.prompt({
     *       title: "New Album",
     *       template: "Enter a name for this new album you're so keen on adding",
     *       inputPlaceholder: "Title",
     *       okText: "Save",
     *       okType: "secondary"
     *     }).then((name) => {
     *       console.log('Name entered:', name);
     *     }, () => {
     *       console.error('Prompt closed');
     *     });
     *   }
     *
     *   doConfirm() {
     *     this.popup.confirm({
     *       title: "Use this lightsaber?",
     *       subTitle: "You can't exchange lightsabers",
     *       template: "Do you agree to use this lightsaber to do good across the intergalactic galaxy?",
     *       cancelText: "Disagree",
     *       okText: "Agree"
     *     }).then((result, ev) => {
     *       console.log('Confirmed!', result);
     *     }, () => {
     *       console.error('Not confirmed!');
     *     });
     *   }
     * }
     * ```
     */
    "use strict";

    var FORM_DIRECTIVES, Component, ElementRef, Injectable, NgClass, NgIf, NgFor, Renderer, OverlayController, Config, Animation, NavParams, Button, extend, __decorate, __metadata, Popup, OVERLAY_TYPE, PopupCmp, PopupPopIn, PopupPopOut, PopupMdPopIn, PopupMdPopOut, _a, _b, _c, _d, _e;

    var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            FORM_DIRECTIVES = _angular2Angular2.FORM_DIRECTIVES;
            Component = _angular2Angular2.Component;
            ElementRef = _angular2Angular2.ElementRef;
            Injectable = _angular2Angular2.Injectable;
            NgClass = _angular2Angular2.NgClass;
            NgIf = _angular2Angular2.NgIf;
            NgFor = _angular2Angular2.NgFor;
            Renderer = _angular2Angular2.Renderer;
        }, function (_overlayOverlayController) {
            OverlayController = _overlayOverlayController.OverlayController;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_animationsAnimation) {
            Animation = _animationsAnimation.Animation;
        }, function (_navNavController) {
            NavParams = _navNavController.NavParams;
        }, function (_buttonButton) {
            Button = _buttonButton.Button;
        }, function (_utilUtil) {
            extend = _utilUtil.extend;
        }],
        execute: function () {
            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
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

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            Popup = (function () {
                function Popup(ctrl, config) {
                    _classCallCheck(this, Popup);

                    this.ctrl = ctrl;
                    this.config = config;
                }

                /**
                 * TODO
                 * @param {TODO} opts  TODO
                 * @returns {object} A promise
                 */

                _createClass(Popup, [{
                    key: "open",
                    value: function open(opts) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            opts.promiseResolve = resolve;
                            opts.promiseReject = reject;
                            opts = extend({
                                pageType: OVERLAY_TYPE,
                                enterAnimation: _this.config.get('popupEnter'),
                                leaveAnimation: _this.config.get('popupLeave')
                            }, opts);
                            return _this.ctrl.open(PopupCmp, opts, opts);
                        });
                    }

                    /**
                     * Show a simple alert popup with a message and one button
                     * that the user can tap to close the popup.
                     *
                     * @param {object} opts The options for showing the alert, of the form:
                     *
                     * ```
                     * {
                     *   title: '', // String. The title of the popup.
                     *   cssClass: '', // String (optional). The custom CSS class name.
                     *   subTitle: '', // String (optional). The sub-title of the popup.
                     *   template: '', // String (optional). The html template to place in the popup body.
                     *   templateUrl: '', // String (optional). The URL of an html template to place in the popup body.
                     *   okText: '', // String (default: 'OK'). The text of the OK button.
                     *   okType: '', // String (default: ''). The type of the OK button.
                     * }
                     * ```
                     *
                     * @returns {object} A promise which is resolved when the popup is closed.
                     */
                }, {
                    key: "alert",
                    value: function alert() {
                        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                        if (typeof opts === 'string') {
                            opts = {
                                title: opts
                            };
                        }
                        var button = {
                            text: opts.okText || 'OK',
                            type: opts.okType || '',
                            onTap: function onTap(event, popupRef) {
                                // Allow it to close
                                //resolve();
                            }
                        };
                        opts = extend({
                            showPrompt: false,
                            cancel: function cancel() {
                                //reject();
                            },
                            buttons: [button]
                        }, opts);
                        return this.open(opts);
                    }

                    /**
                     * Show a simple confirm popup with a message, Cancel and OK button.
                     *
                     * Resolves the promise with true if the user presses the OK button, and false if the user presses the Cancel button.
                     *
                     * @param {object} opts The options for showing the confirm, of the form:
                     *
                     * ```
                     * {
                     *   title: '', // String. The title of the popup.
                     *   cssClass: '', // String (optional). The custom CSS class name.
                     *   subTitle: '', // String (optional). The sub-title of the popup.
                     *   template: '', // String (optional). The html template to place in the popup body.
                     *   templateUrl: '', // String (optional). The URL of an html template to place in the popup body.
                     *   cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
                     *   cancelType: '', // String (default: ''). The type of the Cancel button.
                     *   okText: '', // String (default: 'OK'). The text of the OK button.
                     *   okType: '', // String (default: ''). The type of the OK button.
                     * }
                     * ```
                     *
                     * @returns {object} A promise which is resolved when the popup is closed.
                     */
                }, {
                    key: "confirm",
                    value: function confirm() {
                        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                        if (typeof opts === 'string') {
                            opts = {
                                title: opts
                            };
                        }
                        var okButton = {
                            text: opts.okText || 'OK',
                            type: opts.okType || '',
                            onTap: function onTap(event, popupRef) {
                                // Allow it to close
                            }
                        };
                        var cancelButton = {
                            text: opts.cancelText || 'Cancel',
                            type: opts.cancelType || '',
                            isCancel: true,
                            onTap: function onTap(event, popupRef) {
                                // Allow it to close
                            }
                        };
                        opts = extend({
                            showPrompt: false,
                            cancel: function cancel() {},
                            buttons: [cancelButton, okButton]
                        }, opts);
                        return this.open(opts);
                    }

                    /**
                     * Show a simple prompt popup with a message, input, Cancel and OK button.
                     *
                     * Resolves the promise with the value of the input if the user presses OK, and with undefined if the user presses Cancel.
                     *
                     * @param {object} opts The options for showing the prompt, of the form:
                     *
                     * ```
                     * {
                     *   title: '', // String. The title of the popup.
                     *   cssClass: '', // String (optional). The custom CSS class name.
                     *   subTitle: '', // String (optional). The sub-title of the popup.
                     *   template: '', // String (optional). The html template to place in the popup body.
                     *   templateUrl: '', // String (optional). The URL of an html template to place in the popup body.
                     *   inputType: // String (default: 'text'). The type of input to use.
                     *   inputPlaceholder: // String (default: ''). A placeholder to use for the input.
                     *   cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
                     *   cancelType: '', // String (default: ''). The type of the Cancel button.
                     *   okText: '', // String (default: 'OK'). The text of the OK button.
                     *   okType: '', // String (default: ''). The type of the OK button.
                     * }
                     * ```
                     *
                     * @returns {object} A promise which is resolved when the popup is closed.
                     */
                }, {
                    key: "prompt",
                    value: function prompt() {
                        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                        if (typeof opts === 'string') {
                            opts = {
                                title: opts
                            };
                        }
                        var okButton = {
                            text: opts.okText || 'OK',
                            type: opts.okType || '',
                            onTap: function onTap(event, popupRef) {
                                // Allow it to close
                            }
                        };
                        var cancelButton = {
                            text: opts.cancelText || 'Cancel',
                            type: opts.cancelType || '',
                            isCancel: true,
                            onTap: function onTap(event, popupRef) {
                                // Allow it to close
                            }
                        };
                        opts = extend({
                            showPrompt: true,
                            promptPlaceholder: '',
                            cancel: function cancel() {},
                            buttons: [cancelButton, okButton]
                        }, opts);
                        return this.open(opts);
                    }

                    /**
                     * TODO
                     * @param {TODO} handle  TODO
                     * @returns {TODO} TODO
                     */
                }, {
                    key: "get",
                    value: function get(handle) {
                        if (handle) {
                            return this.ctrl.getByHandle(handle);
                        }
                        return this.ctrl.getByType(OVERLAY_TYPE);
                    }
                }]);

                return Popup;
            })();

            _export("Popup", Popup);

            _export("Popup", Popup = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof OverlayController !== 'undefined' && OverlayController) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object])], Popup));
            OVERLAY_TYPE = 'popup';

            // TODO add button type to button: [type]="button.type"

            PopupCmp = (function () {
                function PopupCmp(elementRef, params, renderer) {
                    _classCallCheck(this, PopupCmp);

                    this.elementRef = elementRef;
                    this.d = params.data;
                    if (this.d.cssClass) {
                        renderer.setElementClass(elementRef, this.d.cssClass, true);
                    }
                }

                _createClass(PopupCmp, [{
                    key: "onInit",
                    value: function onInit() {
                        var _this2 = this;

                        setTimeout(function () {
                            // TODO: make more better, no DOM BS
                            _this2.promptInput = _this2.elementRef.nativeElement.querySelector('input');
                            if (_this2.promptInput) {
                                _this2.promptInput.value = '';
                            }
                        });
                    }
                }, {
                    key: "buttonTapped",
                    value: function buttonTapped(button, ev) {
                        var promptValue = this.promptInput && this.promptInput.value;
                        var retVal = button.onTap && button.onTap(ev, this, {
                            promptValue: promptValue
                        });
                        // If the event.preventDefault() wasn't called, close
                        if (!ev.defaultPrevented) {
                            // If this is a cancel button, reject the promise
                            if (button.isCancel) {
                                this.d.promiseReject();
                            } else {
                                // Resolve with the prompt value
                                this.d.promiseResolve(promptValue);
                            }
                            return this.close();
                        }
                    }
                }, {
                    key: "cancel",
                    value: function cancel(ev) {
                        this.d.cancel && this.d.cancel(event);
                        if (!ev.defaultPrevented) {
                            this.d.promiseReject();
                            return this.close();
                        }
                    }
                }]);

                return PopupCmp;
            })();

            PopupCmp = __decorate([Component({
                selector: 'ion-popup',
                template: '<backdrop (click)="cancel($event)" tappable disable-activated></backdrop>' + '<popup-wrapper>' + '<div class="popup-head">' + '<h2 class="popup-title" [inner-html]="d.title" *ng-if="d.title"></h2>' + '<h3 class="popup-sub-title" [inner-html]="d.subTitle" *ng-if="d.subTitle"></h3>' + '</div>' + '<div class="popup-body">' + '<div [inner-html]="d.template" *ng-if="d.template"></div>' + '<input type="{{d.inputType || \'text\'}}" placeholder="{{d.inputPlaceholder}}" *ng-if="d.showPrompt" class="prompt-input">' + '</div>' + '<div class="popup-buttons" *ng-if="d.buttons.length">' + '<button *ng-for="#btn of d.buttons" (click)="buttonTapped(btn, $event)" [inner-html]="btn.text"></button>' + '</div>' + '</popup-wrapper>',
                host: {
                    'role': 'dialog'
                },
                directives: [FORM_DIRECTIVES, NgClass, NgIf, NgFor, Button]
            }), __metadata('design:paramtypes', [typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof NavParams !== 'undefined' && NavParams) === 'function' && _d || Object, typeof (_e = typeof Renderer !== 'undefined' && Renderer) === 'function' && _e || Object])], PopupCmp);
            /**
             * Animations for popups
             */

            PopupPopIn = (function (_Animation) {
                _inherits(PopupPopIn, _Animation);

                function PopupPopIn(enteringView, leavingView, opts) {
                    _classCallCheck(this, PopupPopIn);

                    _get(Object.getPrototypeOf(PopupPopIn.prototype), "constructor", this).call(this, null, opts);
                    var ele = enteringView.pageRef().nativeElement;
                    var backdrop = new Animation(ele.querySelector('backdrop'));
                    var wrapper = new Animation(ele.querySelector('popup-wrapper'));
                    wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
                    backdrop.fromTo('opacity', '0.01', '0.3');
                    this.easing('ease-in-out').duration(200).add(backdrop, wrapper);
                }

                return PopupPopIn;
            })(Animation);

            Animation.register('popup-pop-in', PopupPopIn);

            PopupPopOut = (function (_Animation2) {
                _inherits(PopupPopOut, _Animation2);

                function PopupPopOut(enteringView, leavingView, opts) {
                    _classCallCheck(this, PopupPopOut);

                    _get(Object.getPrototypeOf(PopupPopOut.prototype), "constructor", this).call(this, null, opts);
                    var ele = leavingView.pageRef().nativeElement;
                    var backdrop = new Animation(ele.querySelector('backdrop'));
                    var wrapper = new Animation(ele.querySelector('popup-wrapper'));
                    wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
                    backdrop.fromTo('opacity', '0.3', '0');
                    this.easing('ease-in-out').duration(200).add(backdrop, wrapper);
                }

                return PopupPopOut;
            })(Animation);

            Animation.register('popup-pop-out', PopupPopOut);

            PopupMdPopIn = (function (_Animation3) {
                _inherits(PopupMdPopIn, _Animation3);

                function PopupMdPopIn(enteringView, leavingView, opts) {
                    _classCallCheck(this, PopupMdPopIn);

                    _get(Object.getPrototypeOf(PopupMdPopIn.prototype), "constructor", this).call(this, null, opts);
                    var ele = enteringView.pageRef().nativeElement;
                    var backdrop = new Animation(ele.querySelector('backdrop'));
                    var wrapper = new Animation(ele.querySelector('popup-wrapper'));
                    wrapper.fromTo('opacity', '0.01', '1').fromTo('scale', '1.1', '1');
                    backdrop.fromTo('opacity', '0.01', '0.5');
                    this.easing('ease-in-out').duration(200).add(backdrop, wrapper);
                }

                return PopupMdPopIn;
            })(Animation);

            Animation.register('popup-md-pop-in', PopupMdPopIn);

            PopupMdPopOut = (function (_Animation4) {
                _inherits(PopupMdPopOut, _Animation4);

                function PopupMdPopOut(enteringView, leavingView, opts) {
                    _classCallCheck(this, PopupMdPopOut);

                    _get(Object.getPrototypeOf(PopupMdPopOut.prototype), "constructor", this).call(this, null, opts);
                    var ele = leavingView.pageRef().nativeElement;
                    var backdrop = new Animation(ele.querySelector('backdrop'));
                    var wrapper = new Animation(ele.querySelector('popup-wrapper'));
                    wrapper.fromTo('opacity', '1', '0').fromTo('scale', '1', '0.9');
                    backdrop.fromTo('opacity', '0.5', '0');
                    this.easing('ease-in-out').duration(200).add(backdrop, wrapper);
                }

                return PopupMdPopOut;
            })(Animation);

            Animation.register('popup-md-pop-out', PopupMdPopOut);
        }
    };
});