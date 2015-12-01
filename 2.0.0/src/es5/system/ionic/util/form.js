System.register("ionic/util/form", ["angular2/angular2"], function (_export) {
    /**
     * The Input component is used to focus text input elements.
     *
     * @usage
     * ```html
     * <ion-input>
     *   <ion-label>Name</ion-label>
     *   <input value="Name" type="text">
     * </ion-input>
     * ```
     */
    "use strict";

    var Injectable, __decorate, __metadata, Form;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Injectable = _angular2Angular2.Injectable;
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

            Form = (function () {
                function Form() {
                    _classCallCheck(this, Form);

                    this._inputs = [];
                    this._focused = null;
                    this.focusCtrl(document);
                }

                _createClass(Form, [{
                    key: "register",
                    value: function register(input) {
                        this._inputs.push(input);
                    }
                }, {
                    key: "deregister",
                    value: function deregister(input) {
                        var index = this._inputs.indexOf(input);
                        if (index > -1) {
                            this._inputs.splice(index, 1);
                        }
                        if (input === this._focused) {
                            this._focused = null;
                        }
                    }
                }, {
                    key: "focusCtrl",
                    value: function focusCtrl(document) {
                        // raw DOM fun
                        var focusCtrl = document.createElement('focus-ctrl');
                        focusCtrl.setAttribute('aria-hidden', true);
                        this._blur = document.createElement('button');
                        this._blur.tabIndex = -1;
                        focusCtrl.appendChild(this._blur);
                        document.body.appendChild(focusCtrl);
                    }
                }, {
                    key: "focusOut",
                    value: function focusOut() {
                        console.debug('focusOut');
                        this._blur.focus();
                    }
                }, {
                    key: "setAsFocused",
                    value: function setAsFocused(input) {
                        this._focused = input;
                    }

                    /**
                     * Focuses the next input element, if it exists.
                     */
                }, {
                    key: "focusNext",
                    value: function focusNext(currentInput) {
                        console.debug('focusNext');
                        var index = this._inputs.indexOf(currentInput);
                        if (index > -1 && index + 1 < this._inputs.length) {
                            var nextInput = this._inputs[index + 1];
                            if (nextInput !== this._focused) {
                                return nextInput.initFocus();
                            }
                        }
                        index = this._inputs.indexOf(this._focused);
                        if (index > 0) {
                            var previousInput = this._inputs[index - 1];
                            if (previousInput) {
                                previousInput.initFocus();
                            }
                        }
                    }
                }]);

                return Form;
            })();

            _export("Form", Form);

            _export("Form", Form = __decorate([Injectable(), __metadata('design:paramtypes', [])], Form));
        }
    };
});