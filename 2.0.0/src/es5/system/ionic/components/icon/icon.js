System.register("ionic/components/icon/icon", ["angular2/angular2", "../../config/config"], function (_export) {
    "use strict";

    var Directive, ElementRef, Renderer, Config, __decorate, __metadata, Icon, _a, _b, _c;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Directive = _angular2Angular2.Directive;
            ElementRef = _angular2Angular2.ElementRef;
            Renderer = _angular2Angular2.Renderer;
        }, function (_configConfig) {
            Config = _configConfig.Config;
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

            Icon = (function () {
                function Icon(elementRef, config, renderer) {
                    _classCallCheck(this, Icon);

                    this.elementRef = elementRef;
                    this.renderer = renderer;
                    this.config = config;
                    this.mode = config.get('iconMode');
                }

                /**
                 * @private
                 */

                _createClass(Icon, [{
                    key: "onInit",
                    value: function onInit() {
                        var ele = this.elementRef.nativeElement;
                        if (this.mode == 'ios' && this.ios) {
                            this.name = this.ios;
                        } else if (this.mode == 'md' && this.md) {
                            this.name = this.md;
                        } else if (!this.name) {
                            // looping through native dom attributes, eww
                            // https://github.com/angular/angular/issues/3961
                            for (var i = 0, l = ele.attributes.length; i < l; i++) {
                                if (ele.attributes[i].value === '' && /_|item-|is-active|large|small|class/.test(ele.attributes[i].name) !== true) {
                                    this.name = ele.attributes[i].name;
                                    break;
                                }
                            }
                        }
                        if (!this.name) return;
                        if (!/^ion-/.test(this.name)) {
                            // not an exact icon being used
                            // add mode specific prefix
                            this.name = 'ion-' + this.mode + '-' + this.name;
                        }
                        this.update();
                    }
                }, {
                    key: "update",

                    /**
                     * @private
                     */
                    value: function update() {
                        if (this.name && this.mode == 'ios') {
                            if (this.isActive) {
                                if (/-outline/.test(this.name)) {
                                    this.name = this.name.replace('-outline', '');
                                }
                            } else if (!/-outline/.test(this.name)) {
                                this.name += '-outline';
                            }
                        }
                        if (this._name !== this.name) {
                            if (this._name) {
                                this.renderer.setElementClass(this.elementRef, this._name, false);
                            }
                            this._name = this.name;
                            this.renderer.setElementClass(this.elementRef, this.name, true);
                            this.renderer.setElementAttribute(this.elementRef, 'aria-label', this.name.replace('ion-', '').replace('ios-', '').replace('md-', '').replace('-', ' '));
                        }
                    }
                }, {
                    key: "isActive",
                    get: function get() {
                        return this._isActive === undefined || this._isActive === true || this._isActive === 'true';
                    },

                    /**
                     * @private
                     */
                    set: function set(val) {
                        this._isActive = val;
                        this.update();
                    }
                }]);

                return Icon;
            })();

            _export("Icon", Icon);

            _export("Icon", Icon = __decorate([Directive({
                selector: 'icon',
                inputs: ['name', 'ios', 'md', 'isActive'],
                host: {
                    'role': 'img'
                }
            }), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c || Object])], Icon));
        }
    };
});