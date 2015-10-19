System.register("ionic/components/blur/blur", ["angular2/angular2"], function (_export) {
    "use strict";

    var Directive, Renderer, ElementRef, __decorate, __metadata, Blur, _a, _b;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_angular2Angular2) {
            Directive = _angular2Angular2.Directive;
            Renderer = _angular2Angular2.Renderer;
            ElementRef = _angular2Angular2.ElementRef;
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

            Blur = function Blur(elementRef, renderer) {
                _classCallCheck(this, Blur);

                this.elementRef = elementRef;
                this.renderer = renderer;
                renderer.setElementStyle(elementRef, '-webkit-backdrop-filter', 'blur(10px)');
            };

            _export("Blur", Blur);

            _export("Blur", Blur = __decorate([Directive({
                selector: '[ion-blur]'
            }), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Renderer !== 'undefined' && Renderer) === 'function' && _b || Object])], Blur));
        }
    };
});