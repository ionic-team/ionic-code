"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.isActivatable = isActivatable;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _appApp = require('../app/app');

var _configConfig = require('../../config/config');

var _utilDom = require('../../util/dom');

var _activator = require('./activator');

var _ripple = require('./ripple');

/**
 * @private
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
var TapClick = (function () {
    function TapClick(app, config, zone) {
        var _this = this;

        _classCallCheck(this, TapClick);

        this.app = app;
        this.zone = zone;
        this.lastTouch = 0;
        this.disableClick = 0;
        this.lastActivated = 0;
        if (config.get('activator') == 'ripple') {
            this.activator = new _ripple.RippleActivator(app, config, zone);
        } else if (config.get('activator') == 'highlight') {
            this.activator = new _activator.Activator(app, config, zone);
        }
        this.usePolyfill = config.get('tapPolyfill') === true;
        zone.runOutsideAngular(function () {
            addListener('click', _this.click.bind(_this), true);
            addListener('touchstart', _this.touchStart.bind(_this));
            addListener('touchend', _this.touchEnd.bind(_this));
            addListener('touchcancel', _this.pointerCancel.bind(_this));
            addListener('mousedown', _this.mouseDown.bind(_this), true);
            addListener('mouseup', _this.mouseUp.bind(_this), true);
        });
        this.pointerMove = function (ev) {
            console.log('pointerMove');
            if ((0, _utilDom.hasPointerMoved)(POINTER_MOVE_UNTIL_CANCEL, this.startCoord, (0, _utilDom.pointerCoord)(ev))) {
                this.pointerCancel(ev);
            }
        };
    }

    _createClass(TapClick, [{
        key: "touchStart",
        value: function touchStart(ev) {
            this.lastTouch = Date.now();
            this.pointerStart(ev);
        }
    }, {
        key: "touchEnd",
        value: function touchEnd(ev) {
            this.lastTouch = Date.now();
            if (this.usePolyfill && this.startCoord && this.app.isEnabled()) {
                var endCoord = (0, _utilDom.pointerCoord)(ev);
                if (!(0, _utilDom.hasPointerMoved)(POINTER_TOLERANCE, this.startCoord, endCoord)) {
                    console.debug('create click from touch');
                    // prevent native mouse click events for XX amount of time
                    this.disableClick = this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT;
                    // manually dispatch the mouse click event
                    var clickEvent = document.createEvent('MouseEvents');
                    clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, endCoord.x, endCoord.y, false, false, false, false, 0, null);
                    clickEvent.isIonicTap = true;
                    ev.target.dispatchEvent(clickEvent);
                }
            }
            this.pointerEnd(ev);
        }
    }, {
        key: "mouseDown",
        value: function mouseDown(ev) {
            if (this.isDisabledNativeClick()) {
                console.debug('mouseDown prevent', ev.target.tagName);
                // does not prevent default on purpose
                // so native blur events from inputs can happen
                ev.stopPropagation();
            } else if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
                this.pointerStart(ev);
            }
        }
    }, {
        key: "mouseUp",
        value: function mouseUp(ev) {
            if (this.isDisabledNativeClick()) {
                console.debug('mouseUp prevent', ev.target.tagName);
                ev.preventDefault();
                ev.stopPropagation();
            }
            if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
                this.pointerEnd(ev);
            }
        }
    }, {
        key: "pointerStart",
        value: function pointerStart(ev) {
            var activatableEle = getActivatableTarget(ev.target);
            if (activatableEle) {
                this.startCoord = (0, _utilDom.pointerCoord)(ev);
                var now = Date.now();
                if (this.lastActivated + 150 < now) {
                    this.activator && this.activator.downAction(ev, activatableEle, this.startCoord.x, this.startCoord.y);
                    this.lastActivated = now;
                }
                this.moveListeners(true);
            } else {
                this.startCoord = null;
            }
        }
    }, {
        key: "pointerEnd",
        value: function pointerEnd(ev) {
            this.moveListeners(false);
            this.activator && this.activator.upAction();
        }
    }, {
        key: "pointerCancel",
        value: function pointerCancel(ev) {
            console.debug('pointerCancel from', ev.type);
            this.activator && this.activator.clearState();
            this.moveListeners(false);
        }
    }, {
        key: "moveListeners",
        value: function moveListeners(shouldAdd) {
            var _this2 = this;

            removeListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
            this.zone.runOutsideAngular(function () {
                if (shouldAdd) {
                    addListener(_this2.usePolyfill ? 'touchmove' : 'mousemove', _this2.pointerMove);
                } else {}
            });
        }
    }, {
        key: "click",
        value: function click(ev) {
            var preventReason = null;
            if (!this.app.isEnabled()) {
                preventReason = 'appDisabled';
            } else if (!ev.isIonicTap && this.isDisabledNativeClick()) {
                preventReason = 'nativeClick';
            }
            if (preventReason !== null) {
                console.debug('click prevent', preventReason);
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    }, {
        key: "isDisabledNativeClick",
        value: function isDisabledNativeClick() {
            return this.disableClick > Date.now();
        }
    }]);

    return TapClick;
})();
exports.TapClick = TapClick;
exports.TapClick = TapClick = __decorate([(0, _angular2Angular2.Injectable)(), __metadata('design:paramtypes', [typeof (_a = typeof _appApp.IonicApp !== 'undefined' && _appApp.IonicApp) === 'function' && _a || Object, typeof (_b = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _b || Object, typeof (_c = typeof _angular2Angular2.NgZone !== 'undefined' && _angular2Angular2.NgZone) === 'function' && _c || Object])], TapClick);
function getActivatableTarget(ele) {
    var targetEle = ele;
    for (var x = 0; x < 4; x++) {
        if (!targetEle) break;
        if (isActivatable(targetEle)) return targetEle;
        targetEle = targetEle.parentElement;
    }
    return null;
}
/**
 * @private
 */

function isActivatable(ele) {
    if (ACTIVATABLE_ELEMENTS.test(ele.tagName)) {
        return true;
    }
    var attributes = ele.attributes;
    for (var i = 0, l = attributes.length; i < l; i++) {
        if (ACTIVATABLE_ATTRIBUTES.test(attributes[i].name)) {
            return true;
        }
    }
    return false;
}

function addListener(type, listener, useCapture) {
    document.addEventListener(type, listener, useCapture);
}
function removeListener(type, listener) {
    document.removeEventListener(type, listener);
}
var ACTIVATABLE_ELEMENTS = /^(A|BUTTON)$/;
var ACTIVATABLE_ATTRIBUTES = /tappable/;
var POINTER_TOLERANCE = 4;
var POINTER_MOVE_UNTIL_CANCEL = 10;
var DISABLE_NATIVE_CLICK_AMOUNT = 2500;
var _a, _b, _c;