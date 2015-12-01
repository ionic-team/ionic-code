"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _app = require('./app');

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
var IdRef = (function () {
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
exports.IdRef = IdRef;
exports.IdRef = IdRef = __decorate([(0, _angular2Angular2.Directive)({
    selector: '[id]',
    inputs: ['id']
}), __metadata('design:paramtypes', [typeof (_a = typeof _app.IonicApp !== 'undefined' && _app.IonicApp) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object, typeof (_c = typeof _angular2Angular2.AppViewManager !== 'undefined' && _angular2Angular2.AppViewManager) === 'function' && _c || Object])], IdRef);
var Attr = (function () {
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
exports.Attr = Attr;
exports.Attr = Attr = __decorate([(0, _angular2Angular2.Directive)({
    selector: '[attr]',
    inputs: ['attr']
}), __metadata('design:paramtypes', [typeof (_d = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _d || Object, typeof (_e = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _e || Object])], Attr);
var _a, _b, _c, _d, _e;