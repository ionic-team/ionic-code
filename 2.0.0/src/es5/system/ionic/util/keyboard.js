System.register("ionic/util/keyboard", ["angular2/angular2", "../config/config", "./form", "./dom"], function (_export) {
    "use strict";

    var Injectable, NgZone, Config, Form, hasFocusedTextInput, raf, rafFrames, __decorate, __metadata, Keyboard, KEYBOARD_CLOSE_POLLING, _a, _b, _c;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Injectable = _angular2Angular2.Injectable;
            NgZone = _angular2Angular2.NgZone;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_form) {
            Form = _form.Form;
        }, function (_dom) {
            hasFocusedTextInput = _dom.hasFocusedTextInput;
            raf = _dom.raf;
            rafFrames = _dom.rafFrames;
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

            Keyboard = (function () {
                function Keyboard(config, form, zone) {
                    var _this = this;

                    _classCallCheck(this, Keyboard);

                    this.form = form;
                    this.zone = zone;
                    zone.runOutsideAngular(function () {
                        _this.focusOutline(config.get('focusOutline'), document);
                    });
                }

                _createClass(Keyboard, [{
                    key: "isOpen",
                    value: function isOpen() {
                        return hasFocusedTextInput();
                    }
                }, {
                    key: "onClose",
                    value: function onClose(callback) {
                        var pollingInternval = arguments.length <= 1 || arguments[1] === undefined ? KEYBOARD_CLOSE_POLLING : arguments[1];

                        var self = this;
                        var promise = null;
                        if (!callback) {
                            // a callback wasn't provided, so let's return a promise instead
                            promise = new Promise(function (resolve) {
                                callback = resolve;
                            });
                        }
                        self.zone.runOutsideAngular(function () {
                            function checkKeyboard() {
                                if (!self.isOpen()) {
                                    rafFrames(30, function () {
                                        self.zone.run(function () {
                                            console.debug('keyboard closed');
                                            callback();
                                        });
                                    });
                                } else {
                                    setTimeout(checkKeyboard, pollingInternval);
                                }
                            }
                            setTimeout(checkKeyboard, pollingInternval);
                        });
                        return promise;
                    }
                }, {
                    key: "close",
                    value: function close() {
                        var _this2 = this;

                        raf(function () {
                            if (hasFocusedTextInput()) {
                                // only focus out when a text input has focus
                                _this2.form.focusOut();
                            }
                        });
                    }
                }, {
                    key: "focusOutline",
                    value: function focusOutline(setting, document) {
                        /* Focus Outline
                         * --------------------------------------------------
                         * By default, when a keydown event happens from a tab key, then
                         * the 'focus-outline' css class is added to the body element
                         * so focusable elements have an outline. On a mousedown or
                         * touchstart event, then the 'focus-outline' css class is removed.
                         *
                         * Config default overrides:
                         * focusOutline: true     - Always add the focus-outline
                         * focusOutline: false    - Do not add the focus-outline
                         */
                        var self = this;
                        var isKeyInputEnabled = false;
                        function cssClass() {
                            raf(function () {
                                document.body.classList[isKeyInputEnabled ? 'add' : 'remove']('focus-outline');
                            });
                        }
                        if (setting === true) {
                            isKeyInputEnabled = true;
                            return cssClass();
                        } else if (setting === false) {
                            return;
                        }
                        // default is to add the focus-outline when the tab key is used
                        function keyDown(ev) {
                            if (!isKeyInputEnabled && ev.keyCode == 9) {
                                isKeyInputEnabled = true;
                                enableKeyInput();
                            }
                        }
                        function pointerDown() {
                            isKeyInputEnabled = false;
                            enableKeyInput();
                        }
                        function enableKeyInput() {
                            cssClass();
                            self.zone.runOutsideAngular(function () {
                                document.removeEventListener('mousedown', pointerDown);
                                document.removeEventListener('touchstart', pointerDown);
                                if (isKeyInputEnabled) {
                                    document.addEventListener('mousedown', pointerDown);
                                    document.addEventListener('touchstart', pointerDown);
                                }
                            });
                        }
                        document.addEventListener('keydown', keyDown);
                    }
                }]);

                return Keyboard;
            })();

            _export("Keyboard", Keyboard);

            _export("Keyboard", Keyboard = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof Form !== 'undefined' && Form) === 'function' && _b || Object, typeof (_c = typeof NgZone !== 'undefined' && NgZone) === 'function' && _c || Object])], Keyboard));
            KEYBOARD_CLOSE_POLLING = 150;
        }
    };
});