System.register("ionic/components/searchbar/searchbar", ["angular2/angular2", "../ion", "../../config/config", "../../config/decorators", "../icon/icon"], function (_export) {
    /**
     * @description
     * The Search Bar service adds an input field which can be used to search or filter items.
     *
     * @usage
     * ```html
     * <ion-searchbar ng-control="searchQuery"></ion-searchbar>
     * ```
     */
    "use strict";

    var ElementRef, NgControl, Renderer, FORM_DIRECTIVES, NgIf, NgClass, Ion, Config, ConfigComponent, Icon, __decorate, __metadata, Searchbar, _a, _b, _c, _d;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_angular2Angular2) {
            ElementRef = _angular2Angular2.ElementRef;
            NgControl = _angular2Angular2.NgControl;
            Renderer = _angular2Angular2.Renderer;
            FORM_DIRECTIVES = _angular2Angular2.FORM_DIRECTIVES;
            NgIf = _angular2Angular2.NgIf;
            NgClass = _angular2Angular2.NgClass;
        }, function (_ion) {
            Ion = _ion.Ion;
        }, function (_configConfig) {
            Config = _configConfig.Config;
        }, function (_configDecorators) {
            ConfigComponent = _configDecorators.ConfigComponent;
        }, function (_iconIcon) {
            Icon = _iconIcon.Icon;
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

            Searchbar = (function (_Ion) {
                _inherits(Searchbar, _Ion);

                function Searchbar(elementRef, config, ngControl, renderer) {
                    _classCallCheck(this, Searchbar);

                    _get(Object.getPrototypeOf(Searchbar.prototype), "constructor", this).call(this, elementRef, config);
                    this.renderer = renderer;
                    this.elementRef = elementRef;
                    if (!ngControl) {
                        // They don't want to do anything that works, so we won't do anything that breaks
                        return;
                    }
                    this.ngControl = ngControl;
                    this.ngControl.valueAccessor = this;
                }

                /**
                 * @private
                 */

                _createClass(Searchbar, [{
                    key: "afterViewInit",
                    value: function afterViewInit() {
                        // If the user passes in a value to the model we should left align
                        this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
                        this.query = this.ngControl.value || '';
                    }

                    /**
                     * @private
                     * Much like ngModel, this is called from our valueAccessor for the attached
                     * ControlDirective to update the value internally.
                     */
                }, {
                    key: "writeValue",
                    value: function writeValue(value) {
                        this.query = value;
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
                    key: "inputChanged",
                    value: function inputChanged(event) {
                        this.writeValue(event.target.value);
                        this.onChange(event.target.value);
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "inputFocused",
                    value: function inputFocused() {
                        this.isFocused = true;
                        this.shouldLeftAlign = true;
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "inputBlurred",
                    value: function inputBlurred() {
                        this.isFocused = false;
                        this.shouldLeftAlign = this.ngControl.value && this.ngControl.value.trim() != '';
                    }
                }, {
                    key: "clearInput",
                    value: function clearInput(event) {
                        this.writeValue('');
                        this.onChange('');
                    }
                }]);

                return Searchbar;
            })(Ion);

            _export("Searchbar", Searchbar);

            _export("Searchbar", Searchbar = __decorate([ConfigComponent({
                selector: 'ion-searchbar',
                defaultInputs: {
                    'showCancel': false,
                    'cancelText': 'Cancel',
                    'placeholder': 'Search',
                    'cancelAction': function cancelAction(event, query) {
                        this.element = this.elementRef.nativeElement.querySelector('input');
                        this.element.blur();
                        this.clearInput();
                        this.shouldLeftAlign = false;
                    }
                },
                host: {
                    '[class.left-align]': 'shouldLeftAlign',
                    '[class.focused]': 'isFocused'
                },
                template: '<div class="searchbar-input-container">' + '<button (click)="cancelAction($event, query)" clear dark class="searchbar-cancel-icon"><icon arrow-back></icon></button>' + '<div class="searchbar-search-icon"></div>' + '<input [(value)]="query" (focus)="inputFocused()" (blur)="inputBlurred()" ' + '(input)="inputChanged($event)" class="searchbar-input" type="search" [attr.placeholder]="placeholder">' + '<button clear *ng-if="query" class="searchbar-close-icon" (click)="clearInput($event)"></button>' + '</div>' + '<button *ng-if="showCancel" (click)="cancelAction($event, query)" class="searchbar-cancel">{{cancelText}}</button>',
                directives: [FORM_DIRECTIVES, NgIf, NgClass, Icon]
            }), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof NgControl !== 'undefined' && NgControl) === 'function' && _c || Object, typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d || Object])], Searchbar));
        }
    };
});