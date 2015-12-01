System.register("ionic/components/checkbox/checkbox", ["angular2/angular2", "../../util/form"], function (_export) {
    /**
     * The checkbox is no different than the HTML checkbox input, except it's styled differently
     *
     * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/core/Form-interface.html) for more info on forms and input.
     *
     * @usage
     * ```html
     * <ion-checkbox checked="true" value="isChecked" ng-control="htmlCtrl">
     *   HTML5
     * </ion-checkbox>
     * ```
     */
    "use strict";

    var Component, Optional, NgControl, ElementRef, Form, __decorate, __metadata, __param, Checkbox, _a, _b, _c;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            Optional = _angular2Angular2.Optional;
            NgControl = _angular2Angular2.NgControl;
            ElementRef = _angular2Angular2.ElementRef;
        }, function (_utilForm) {
            Form = _utilForm.Form;
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

            Checkbox = (function () {
                function Checkbox(form, ngControl, elementRef) {
                    _classCallCheck(this, Checkbox);

                    this.form = form;
                    form.register(this);
                    this.onChange = function (_) {};
                    this.onTouched = function (_) {};
                    this.ngControl = ngControl;
                    if (ngControl) ngControl.valueAccessor = this;
                }

                _createClass(Checkbox, [{
                    key: "onInit",
                    value: function onInit() {
                        this.labelId = 'label-' + this.inputId;
                    }

                    /**
                     * Toggle the checked state of the checkbox. Calls onChange to pass the
                     * updated checked state to the model (Control).
                     */
                }, {
                    key: "toggle",
                    value: function toggle() {
                        this.checked = !this.checked;
                        this.onChange(this.checked);
                    }

                    /**
                     * @private
                     * Click event handler to toggle the checkbox checked state.
                     * @param {MouseEvent} ev  The click event.
                     */
                }, {
                    key: "click",
                    value: function click(ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        this.toggle();
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
                        this.checked = value;
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
                     * the onTouched event handler that marks model (Control) as touched.
                     * @param {Function} fn  onTouched event handler.
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
                        this.form.deregister(this);
                    }
                }]);

                return Checkbox;
            })();

            _export("Checkbox", Checkbox);

            _export("Checkbox", Checkbox = __decorate([Component({
                selector: 'ion-checkbox',
                inputs: ['value', 'checked', 'disabled', 'id'],
                host: {
                    'role': 'checkbox',
                    'tappable': 'true',
                    '[attr.tab-index]': 'tabIndex',
                    '[attr.aria-checked]': 'checked',
                    '[attr.aria-disabled]': 'disabled',
                    '[attr.aria-labelledby]': 'labelId',
                    '(click)': 'click($event)',
                    'class': 'item'
                },
                template: '<div class="item-inner">' + '<media-checkbox disable-activated>' + '<checkbox-icon></checkbox-icon>' + '</media-checkbox>' + '<ion-item-content id="{{labelId}}">' + '<ng-content></ng-content>' + '</ion-item-content>' + '</div>'
            }), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof Form !== 'undefined' && Form) === 'function' && _a || Object, typeof (_b = typeof NgControl !== 'undefined' && NgControl) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object])], Checkbox));
        }
    };
});