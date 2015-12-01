System.register("ionic/components/text-input/label", ["angular2/angular2", "../../config/config", "./text-input", "../../util/dom"], function (_export) {
    "use strict";

    var Directive, Optional, Config, TextInput, pointerCoord, hasPointerMoved, __decorate, __metadata, __param, Label, labelIds, _a, _b;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Directive = _angular2Angular2.Directive;
            Optional = _angular2Angular2.Optional;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_textInput) {
            TextInput = _textInput.TextInput;
        }, function (_utilDom) {
            pointerCoord = _utilDom.pointerCoord;
            hasPointerMoved = _utilDom.hasPointerMoved;
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

            Label = (function () {
                function Label(config, container) {
                    _classCallCheck(this, Label);

                    this.scrollAssist = config.get('scrollAssist');
                    if (!this.id) {
                        this.id = 'lbl-' + ++labelIds;
                    }
                    this.container = container;
                    container && container.registerLabel(this);
                }

                /**
                 * @private
                 */

                _createClass(Label, [{
                    key: "pointerStart",
                    value: function pointerStart(ev) {
                        if (this.scrollAssist) {
                            // remember where the touchstart/mousedown started
                            this.startCoord = pointerCoord(ev);
                        }
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "pointerEnd",
                    value: function pointerEnd(ev) {
                        if (this.container) {
                            // get where the touchend/mouseup ended
                            var endCoord = pointerCoord(ev);
                            // focus this input if the pointer hasn't moved XX pixels
                            if (!hasPointerMoved(20, this.startCoord, endCoord)) {
                                ev.preventDefault();
                                ev.stopPropagation();
                                this.container.initFocus();
                            }
                            this.startCoord = null;
                        }
                    }
                }]);

                return Label;
            })();

            _export("Label", Label);

            _export("Label", Label = __decorate([Directive({
                selector: 'ion-label',
                inputs: ['id'],
                host: {
                    '[attr.id]': 'id',
                    '(touchstart)': 'pointerStart($event)',
                    '(touchend)': 'pointerEnd($event)',
                    '(mousedown)': 'pointerStart($event)',
                    '(mouseup)': 'pointerEnd($event)'
                }
            }), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof TextInput !== 'undefined' && TextInput) === 'function' && _b || Object])], Label));
            labelIds = -1;
        }
    };
});