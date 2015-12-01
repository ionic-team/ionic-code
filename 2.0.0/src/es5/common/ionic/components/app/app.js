"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _configConfig = require('../../config/config');

var _utilClickBlock = require('../../util/click-block');

var _utilDom = require('../../util/dom');

/**
 * Component registry service.  For more information on registering
 * components see the [IdRef API reference](../id/IdRef/).
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
var IonicApp = (function () {
    function IonicApp(config, clickBlock, zone) {
        _classCallCheck(this, IonicApp);

        this._config = config;
        this._zone = zone;
        this._titleSrv = new _angular2Angular2.Title();
        this._title = '';
        this._disTime = 0;
        this._clickBlock = clickBlock;
        // Our component registry map
        this.components = {};
    }

    /**
     * Sets the document title.
     * @param {string} val  Value to set the document title to.
     */

    _createClass(IonicApp, [{
        key: "setTitle",
        value: function setTitle(val) {
            var self = this;
            if (val !== self._title) {
                self._title = val;
                this._zone.runOutsideAngular(function () {
                    function setAppTitle() {
                        self._titleSrv.setTitle(self._title);
                    }
                    (0, _utilDom.rafFrames)(4, setAppTitle);
                });
            }
        }

        /**
         * Sets if the app is currently enabled or not, meaning if it's
         * available to accept new user commands. For example, this is set to `false`
         * while views transition, a modal slides up, an action-sheet
         * slides up, etc. After the transition completes it is set back to `true`.
         * @param {bool} isEnabled
         * @param {bool} fallback  When `isEnabled` is set to `false`, this argument
         * is used to set the maximum number of milliseconds that app will wait until
         * it will automatically enable the app again. It's basically a fallback incase
         * something goes wrong during a transition and the app wasn't re-enabled correctly.
         */
    }, {
        key: "setEnabled",
        value: function setEnabled(isEnabled) {
            var fallback = arguments.length <= 1 || arguments[1] === undefined ? 700 : arguments[1];

            this._disTime = isEnabled ? 0 : Date.now() + fallback;
            this._clickBlock.show(!isEnabled, fallback + 100);
        }

        /**
         * Boolean if the app is actively enabled or not.
         * @return {bool}
         */
    }, {
        key: "isEnabled",
        value: function isEnabled() {
            return this._disTime < Date.now();
        }

        /**
         * Register a known component with a key, for easy lookups later.
         * @param {TODO} id  The id to use to register the component
         * @param {TODO} component  The component to register
         */
    }, {
        key: "register",
        value: function register(id, component) {
            if (this.components[id] && this.components[id] !== component) {}
            this.components[id] = component;
        }

        /**
         * Unregister a known component with a key.
         * @param {TODO} id  The id to use to unregister
         */
    }, {
        key: "unregister",
        value: function unregister(id) {
            delete this.components[id];
        }

        /**
         * Get a registered component with the given type (returns the first)
         * @param {Object} cls the type to search for
         * @return the matching component, or undefined if none was found
         */
    }, {
        key: "getRegisteredComponent",
        value: function getRegisteredComponent(cls) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var component = _step.value;

                    if (component instanceof cls) {
                        return component;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Get the component for the given key.
         * @param {TODO} key  TODO
         * @return {TODO} TODO
         */
    }, {
        key: "getComponent",
        value: function getComponent(id) {
            return this.components[id];
        }
    }]);

    return IonicApp;
})();
exports.IonicApp = IonicApp;
exports.IonicApp = IonicApp = __decorate([(0, _angular2Angular2.Injectable)(), __metadata('design:paramtypes', [typeof (_a = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _a || Object, typeof (_b = typeof _utilClickBlock.ClickBlock !== 'undefined' && _utilClickBlock.ClickBlock) === 'function' && _b || Object, typeof (_c = typeof _angular2Angular2.NgZone !== 'undefined' && _angular2Angular2.NgZone) === 'function' && _c || Object])], IonicApp);
var _a, _b, _c;