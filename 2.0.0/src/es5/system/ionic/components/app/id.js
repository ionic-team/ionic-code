System.register("ionic/components/app/id", ["angular2/angular2", "./app"], function (_export) {
    /**
     * IdRef is an easy way to identify unique components in an app and access them
     * no matter where in the UI heirarchy you are. For example, this makes toggling
     * a global side menu feasible from any place in the application.
     *
     * See the [Menu section](http://localhost:4000/docs/v2/components/#menus) of
     * the Component docs for an example of how Menus rely on ID's.
     *
     * To give any component an ID, simply set its `id` property:
     * ```html
     * <ion-checkbox id="myCheckbox"></ion-checkbox>
     * ```
     *
     * To get a reference to the registered component, inject the [IonicApp](../app/IonicApp/)
     * service:
     * ```ts
     * constructor(app: IonicApp) {
     *   var checkbox = app.getComponent("myCheckbox");
     *   if (checkbox.checked) console.log('checkbox is checked');
     * }
     * ```
     *
     * *NOTE:* It is not recommended to use ID's across Pages, as there is often no
     * guarantee that the registered component has not been destroyed if its Page
     * has been navigated away from.
     */
    "use strict";

    var AppViewManager, ElementRef, Directive, Renderer, IonicApp, __decorate, __metadata, IdRef, Attr, _a, _b, _c, _d, _e;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            AppViewManager = _angular2Angular2.AppViewManager;
            ElementRef = _angular2Angular2.ElementRef;
            Directive = _angular2Angular2.Directive;
            Renderer = _angular2Angular2.Renderer;
        }, function (_app) {
            IonicApp = _app.IonicApp;
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

            IdRef = (function () {
                function IdRef(app, elementRef, appViewManager) {
                    _classCallCheck(this, IdRef);

                    this.app = app;
                    this.elementRef = elementRef;
                    this.appViewManager = appViewManager;
                    // Grab the component this directive is attached to
                    this.component = appViewManager.getComponent(elementRef);
                }

                /**
                 * @private
                 */

                _createClass(IdRef, [{
                    key: "onInit",
                    value: function onInit() {
                        this.app.register(this.id, this.component);
                    }

                    /**
                     * @private
                     */
                }, {
                    key: "onDestroy",
                    value: function onDestroy() {
                        this.app.unregister(this.id);
                    }
                }]);

                return IdRef;
            })();

            _export("IdRef", IdRef);

            _export("IdRef", IdRef = __decorate([Directive({
                selector: '[id]',
                inputs: ['id']
            }), __metadata('design:paramtypes', [typeof (_a = typeof IonicApp !== 'undefined' && IonicApp) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof AppViewManager !== 'undefined' && AppViewManager) === 'function' && _c || Object])], IdRef));

            Attr = (function () {
                function Attr(renderer, elementRef) {
                    _classCallCheck(this, Attr);

                    this.renderer = renderer;
                    this.elementRef = elementRef;
                }

                /**
                 * @private
                 */

                _createClass(Attr, [{
                    key: "onInit",
                    value: function onInit() {
                        this.renderer.setElementAttribute(this.elementRef, this.attr, '');
                    }
                }]);

                return Attr;
            })();

            _export("Attr", Attr);

            _export("Attr", Attr = __decorate([Directive({
                selector: '[attr]',
                inputs: ['attr']
            }), __metadata('design:paramtypes', [typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d || Object, typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e || Object])], Attr));
        }
    };
});