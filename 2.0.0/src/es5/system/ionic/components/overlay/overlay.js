System.register("ionic/components/overlay/overlay", ["angular2/angular2", "./overlay-controller"], function (_export) {
    "use strict";

    var Component, ElementRef, DynamicComponentLoader, OverlayController, __decorate, __metadata, OverlayAnchor, _a, _b, _c;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Component = _angular2Angular2.Component;
            ElementRef = _angular2Angular2.ElementRef;
            DynamicComponentLoader = _angular2Angular2.DynamicComponentLoader;
        }, function (_overlayController) {
            OverlayController = _overlayController.OverlayController;
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

            OverlayAnchor = (function () {
                function OverlayAnchor(overlayCtrl, elementRef, loader) {
                    _classCallCheck(this, OverlayAnchor);

                    if (overlayCtrl.anchor) {
                        throw 'An app should only have one <ion-overlay></ion-overlay>';
                    }
                    this.elementRef = elementRef;
                    this.loader = loader;
                    overlayCtrl.anchor = this;
                }

                _createClass(OverlayAnchor, [{
                    key: "append",
                    value: function append(componentType) {
                        return this.loader.loadNextToLocation(componentType, this.elementRef)["catch"](function (err) {
                            console.error(err);
                        });
                    }
                }]);

                return OverlayAnchor;
            })();

            _export("OverlayAnchor", OverlayAnchor);

            _export("OverlayAnchor", OverlayAnchor = __decorate([Component({
                selector: 'ion-overlay',
                template: ''
            }), __metadata('design:paramtypes', [typeof (_a = typeof OverlayController !== 'undefined' && OverlayController) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof DynamicComponentLoader !== 'undefined' && DynamicComponentLoader) === 'function' && _c || Object])], OverlayAnchor));
        }
    };
});