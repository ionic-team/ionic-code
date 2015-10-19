"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _appApp = require('../app/app');

var _configConfig = require('../../config/config');

var _utilDom = require('../../util/dom');

var _activator = require('./activator');

var _ripple = require('./ripple');

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
    function TapClick(app, config) {
        _classCallCheck(this, TapClick);

        var self = this;
        self.app = app;
        self.pointerTolerance = 4;
        self.lastTouch = 0;
        self.lastActivated = 0;
        self.disableClick = 0;
        self.disableClickLimit = 1000;
        if (config.get('mdRipple')) {
            self.activator = new _ripple.RippleActivator(app, config);
        } else {
            self.activator = new _activator.Activator(app, config);
        }
        self.enable(config.get('tapPolyfill') !== false);
        function bindDom(type, listener, useCapture) {
            document.addEventListener(type, listener, useCapture);
        }
        bindDom('click', function (ev) {
            self.click(ev);
        }, true);
        bindDom('touchstart', function (ev) {
            self.lastTouch = Date.now();
            self.pointerStart(ev);
        });
        bindDom('touchend', function (ev) {
            self.lastTouch = Date.now();
            self.touchEnd(ev);
        });
        bindDom('touchcancel', function (ev) {
            self.lastTouch = Date.now();
            self.pointerCancel(ev);
        });
        bindDom('mousedown', function (ev) {
            self.mouseDown(ev);
        }, true);
        bindDom('mouseup', function (ev) {
            self.mouseUp(ev);
        }, true);
        self.pointerMove = function (ev) {
            var moveCoord = (0, _utilDom.pointerCoord)(ev);
            if ((0, _utilDom.hasPointerMoved)(10, self.start, moveCoord)) {
                self.pointerCancel(ev);
            }
        };
        self.moveListeners = function (shouldAdd) {
            document.removeEventListener('touchmove', self.pointerMove);
            document.removeEventListener('mousemove', self.pointerMove);
            if (shouldAdd) {
                bindDom('touchmove', self.pointerMove);
                bindDom('mousemove', self.pointerMove);
            }
        };
    }

    _createClass(TapClick, [{
        key: "enable",
        value: function enable(shouldEnable) {
            this._enabled = shouldEnable;
        }

        /**
         * TODO
         * @param {TODO} ev  TODO
         */
    }, {
        key: "touchEnd",
        value: function touchEnd(ev) {
            var self = this;
            if (self._enabled && self.start && self.app.isEnabled()) {
                var endCoord = (0, _utilDom.pointerCoord)(ev);
                if (!(0, _utilDom.hasPointerMoved)(self.pointerTolerance, self.start, endCoord)) {
                    console.debug('create click');
                    self.disableClick = Date.now();
                    var clickEvent = document.createEvent('MouseEvents');
                    clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, endCoord.x, endCoord.y, false, false, false, false, 0, null);
                    clickEvent.isIonicTap = true;
                    ev.target.dispatchEvent(clickEvent);
                }
            }
            self.pointerEnd(ev);
        }

        /**
         * TODO
         * @param {TODO} ev  TODO
         */
    }, {
        key: "mouseDown",
        value: function mouseDown(ev) {
            if (this.isDisabledClick()) {
                console.debug('mouseDown prevent');
                ev.preventDefault();
                ev.stopPropagation();
            } else if (this.lastTouch + 999 < Date.now()) {
                this.pointerStart(ev);
            }
        }

        /**
         * TODO
         * @param {TODO} ev  TODO
         */
    }, {
        key: "mouseUp",
        value: function mouseUp(ev) {
            if (this.isDisabledClick()) {
                console.debug('mouseUp prevent');
                ev.preventDefault();
                ev.stopPropagation();
            }
            if (this.lastTouch + 999 < Date.now()) {
                this.pointerEnd(ev);
            }
        }

        /**
         * TODO
         * @param {TODO} ev  TODO
         */
    }, {
        key: "pointerStart",
        value: function pointerStart(ev) {
            var activatableEle = this.getActivatableTarget(ev.target);
            if (activatableEle) {
                this.start = (0, _utilDom.pointerCoord)(ev);
                var now = Date.now();
                if (this.lastActivated + 100 < now) {
                    this.activator.downAction(ev, activatableEle, this.start.x, this.start.y);
                    this.lastActivated = now;
                }
                this.moveListeners(true);
            } else {
                this.start = null;
            }
        }

        /**
         * TODO
         */
    }, {
        key: "pointerEnd",
        value: function pointerEnd(ev) {
            this.activator.upAction();
            this.moveListeners(false);
        }

        /**
         * TODO
         */
    }, {
        key: "pointerCancel",
        value: function pointerCancel(ev) {
            console.debug('pointerCancel');
            this.activator.clearState();
            this.moveListeners(false);
            this.disableClick = Date.now();
        }
    }, {
        key: "isDisabledClick",
        value: function isDisabledClick() {
            return this.disableClick + this.disableClickLimit > Date.now();
        }

        /**
         * Whether the supplied click event should be allowed or not.
         * @param {MouseEvent} ev  The click event.
         * @return {boolean} True if click event should be allowed, otherwise false.
         */
    }, {
        key: "allowClick",
        value: function allowClick(ev) {
            if (!this.app.isEnabled()) {
                return false;
            }
            if (!ev.isIonicTap) {
                if (this.isDisabledClick()) {
                    return false;
                }
            }
            return true;
        }

        /**
         * TODO
         * @param {MouseEvent} ev  TODO
         */
    }, {
        key: "click",
        value: function click(ev) {
            if (!this.allowClick(ev)) {
                console.debug('click prevent');
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    }, {
        key: "getActivatableTarget",
        value: function getActivatableTarget(ele) {
            var targetEle = ele;
            for (var x = 0; x < 4; x++) {
                if (!targetEle) break;
                if (this.isActivatable(targetEle)) return targetEle;
                targetEle = targetEle.parentElement;
            }
            return null;
        }
    }, {
        key: "isActivatable",
        value: function isActivatable(ele) {
            if (/^(A|BUTTON)$/.test(ele.tagName)) {
                return true;
            }
            var attributes = ele.attributes;
            for (var i = 0, l = attributes.length; i < l; i++) {
                if (/click|tappable/.test(attributes[i].name)) {
                    return true;
                }
            }
            return false;
        }
    }]);

    return TapClick;
})();
exports.TapClick = TapClick;
exports.TapClick = TapClick = __decorate([(0, _angular2Angular2.Injectable)(), __metadata('design:paramtypes', [typeof (_a = typeof _appApp.IonicApp !== 'undefined' && _appApp.IonicApp) === 'function' && _a || Object, typeof (_b = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _b || Object])], TapClick);
var _a, _b;