var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var config_1 = require('../../config/config');
var click_block_1 = require('../../util/click-block');
var dom_1 = require('../../util/dom');
/**
 * @private
 * Component registry service.  For more information on registering
 * components see the [IdRef API reference](../id/IdRef/).
 */
var IonicApp = (function () {
    function IonicApp(config, clickBlock, zone) {
        this._config = config;
        this._zone = zone;
        this._titleSrv = new browser_1.Title();
        this._title = '';
        this._disTime = 0;
        this._clickBlock = clickBlock;
        // Our component registry map
        this.components = {};
    }
    /**
     * @private
     * Sets the document title.
     * @param {string} val  Value to set the document title to.
     */
    IonicApp.prototype.setTitle = function (val) {
        var self = this;
        if (val !== self._title) {
            self._title = val;
            this._zone.runOutsideAngular(function () {
                function setAppTitle() {
                    self._titleSrv.setTitle(self._title);
                }
                dom_1.rafFrames(4, setAppTitle);
            });
        }
    };
    /**
     * @private
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
    IonicApp.prototype.setEnabled = function (isEnabled, duration) {
        if (duration === void 0) { duration = 700; }
        this._disTime = (isEnabled ? 0 : Date.now() + duration);
        if (duration > 32 || isEnabled) {
            // only do a click block if the duration is longer than XXms
            this._clickBlock.show(!isEnabled, duration + 64);
        }
    };
    /**
     * @private
     * Boolean if the app is actively enabled or not.
     * @return {bool}
     */
    IonicApp.prototype.isEnabled = function () {
        return (this._disTime < Date.now());
    };
    /**
     * @private
     * Register a known component with a key, for easy lookups later.
     * @param {TODO} id  The id to use to register the component
     * @param {TODO} component  The component to register
     */
    IonicApp.prototype.register = function (id, component) {
        if (this.components[id] && this.components[id] !== component) {
        }
        this.components[id] = component;
    };
    /**
     * @private
     * Unregister a known component with a key.
     * @param {TODO} id  The id to use to unregister
     */
    IonicApp.prototype.unregister = function (id) {
        delete this.components[id];
    };
    /**
     * @private
     * Get a registered component with the given type (returns the first)
     * @param {Object} cls the type to search for
     * @return the matching component, or undefined if none was found
     */
    IonicApp.prototype.getRegisteredComponent = function (cls) {
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            if (component instanceof cls) {
                return component;
            }
        }
    };
    /**
     * @private
     * Get the component for the given key.
     * @param {TODO} key  TODO
     * @return {TODO} TODO
     */
    IonicApp.prototype.getComponent = function (id) {
        return this.components[id];
    };
    IonicApp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof click_block_1.ClickBlock !== 'undefined' && click_block_1.ClickBlock) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
    ], IonicApp);
    return IonicApp;
    var _a, _b, _c;
})();
exports.IonicApp = IonicApp;