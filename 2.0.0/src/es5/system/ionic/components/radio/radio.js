System.register("ionic/components/radio/radio", ["angular2/angular2", "../../config/config", "../ion", "../list/list"], function (_export) {
    /**
     * A radio group is a group of radio components.
     *
     * Selecting a radio button in the group unselects all others in the group.
     *
     * New radios can be registered dynamically.
     *
     * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
     *
     * @usage
     * ```html
     * <ion-list radio-group ng-control="clientside">
     *
     *   <ion-list-header>
     *     Clientside
     *   </ion-list-header>
     *
     *   <ion-radio value="ember">
     *     Ember
     *   </ion-radio>
     *
     *   <ion-radio value="angular1">
     *     Angular 1
     *   </ion-radio>
     *
     *   <ion-radio value="angular2" checked="true">
     *     Angular 2
     *   </ion-radio>
     *
     *   <ion-radio value="react">
     *     React
     *   </ion-radio>
     *
     * </ion-list>
     * ```
    */
    "use strict";

    var Component, Directive, ElementRef, Host, Optional, NgControl, Query, QueryList, Config, Ion, ListHeader, __decorate, __metadata, __param, RadioGroup, RadioButton, radioGroupIds, _a, _b, _c, _d, _e, _f;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            Directive = _angular2Angular2.Directive;
            ElementRef = _angular2Angular2.ElementRef;
            Host = _angular2Angular2.Host;
            Optional = _angular2Angular2.Optional;
            NgControl = _angular2Angular2.NgControl;
            Query = _angular2Angular2.Query;
            QueryList = _angular2Angular2.QueryList;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_ion) {
            Ion = _ion.Ion;
        }, function (_listList) {
            ListHeader = _listList.ListHeader;
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

            RadioGroup = (function (_Ion) {
                _inherits(RadioGroup, _Ion);

                function RadioGroup(elementRef, config, ngControl, headerQuery) {
                    _classCallCheck(this, RadioGroup);

                    _get(Object.getPrototypeOf(RadioGroup.prototype), "constructor", this).call(this, elementRef, config);
                    this.headerQuery = headerQuery;
                    this.radios = [];
                    this.ngControl = ngControl;
                    this.id = ++radioGroupIds;
                    this.radioIds = -1;
                    this.onChange = function (_) {};
                    this.onTouched = function (_) {};
                    if (ngControl) this.ngControl.valueAccessor = this;
                }

                /**
                 * @private
                 */

                _createClass(RadioGroup, [{
                    key: "onInit",
                    value: function onInit() {
                        var header = this.headerQuery.first;
                        if (header) {
                            if (!header.id) {
                                header.id = 'radio-header-' + this.id;
                            }
                            this.describedById = header.id;
                        }
                    }

                    /**
                     * @private
                     * Register the specified radio button with the radio group.
                     * @param {RadioButton} radio  The radio button to register.
                     */
                }, {
                    key: "registerRadio",
                    value: function registerRadio(radio) {
                        radio.id = radio.id || 'radio-' + this.id + '-' + ++this.radioIds;
                        this.radios.push(radio);
                        if (this.value == radio.value) {
                            radio.check(this.value);
                        }
                        if (radio.checked) {
                            this.value = radio.value;
                            this.onChange(this.value);
                            this.activeId = radio.id;
                        }
                    }

                    /**
                     * @private
                     * Update which radio button in the group is checked, unchecking all others.
                     * @param {RadioButton} checkedRadio  The radio button to check.
                     */
                }, {
                    key: "update",
                    value: function update(checkedRadio) {
                        this.value = checkedRadio.value;
                        this.activeId = checkedRadio.id;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = this.radios[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var radio = _step.value;

                                radio.checked = radio === checkedRadio;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator["return"]) {
                                    _iterator["return"]();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        this.onChange(this.value);
                    }

                    /**
                     * @private
                     * Angular2 Forms API method called by the model (Control) on change to update
                     * the checked value.
                     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
                     */
                }, {
                    key: "writeValue",
                    value: function writeValue(value) {
                        this.value = value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = this.radios[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var radio = _step2.value;

                                radio.checked = radio.value == value;
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                    _iterator2["return"]();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }

                    /**
                     * @private
                     * Angular2 Forms API method called by the view (NgControl) to register the
                     * onChange event handler that updates the model (Control).
                     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L27
                     * @param {Function} fn  the onChange event handler.
                     */
                }, {
                    key: "registerOnChange",
                    value: function registerOnChange(fn) {
                        this.onChange = fn;
                    }

                    /**
                     * @private
                     * Angular2 Forms API method called by the the view (NgControl) to register
                     * the onTouched event handler that marks the model (Control) as touched.
                     * @param {Function} fn  onTouched event handler.
                     */
                }, {
                    key: "registerOnTouched",
                    value: function registerOnTouched(fn) {
                        this.onTouched = fn;
                    }
                }]);

                return RadioGroup;
            })(Ion);

            _export("RadioGroup", RadioGroup);

            _export("RadioGroup", RadioGroup = __decorate([Directive({
                selector: '[radio-group]',
                host: {
                    'role': 'radiogroup',
                    '[attr.aria-activedescendant]': 'activeId',
                    '[attr.aria-describedby]': 'describedById'
                }
            }), __param(2, Optional()), __param(3, Query(ListHeader)), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof NgControl !== 'undefined' && NgControl) === 'function' && _c || Object, typeof (_d = typeof QueryList !== 'undefined' && QueryList) === 'function' && _d || Object])], RadioGroup));
            /**
             * @description
             * A single radio component.
             *
             * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
             *
             * @usage
             * ```html
             * <ion-radio value="isChecked" checked="true">
             *   Radio Label
             * </ion-radio>
             * ```
             *
             */

            RadioButton = (function (_Ion2) {
                _inherits(RadioButton, _Ion2);

                function RadioButton(group, elementRef, config) {
                    _classCallCheck(this, RadioButton);

                    _get(Object.getPrototypeOf(RadioButton.prototype), "constructor", this).call(this, elementRef, config);
                    this.group = group;
                    this.tabIndex = 0;
                }

                /**
                 * @private
                 */

                _createClass(RadioButton, [{
                    key: "onInit",
                    value: function onInit() {
                        _get(Object.getPrototypeOf(RadioButton.prototype), "onInit", this).call(this);
                        this.group.registerRadio(this);
                        this.labelId = 'label-' + this.id;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "click",
                    value: function click(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.check();
                    }

                    /**
                     * Update the checked state of this radio button.
                     * TODO: Call this toggle? Since unchecks as well
                     */
                }, {
                    key: "check",
                    value: function check() {
                        this.checked = !this.checked;
                        this.group.update(this);
                    }
                }]);

                return RadioButton;
            })(Ion);

            _export("RadioButton", RadioButton);

            _export("RadioButton", RadioButton = __decorate([Component({
                selector: 'ion-radio',
                inputs: ['value', 'checked', 'disabled', 'id'],
                host: {
                    'role': 'radio',
                    'tappable': 'true',
                    '[attr.id]': 'id',
                    '[attr.tab-index]': 'tabIndex',
                    '[attr.aria-checked]': 'checked',
                    '[attr.aria-disabled]': 'disabled',
                    '[attr.aria-labelledby]': 'labelId',
                    '(click)': 'click($event)',
                    'class': 'item'
                },
                template: '<div class="item-inner">' + '<ion-item-content id="{{labelId}}">' + '<ng-content></ng-content>' + '</ion-item-content>' + '<media-radio>' + '<radio-icon></radio-icon>' + '</media-radio>' + '</div>'
            }), __param(0, Host()), __param(0, Optional()), __metadata('design:paramtypes', [RadioGroup, typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e || Object, typeof (_f = typeof Config !== 'undefined' && Config) === 'function' && _f || Object])], RadioButton));
            radioGroupIds = -1;
        }
    };
});