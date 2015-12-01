System.register("ionic/components/switch/switch", ["angular2/angular2", "../../util/form", "../../config/config", "../../util/dom"], function (_export) {
    /**
     * @private
     */
    "use strict";

    var Component, Directive, ElementRef, Host, Optional, NgControl, Inject, forwardRef, Form, Config, pointerCoord, __decorate, __metadata, __param, MediaSwitch, Switch, _a, _b, _c, _d, _e;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            Directive = _angular2Angular2.Directive;
            ElementRef = _angular2Angular2.ElementRef;
            Host = _angular2Angular2.Host;
            Optional = _angular2Angular2.Optional;
            NgControl = _angular2Angular2.NgControl;
            Inject = _angular2Angular2.Inject;
            forwardRef = _angular2Angular2.forwardRef;
        }, function (_utilForm) {
            Form = _utilForm.Form;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_utilDom) {
            pointerCoord = _utilDom.pointerCoord;
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

            MediaSwitch =
            /**
             * TODO
             * @param {Switch} swtch  TODO
             * @param {} elementRef  TODO
             * @param {Config} config  TODO
             */
            function MediaSwitch(swtch, elementRef) {
                _classCallCheck(this, MediaSwitch);

                swtch.switchEle = elementRef.nativeElement;
                this.swtch = swtch;
            };

            MediaSwitch = __decorate([Directive({
                selector: 'media-switch',
                host: {
                    '[class.switch-activated]': 'swtch.isActivated'
                }
            }), __param(0, Host()), __param(0, Inject(forwardRef(function () {
                return Switch;
            }))), __metadata('design:paramtypes', [Switch, typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object])], MediaSwitch);
            /**
             * A switch technically is the same thing as an HTML checkbox input, except it looks different and is easier to use on a touch device. Ionic prefers to wrap the checkbox input with the <label> in order to make the entire toggle easy to tap or drag.
             *
             * Toggles can also have colors assigned to them, by adding the `toggle-assertive` attribute to assign the assertive color.
             *
             * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
             *
             * @usage
             * ```html
             * // Create a single switch
             *  <ion-switch checked="true">
             *    Pineapple
             *  </ion-switch>
             *
             * // Create a list of switches:
             *  <ion-list>
             *
             *    <ion-switch checked="true">
             *      Apple
             *    </ion-switch>
             *
             *     <ion-switch checked="false">
             *       Banana
             *     </ion-switch>
             *
             *     <ion-switch disabled="true">
             *       Cherry
             *     </ion-switch>
             *
             *  </ion-list>
             * ```
             *
             */

            Switch = (function () {
                function Switch(form, elementRef, config, ngControl) {
                    _classCallCheck(this, Switch);

                    this.ngControl = ngControl;
                    this.form = form;
                    form.register(this);
                    this.lastTouch = 0;
                    this.mode = config.get('mode');
                    this.onChange = function (_) {};
                    this.onTouched = function (_) {};
                    if (ngControl) ngControl.valueAccessor = this;
                    var self = this;
                    function pointerMove(ev) {
                        var currentX = pointerCoord(ev).x;
                        if (self.checked) {
                            if (currentX + 15 < self.startX) {
                                self.toggle(ev);
                                self.startX = currentX;
                            }
                        } else if (currentX - 15 > self.startX) {
                            self.toggle(ev);
                            self.startX = currentX;
                        }
                    }
                    function pointerOut(ev) {
                        if (ev.currentTarget === ev.target) {
                            self.pointerUp(ev);
                        }
                    }
                    this.addMoveListener = function () {
                        self.switchEle.addEventListener('touchmove', pointerMove);
                        self.switchEle.addEventListener('mousemove', pointerMove);
                        elementRef.nativeElement.addEventListener('mouseout', pointerOut);
                    };
                    this.removeMoveListener = function () {
                        self.switchEle.removeEventListener('touchmove', pointerMove);
                        self.switchEle.removeEventListener('mousemove', pointerMove);
                        elementRef.nativeElement.removeEventListener('mouseout', pointerOut);
                    };
                }

                /**
                 * @private
                 */

                _createClass(Switch, [{
                    key: "onInit",
                    value: function onInit() {
                        this.labelId = 'label-' + this.inputId;
                    }

                    /**
                     * Set checked state of this switch.
                     * @param {boolean} value  Boolean to set this switch's checked state to.
                     */
                }, {
                    key: "check",
                    value: function check(value) {
                        this.checked = !!value;
                        this.onChange(this.checked);
                    }

                    /**
                     * Toggle the checked state of this switch.
                     */
                }, {
                    key: "toggle",
                    value: function toggle(ev) {
                        this.check(!this.checked);
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "writeValue",
                    value: function writeValue(value) {
                        this.checked = value;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "pointerDown",
                    value: function pointerDown(ev) {
                        if (/touch/.test(ev.type)) {
                            this.lastTouch = Date.now();
                        }
                        if (this.isDisabled(ev)) return;
                        this.startX = pointerCoord(ev).x;
                        this.removeMoveListener();
                        this.addMoveListener();
                        this.isActivated = true;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "pointerUp",
                    value: function pointerUp(ev) {
                        if (this.isDisabled(ev)) return;
                        var endX = pointerCoord(ev).x;
                        if (this.checked) {
                            if (this.startX + 4 > endX) {
                                this.toggle(ev);
                            }
                        } else if (this.startX - 4 < endX) {
                            this.toggle(ev);
                        }
                        this.removeMoveListener();
                        this.isActivated = false;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "registerOnChange",
                    value: function registerOnChange(fn) {
                        this.onChange = fn;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "registerOnTouched",
                    value: function registerOnTouched(fn) {
                        this.onTouched = fn;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "onDestroy",
                    value: function onDestroy() {
                        this.removeMoveListener();
                        this.switchEle = this.addMoveListener = this.removeMoveListener = null;
                        this.form.deregister(this);
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "isDisabled",
                    value: function isDisabled(ev) {
                        return this.lastTouch + 999 > Date.now() && /mouse/.test(ev.type) || this.mode == 'ios' && ev.target.tagName == 'ION-SWITCH';
                    }
                }]);

                return Switch;
            })();

            _export("Switch", Switch);

            _export("Switch", Switch = __decorate([Component({
                selector: 'ion-switch',
                inputs: ['value', 'checked', 'disabled', 'id'],
                host: {
                    'role': 'checkbox',
                    'tappable': 'true',
                    '[attr.tab-index]': 'tabIndex',
                    '[attr.aria-checked]': 'checked',
                    '[attr.aria-disabled]': 'disabled',
                    '[attr.aria-labelledby]': 'labelId',
                    '(touchstart)': 'pointerDown($event)',
                    '(mousedown)': 'pointerDown($event)',
                    '(touchend)': 'pointerUp($event)',
                    '(mouseup)': 'pointerUp($event)',
                    'class': 'item'
                },
                template: '<ng-content select="[item-left]"></ng-content>' + '<div class="item-inner">' + '<ion-item-content id="{{labelId}}">' + '<ng-content></ng-content>' + '</ion-item-content>' + '<media-switch disable-activated>' + '<switch-icon></switch-icon>' + '</media-switch>' + "</div>",
                directives: [MediaSwitch]
            }), __param(3, Optional()), __metadata('design:paramtypes', [typeof (_b = typeof Form !== 'undefined' && Form) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d || Object, typeof (_e = typeof NgControl !== 'undefined' && NgControl) === 'function' && _e || Object])], Switch));
        }
    };
});