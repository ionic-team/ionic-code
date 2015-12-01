System.register("ionic/components/action-sheet/action-sheet", ["angular2/angular2", "../overlay/overlay-controller", "../../config/config", "../icon/icon", "../../animations/animation", "../nav/nav-controller", "../../util/util"], function (_export) {
    "use strict";

    var Component, Injectable, Renderer, NgFor, NgIf, OverlayController, Config, Icon, Animation, NavParams, extend, __decorate, __metadata, ActionSheetCmp, ActionSheet, OVERLAY_TYPE, ActionSheetSlideIn, ActionSheetSlideOut, ActionSheetMdSlideIn, ActionSheetMdSlideOut, _a, _b, _c, _d;

    var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            Injectable = _angular2Angular2.Injectable;
            Renderer = _angular2Angular2.Renderer;
            NgFor = _angular2Angular2.NgFor;
            NgIf = _angular2Angular2.NgIf;
        }, function (_overlayOverlayController) {
            OverlayController = _overlayOverlayController.OverlayController;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_iconIcon) {
            Icon = _iconIcon.Icon;
        }, function (_animationsAnimation) {
            Animation = _animationsAnimation.Animation;
        }, function (_navNavController) {
            NavParams = _navNavController.NavParams;
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

            ActionSheetCmp = (function () {
                function ActionSheetCmp(params, renderer) {
                    _classCallCheck(this, ActionSheetCmp);

                    this.d = params.data;
                    if (this.d.cssClass) {
                        renderer.setElementClass(elementRef, this.d.cssClass, true);
                    }
                }

                _createClass(ActionSheetCmp, [{
                    key: "cancel",
                    value: function cancel() {
                        this.d.cancel && this.d.cancel();
                        return this.close();
                    }
                }, {
                    key: "destructive",
                    value: function destructive() {
                        if (this.d.destructiveButtonClicked()) {
                            return this.close();
                        }
                    }
                }, {
                    key: "buttonClicked",
                    value: function buttonClicked(index) {
                        if (this.d.buttonClicked(index)) {
                            return this.close();
                        }
                    }
                }]);

                return ActionSheetCmp;
            })();

            ActionSheetCmp = __decorate([Component({
                selector: 'ion-action-sheet',
                template: '<backdrop (click)="cancel()" tappable disable-activated></backdrop>' + '<action-sheet-wrapper>' + '<div class="action-sheet-container">' + '<div class="action-sheet-group action-sheet-options">' + '<div class="action-sheet-title" *ng-if="d.titleText">{{d.titleText}}</div>' + '<button (click)="buttonClicked(i)" *ng-for="#b of d.buttons; #i=index" class="action-sheet-option disable-hover">' + '<icon [name]="b.icon" *ng-if="b.icon"></icon> ' + '{{b.text}}' + '</button>' + '<button *ng-if="d.destructiveText" (click)="destructive()" class="action-sheet-destructive disable-hover">' + '<icon [name]="d.destructiveIcon" *ng-if="d.destructiveIcon"></icon> ' + '{{d.destructiveText}}</button>' + '</div>' + '<div class="action-sheet-group action-sheet-cancel" *ng-if="d.cancelText">' + '<button (click)="cancel()" class="disable-hover">' + '<icon [name]="d.cancelIcon" *ng-if="d.cancelIcon"></icon> ' + '{{d.cancelText}}</button>' + '</div>' + '</div>' + '</action-sheet-wrapper>',
                host: {
                    'role': 'dialog'
                },
                directives: [NgFor, NgIf, Icon]
            }), __metadata('design:paramtypes', [typeof (_a = typeof NavParams !== 'undefined' && NavParams) === 'function' && _a || Object, typeof (_b = typeof Renderer !== 'undefined' && Renderer) === 'function' && _b || Object])], ActionSheetCmp);
            /**
             * @name ActionSheet
             * @description
             * The Action Sheet is a slide-up pane that lets the user choose from a set of options. Dangerous options are made obvious.
             * There are easy ways to cancel out of the action sheet, such as tapping the backdrop or even hitting escape on the keyboard for desktop testing.
             *
             * @usage
             * ```ts
             * openMenu() {
             *
             *   this.actionSheet.open({
             *     buttons: [
             *       { text: 'Share This' },
             *       { text: 'Move' }
             *     ],
             *     destructiveText: 'Delete',
             *     titleText: 'Modify your album',
             *     cancelText: 'Cancel',
             *     cancel: function() {
             *       console.log('Canceled');
             *     },
             *     destructiveButtonClicked: () => {
             *       console.log('Destructive clicked');
             *     },
             *     buttonClicked: function(index) {
             *       console.log('Button clicked', index);
             *       if(index == 1) { return false; }
             *       return true;
             *     }
             *
             *   }).then(actionSheetRef => {
             *     this.actionSheetRef = actionSheetRef;
             *   });
             *
             * }
             * ```
             */

            ActionSheet = (function () {
                function ActionSheet(ctrl, config) {
                    _classCallCheck(this, ActionSheet);

                    this.ctrl = ctrl;
                    this.config = config;
                }

                /**
                 * Create and open a new Action Sheet. This is the
                 * public API, and most often you will only use ActionSheet.open()
                 *
                 * @param {Object} [opts={}]  An object containing optional settings.
                 * @param {String} [opts.pageType='action-sheet'] The page type that determines how the page renders and animates.
                 * @param {String} [opts.enterAnimation='action-sheet-slide-in'] The class used to animate an actionSheet that is entering.
                 * @param {String} [opts.leaveAnimation='action-sheet-slide-out'] The class used to animate an actionSheet that is leaving.
                 * @return {Promise} Promise that resolves when the action sheet is open.
                 */

                _createClass(ActionSheet, [{
                    key: "open",
                    value: function open() {
                        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                        opts = extend({
                            pageType: OVERLAY_TYPE,
                            enterAnimation: this.config.get('actionSheetEnter'),
                            leaveAnimation: this.config.get('actionSheetLeave'),
                            cancelIcon: this.config.get('actionSheetCancelIcon'),
                            destructiveIcon: this.config.get('actionSheetDestructiveIcon')
                        }, opts);
                        return this.ctrl.open(ActionSheetCmp, opts, opts);
                    }

                    /**
                     * Retrieves an actionSheet instance.
                     *
                     * @param {String} [handle]  The handle used to open the instance to be retrieved.
                     * @returns {ActionSheet} An actionSheet instance.
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

                return ActionSheet;
            })();

            _export("ActionSheet", ActionSheet);

            _export("ActionSheet", ActionSheet = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_c = typeof OverlayController !== 'undefined' && OverlayController) === 'function' && _c || Object, typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d || Object])], ActionSheet));
            OVERLAY_TYPE = 'action-sheet';

            ActionSheetSlideIn = (function (_Animation) {
                _inherits(ActionSheetSlideIn, _Animation);

                function ActionSheetSlideIn(enteringView, leavingView, opts) {
                    _classCallCheck(this, ActionSheetSlideIn);

                    _get(Object.getPrototypeOf(ActionSheetSlideIn.prototype), "constructor", this).call(this, null, opts);
                    var ele = enteringView.pageRef().nativeElement;
                    var backdrop = new Animation(ele.querySelector('backdrop'));
                    var wrapper = new Animation(ele.querySelector('action-sheet-wrapper'));
                    backdrop.fromTo('opacity', 0.01, 0.4);
                    wrapper.fromTo('translateY', '100%', '0%');
                    this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add([backdrop, wrapper]);
                }

                return ActionSheetSlideIn;
            })(Animation);

            Animation.register('action-sheet-slide-in', ActionSheetSlideIn);

            ActionSheetSlideOut = (function (_Animation2) {
                _inherits(ActionSheetSlideOut, _Animation2);

                function ActionSheetSlideOut(enteringView, leavingView, opts) {
                    _classCallCheck(this, ActionSheetSlideOut);

                    _get(Object.getPrototypeOf(ActionSheetSlideOut.prototype), "constructor", this).call(this, null, opts);
                    var ele = leavingView.pageRef().nativeElement;
                    var backdrop = new Animation(ele.querySelector('backdrop'));
                    var wrapper = new Animation(ele.querySelector('action-sheet-wrapper'));
                    backdrop.fromTo('opacity', 0.4, 0);
                    wrapper.fromTo('translateY', '0%', '100%');
                    this.easing('cubic-bezier(.36,.66,.04,1)').duration(300).add([backdrop, wrapper]);
                }

                return ActionSheetSlideOut;
            })(Animation);

            Animation.register('action-sheet-slide-out', ActionSheetSlideOut);

            ActionSheetMdSlideIn = (function (_Animation3) {
                _inherits(ActionSheetMdSlideIn, _Animation3);

                function ActionSheetMdSlideIn(enteringView, leavingView, opts) {
                    _classCallCheck(this, ActionSheetMdSlideIn);

                    _get(Object.getPrototypeOf(ActionSheetMdSlideIn.prototype), "constructor", this).call(this, null, opts);
                    var ele = enteringView.pageRef().nativeElement;
                    var backdrop = new Animation(ele.querySelector('backdrop'));
                    var wrapper = new Animation(ele.querySelector('action-sheet-wrapper'));
                    backdrop.fromTo('opacity', 0.01, 0.26);
                    wrapper.fromTo('translateY', '100%', '0%');
                    this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add([backdrop, wrapper]);
                }

                return ActionSheetMdSlideIn;
            })(Animation);

            Animation.register('action-sheet-md-slide-in', ActionSheetMdSlideIn);

            ActionSheetMdSlideOut = (function (_Animation4) {
                _inherits(ActionSheetMdSlideOut, _Animation4);

                function ActionSheetMdSlideOut(enteringView, leavingView, opts) {
                    _classCallCheck(this, ActionSheetMdSlideOut);

                    _get(Object.getPrototypeOf(ActionSheetMdSlideOut.prototype), "constructor", this).call(this, null, opts);
                    var ele = leavingView.pageRef().nativeElement;
                    var backdrop = new Animation(ele.querySelector('backdrop'));
                    var wrapper = new Animation(ele.querySelector('action-sheet-wrapper'));
                    backdrop.fromTo('opacity', 0.26, 0);
                    wrapper.fromTo('translateY', '0%', '100%');
                    this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add([backdrop, wrapper]);
                }

                return ActionSheetMdSlideOut;
            })(Animation);

            Animation.register('action-sheet-md-slide-out', ActionSheetMdSlideOut);
        }
    };
});