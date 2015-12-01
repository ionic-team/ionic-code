System.register("ionic/components/menu/menu", ["angular2/angular2", "../ion", "../app/app", "../../config/config", "../../platform/platform", "../../util/keyboard", "./menu-gestures"], function (_export) {
    /**
     * _For basic Menu usage, see the [Menu section](../../../../components/#menus)
     * of the Component docs._
     *
     * Menu is a side-menu navigation that can be dragged out or toggled to show.
     *
     * In order to use Menu, you must specify a [reference](https://angular.io/docs/ts/latest/guide/user-input.html#local-variables)
     * to the content element that Menu should listen on for drag events, using the
     * `content` property:
     * ```html
     * <ion-menu [content]="contentRef">
     *   <ion-content>
     *     <ion-list>
     *     ...
     *     </ion-list>
     *   </ion-content>
     * </ion-menu>
     *
     * <ion-nav #content-ref [root]="rootPage"></ion-nav>
     * ```
     *
     * By default, Menus are on the left, but this can be overriden with the `side`
     * property:
     * ```html
     * <ion-menu [content]="contentRef" side="right"></ion-menu>
     * ```
     *
     * Menu supports two display styles: overlay, and reveal. Overlay
     * is the traditional Android drawer style, and Reveal is the traditional iOS
     * style. By default, Menu will adjust to the correct style for the platform,
     * but this can be overriden using the `type` property:
     * ```html
     * <ion-menu [content]="contentRef" type="overlay"></ion-menu>
     * ```
     */
    "use strict";

    var Component, forwardRef, Directive, Host, EventEmitter, ElementRef, Ion, IonicApp, Config, Platform, Keyboard, gestures, __decorate, __metadata, __param, Menu, menuTypes, MenuBackdrop, _a, _b, _c, _d, _e, _f;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            forwardRef = _angular2Angular2.forwardRef;
            Directive = _angular2Angular2.Directive;
            Host = _angular2Angular2.Host;
            EventEmitter = _angular2Angular2.EventEmitter;
            ElementRef = _angular2Angular2.ElementRef;
        }, function (_ion) {
            Ion = _ion.Ion;
        }, function (_appApp) {
            IonicApp = _appApp.IonicApp;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_platformPlatform) {
            Platform = _platformPlatform.Platform;
        }, function (_utilKeyboard) {
            Keyboard = _utilKeyboard.Keyboard;
        }, function (_menuGestures) {
            gestures = _menuGestures;
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

            __param = undefined && undefined.__param || function (paramIndex, decorator) {
                return function (target, key) {
                    decorator(target, key, paramIndex);
                };
            };

            Menu = (function (_Ion) {
                _inherits(Menu, _Ion);

                function Menu(app, elementRef, config, platform, keyboard) {
                    _classCallCheck(this, Menu);

                    _get(Object.getPrototypeOf(Menu.prototype), "constructor", this).call(this, elementRef, config);
                    this.app = app;
                    this.platform = platform;
                    this.keyboard = keyboard;
                    this.opening = new EventEmitter('opening');
                    this.isOpen = false;
                    this._preventTime = 0;
                    this.isEnabled = true;
                }

                /**
                 * @private
                 */

                _createClass(Menu, [{
                    key: "onInit",
                    value: function onInit() {
                        _get(Object.getPrototypeOf(Menu.prototype), "onInit", this).call(this);
                        var content = this.content;
                        this._cntEle = content instanceof Node ? content : content && content.getNativeElement && content.getNativeElement();
                        if (!this._cntEle) {
                            return console.error('Menu: must have a [content] element to listen for drag events on. Example:\n\n<ion-menu [content]="content"></ion-menu>\n\n<ion-nav #content></ion-nav>');
                        }
                        if (this.side !== 'left' && this.side !== 'right') {
                            this.side = 'left';
                        }
                        if (!this.id) {
                            // Auto register
                            this.id = 'menu';
                            this.app.register(this.id, this);
                        }
                        this._initGesture();
                        this._initType(this.type);
                        this._cntEle.classList.add('menu-content');
                        this._cntEle.classList.add('menu-content-' + this.type);
                        var self = this;
                        this.onContentClick = function (ev) {
                            if (self.isEnabled) {
                                ev.preventDefault();
                                ev.stopPropagation();
                                self.close();
                            }
                        };
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "_initGesture",
                    value: function _initGesture() {
                        switch (this.side) {
                            case 'right':
                                this._gesture = new gestures.RightMenuGesture(this);
                                break;
                            case 'left':
                                this._gesture = new gestures.LeftMenuGesture(this);
                                break;
                        }
                        this._targetGesture = new gestures.TargetGesture(this);
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "_initType",
                    value: function _initType(type) {
                        type = type && type.trim().toLowerCase();
                        if (!type) {
                            type = this.config.get('menuType');
                        }
                        this.type = type;
                    }
                }, {
                    key: "_getType",
                    value: function _getType() {
                        if (!this._type) {
                            this._type = new menuTypes[this.type](this);
                            if (this.config.get('animate') === false) {
                                this._type.open.duration(33);
                                this._type.close.duration(33);
                            }
                        }
                        return this._type;
                    }

                    /**
                     * Sets the state of the Menu to open or not.
                     * @param {boolean} isOpen  If the Menu is open or not.
                     * @return {Promise} TODO
                     */
                }, {
                    key: "setOpen",
                    value: function setOpen(shouldOpen) {
                        var _this = this;

                        // _isPrevented is used to prevent unwanted opening/closing after swiping open/close
                        // or swiping open the menu while pressing down on the menu-toggle button
                        if (shouldOpen === this.isOpen || this._isPrevented()) {
                            return Promise.resolve();
                        }
                        this._before();
                        return this._getType().setOpen(shouldOpen).then(function () {
                            _this._after(shouldOpen);
                        });
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "setProgressStart",
                    value: function setProgressStart() {
                        // user started swiping the menu open/close
                        if (this._isPrevented() || !this.isEnabled) return;
                        this._before();
                        this._getType().setProgressStart(this.isOpen);
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "setProgess",
                    value: function setProgess(value) {
                        // user actively dragging the menu
                        if (this.isEnabled) {
                            this._prevent();
                            this._getType().setProgess(value);
                            this.opening.next(value);
                        }
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "setProgressEnd",
                    value: function setProgressEnd(shouldComplete) {
                        var _this2 = this;

                        // user has finished dragging the menu
                        if (this.isEnabled) {
                            this._prevent();
                            this._getType().setProgressEnd(shouldComplete).then(function (isOpen) {
                                _this2._after(isOpen);
                            });
                        }
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "_before",
                    value: function _before() {
                        // this places the menu into the correct location before it animates in
                        // this css class doesn't actually kick off any animations
                        if (this.isEnabled) {
                            this.getNativeElement().classList.add('show-menu');
                            this.getBackdropElement().classList.add('show-backdrop');
                            this._prevent();
                            this.keyboard.close();
                        }
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "_after",
                    value: function _after(isOpen) {
                        // keep opening/closing the menu disabled for a touch more yet
                        if (this.isEnabled) {
                            this._prevent();
                            this.isOpen = isOpen;
                            this._cntEle.classList[isOpen ? 'add' : 'remove']('menu-content-open');
                            this._cntEle.removeEventListener('click', this.onContentClick);
                            if (isOpen) {
                                this._cntEle.addEventListener('click', this.onContentClick);
                            } else {
                                this.getNativeElement().classList.remove('show-menu');
                                this.getBackdropElement().classList.remove('show-backdrop');
                            }
                        }
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "_prevent",
                    value: function _prevent() {
                        // used to prevent unwanted opening/closing after swiping open/close
                        // or swiping open the menu while pressing down on the menu-toggle
                        this._preventTime = Date.now() + 20;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "_isPrevented",
                    value: function _isPrevented() {
                        return this._preventTime > Date.now();
                    }

                    /**
                     * TODO
                     * @return {TODO} TODO
                     */
                }, {
                    key: "open",
                    value: function open() {
                        return this.setOpen(true);
                    }

                    /**
                     * TODO
                     * @return {TODO} TODO
                     */
                }, {
                    key: "close",
                    value: function close() {
                        return this.setOpen(false);
                    }

                    /**
                     * TODO
                     * @return {TODO} TODO
                     */
                }, {
                    key: "toggle",
                    value: function toggle() {
                        return this.setOpen(!this.isOpen);
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "enable",
                    value: function enable(shouldEnable) {
                        this.isEnabled = shouldEnable;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "getMenuElement",
                    value: function getMenuElement() {
                        return this.getNativeElement();
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "getContentElement",
                    value: function getContentElement() {
                        return this._cntEle;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "getBackdropElement",
                    value: function getBackdropElement() {
                        return this.backdrop.elementRef.nativeElement;
                    }
                }, {
                    key: "onDestroy",

                    /**
                     * @private
                     */
                    value: function onDestroy() {
                        this.app.unregister(this.id);
                        this._gesture && this._gesture.destroy();
                        this._targetGesture && this._targetGesture.destroy();
                        this._type && this._type.onDestroy();
                        this._cntEle = null;
                    }
                }], [{
                    key: "register",
                    value: function register(name, cls) {
                        menuTypes[name] = cls;
                    }
                }]);

                return Menu;
            })(Ion);

            _export("Menu", Menu);

            _export("Menu", Menu = __decorate([Component({
                selector: 'ion-menu',
                inputs: ['content', 'dragThreshold', 'id', 'side', 'type'],
                defaultInputs: {
                    'side': 'left',
                    'menuType': 'reveal'
                },
                outputs: ['opening'],
                host: {
                    'role': 'navigation',
                    '[attr.side]': 'side',
                    '[attr.type]': 'type'
                },
                template: '<ng-content></ng-content><backdrop tappable disable-activated></backdrop>',
                directives: [forwardRef(function () {
                    return MenuBackdrop;
                })]
            }), __metadata('design:paramtypes', [typeof (_a = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c || Object, typeof (_d = typeof Platform !== 'undefined' && Platform) === 'function' && _d || Object, typeof (_e = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _e || Object])], Menu));
            menuTypes = {};

            MenuBackdrop = (function () {
                function MenuBackdrop(menu, elementRef) {
                    _classCallCheck(this, MenuBackdrop);

                    this.menu = menu;
                    this.elementRef = elementRef;
                    menu.backdrop = this;
                }

                /**
                 * @private
                 */

                _createClass(MenuBackdrop, [{
                    key: "clicked",
                    value: function clicked(ev) {
                        console.debug('backdrop clicked');
                        ev.preventDefault();
                        ev.stopPropagation();
                        this.menu.close();
                    }
                }]);

                return MenuBackdrop;
            })();

            MenuBackdrop = __decorate([Directive({
                selector: 'backdrop',
                host: {
                    '(click)': 'clicked($event)'
                }
            }), __param(0, Host()), __metadata('design:paramtypes', [Menu, typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f || Object])], MenuBackdrop);
        }
    };
});