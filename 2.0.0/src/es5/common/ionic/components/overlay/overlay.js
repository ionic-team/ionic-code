"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _overlayController = require('./overlay-controller');

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
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
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OverlayAnchor = (function () {
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
exports.OverlayAnchor = OverlayAnchor;
exports.OverlayAnchor = OverlayAnchor = __decorate([(0, _angular2Angular2.Component)({
    selector: 'ion-overlay',
    template: ''
}), __metadata('design:paramtypes', [typeof (_a = typeof _overlayController.OverlayController !== 'undefined' && _overlayController.OverlayController) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object, typeof (_c = typeof _angular2Angular2.DynamicComponentLoader !== 'undefined' && _angular2Angular2.DynamicComponentLoader) === 'function' && _c || Object])], OverlayAnchor);
var _a, _b, _c;