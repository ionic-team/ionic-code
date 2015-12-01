System.register("ionic/components/modal/modal", ["angular2/angular2", "../overlay/overlay-controller", "../../config/config", "../../animations/animation", "ionic/util"], function (_export) {
    /**
     * The Modal is a content pane that can go over the user's current page.
     * Usually used for making a choice or editing an item. A modal can be opened
     * similar to how NavController#push works, where it is passed a Page component,
     * along with optional Page params, and options for presenting the modal.
     *
     * @usage
     * ```ts
     * class MyApp {
     *
     *  constructor(modal: Modal) {
     *    this.modal = modal;
     *  }
     *
     *  openContactModal() {
     *    this.modal.open(ContactUs);
     *  }
     *
     *  openProfileModal() {
     *    this.modal.open(Profile, { userId: 8675309 }, {
     *      enterAnimation: 'my-fade-in',
     *      leaveAnimation: 'my-fade-out',
     *      handle: 'profile-modal'
     *    });
     *  }
     *
     * }
     * ```
     */
    "use strict";

    var Injectable, OverlayController, Config, Animation, extend, __decorate, __metadata, Modal, OVERLAY_TYPE, ModalSlideIn, ModalSlideOut, ModalMDSlideIn, ModalMDSlideOut, _a, _b;

    var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Injectable = _angular2Angular2.Injectable;
        }, function (_overlayOverlayController) {
            OverlayController = _overlayOverlayController.OverlayController;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_animationsAnimation) {
            Animation = _animationsAnimation.Animation;
        }, function (_ionicUtil) {
            extend = _ionicUtil.extend;
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

            Modal = (function () {
                function Modal(ctrl, config) {
                    _classCallCheck(this, Modal);

                    this.ctrl = ctrl;
                    this.config = config;
                }

                /**
                 * Opens a new modal using the page component is was pass as the first
                 * argument. This is similar to how NavController's `push` method works.
                 * Currently you must have `<ion-overlay>` in the @App component's template
                 * for the modal to work correctly. (This is something that will
                 * be hopefully be removed in the near future.)
                 * @param pageComponent  The Page component to load in the modal.
                 * @param {Object} [params={}]  Optional data which can be passed to the page
                 * component, which can be read from the constructor's `NavParams`.
                 * @param {Object} [opts={}]  Additional options for this one modal instance of.
                 * Options include `enterAnimation` and `leaveAnimation`, which
                 * allows customization of which animation to use.
                 * @returns {Promise} Returns a promise which resolves when the modal has
                 * loaded and its entering animation has completed. The resolved promise's
                 * value is the instance of the newly created modal.
                 */

                _createClass(Modal, [{
                    key: "open",
                    value: function open(pageComponent) {
                        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                        opts = extend({
                            pageType: OVERLAY_TYPE,
                            enterAnimation: this.config.get('modalEnter'),
                            leaveAnimation: this.config.get('modalLeave')
                        }, opts);
                        return this.ctrl.open(pageComponent, params, opts);
                    }

                    /**
                     * Get the instance of a modal. This is usually helpful to getting ahold of a
                     * certain modal, from anywhere within the app, and closing it. By calling
                     * just `get()` without a `handle` argument, it'll return the active modal
                     * on top (it is possible to have multipe modals opened at the same time).
                     * If getting just the active modal isn't enough, when creating
                     * a modal, it's options can be given a `handle`, which is simply a string-based
                     * name for the modal instance. You can later get a reference to that modal's
                     * instance by calling this method with the same handle name.
                     * @param  [handle]  Optional string name given in the modal's options when it was opened.
                     * @returns Returns the instance of the modal if it is found, otherwise `null`.
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

                return Modal;
            })();

            _export("Modal", Modal);

            _export("Modal", Modal = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof OverlayController !== 'undefined' && OverlayController) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object])], Modal));
            OVERLAY_TYPE = 'modal';

            /**
             * Animations for modals
             */

            ModalSlideIn = (function (_Animation) {
                _inherits(ModalSlideIn, _Animation);

                function ModalSlideIn(enteringView, leavingView, opts) {
                    _classCallCheck(this, ModalSlideIn);

                    _get(Object.getPrototypeOf(ModalSlideIn.prototype), "constructor", this).call(this, enteringView.pageRef(), opts);
                    this.easing('cubic-bezier(0.36,0.66,0.04,1)').duration(400).fromTo('translateY', '100%', '0%').before.addClass('show-page');
                }

                return ModalSlideIn;
            })(Animation);

            Animation.register('modal-slide-in', ModalSlideIn);

            ModalSlideOut = (function (_Animation2) {
                _inherits(ModalSlideOut, _Animation2);

                function ModalSlideOut(enteringView, leavingView, opts) {
                    _classCallCheck(this, ModalSlideOut);

                    _get(Object.getPrototypeOf(ModalSlideOut.prototype), "constructor", this).call(this, leavingView.pageRef(), opts);
                    this.easing('ease-out').duration(250).fromTo('translateY', '0%', '100%');
                }

                return ModalSlideOut;
            })(Animation);

            Animation.register('modal-slide-out', ModalSlideOut);

            ModalMDSlideIn = (function (_Animation3) {
                _inherits(ModalMDSlideIn, _Animation3);

                function ModalMDSlideIn(enteringView, leavingView, opts) {
                    _classCallCheck(this, ModalMDSlideIn);

                    _get(Object.getPrototypeOf(ModalMDSlideIn.prototype), "constructor", this).call(this, enteringView.pageRef(), opts);
                    this.easing('cubic-bezier(0.36,0.66,0.04,1)').duration(280).fromTo('translateY', '40px', '0px').fadeIn().before.addClass('show-page');
                }

                return ModalMDSlideIn;
            })(Animation);

            Animation.register('modal-md-slide-in', ModalMDSlideIn);

            ModalMDSlideOut = (function (_Animation4) {
                _inherits(ModalMDSlideOut, _Animation4);

                function ModalMDSlideOut(enteringView, leavingView, opts) {
                    _classCallCheck(this, ModalMDSlideOut);

                    _get(Object.getPrototypeOf(ModalMDSlideOut.prototype), "constructor", this).call(this, leavingView.pageRef(), opts);
                    this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)').fromTo('translateY', '0px', '40px').fadeOut();
                }

                return ModalMDSlideOut;
            })(Animation);

            Animation.register('modal-md-slide-out', ModalMDSlideOut);
        }
    };
});