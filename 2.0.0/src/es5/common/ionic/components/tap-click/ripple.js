'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _activator = require('./activator');

var _animationsAnimation = require('../../animations/animation');

var _utilDom = require('../../util/dom');

var RippleActivator = (function (_Activator) {
    _inherits(RippleActivator, _Activator);

    function RippleActivator(app, config, zone) {
        _classCallCheck(this, RippleActivator);

        _get(Object.getPrototypeOf(RippleActivator.prototype), 'constructor', this).call(this, app, config, zone);
        this.expands = {};
        this.fades = {};
        this.expandSpeed = null;
    }

    _createClass(RippleActivator, [{
        key: 'downAction',
        value: function downAction(ev, activatableEle, pointerX, pointerY) {
            var _this = this;

            if (_get(Object.getPrototypeOf(RippleActivator.prototype), 'downAction', this).call(this, ev, activatableEle, pointerX, pointerY)) {
                // create a new ripple element
                this.expandSpeed = EXPAND_DOWN_PLAYBACK_RATE;
                this.zone.runOutsideAngular(function () {
                    (0, _utilDom.raf)(function () {
                        var clientRect = activatableEle.getBoundingClientRect();
                        (0, _utilDom.raf)(function () {
                            _this.createRipple(activatableEle, pointerX, pointerY, clientRect);
                        });
                    });
                });
            }
        }
    }, {
        key: 'createRipple',
        value: function createRipple(activatableEle, pointerX, pointerY, clientRect) {
            var _this2 = this;

            var clientPointerX = pointerX - clientRect.left;
            var clientPointerY = pointerY - clientRect.top;
            var x = Math.max(Math.abs(clientRect.width - clientPointerX), clientPointerX) * 2;
            var y = Math.max(Math.abs(clientRect.height - clientPointerY), clientPointerY) * 2;
            var diameter = Math.max(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), 64);
            var radius = Math.sqrt(clientRect.width + clientRect.height);
            var duration = 1000 * Math.sqrt(radius / TOUCH_DOWN_ACCEL) + 0.5;
            var rippleEle = document.createElement('md-ripple');
            var rippleId = Date.now();
            var eleStyle = rippleEle.style;
            eleStyle.width = eleStyle.height = diameter + 'px';
            eleStyle.marginTop = eleStyle.marginLeft = -(diameter / 2) + 'px';
            eleStyle.left = clientPointerX + 'px';
            eleStyle.top = clientPointerY + 'px';
            activatableEle.appendChild(rippleEle);
            // create the animation for the fade out, but don't start it yet
            this.fades[rippleId] = new _animationsAnimation.Animation(rippleEle, { renderDelay: 0 });
            this.fades[rippleId].fadeOut().duration(FADE_OUT_DURATION).playbackRate(1).onFinish(function () {
                (0, _utilDom.raf)(function () {
                    _this2.fades[rippleId].dispose(true);
                    delete _this2.fades[rippleId];
                });
            });
            // expand the circle from the users starting point
            // start slow, and when they let up, then speed up the animation
            this.expands[rippleId] = new _animationsAnimation.Animation(rippleEle, { renderDelay: 0 });
            this.expands[rippleId].fromTo('scale', '0.001', '1').duration(duration).playbackRate(this.expandSpeed).onFinish(function () {
                _this2.expands[rippleId].dispose();
                delete _this2.expands[rippleId];
                _this2.next();
            }).play();
        }
    }, {
        key: 'upAction',
        value: function upAction() {
            var _this3 = this;

            this.deactivate();
            this.expandSpeed = 1;
            this.zone.runOutsideAngular(function () {
                (0, _utilDom.rafFrames)(4, function () {
                    _this3.next();
                });
            });
        }
    }, {
        key: 'next',
        value: function next() {
            var now = Date.now();
            var rippleId = undefined;
            for (rippleId in this.expands) {
                if (parseInt(rippleId, 10) + 4000 < now) {
                    this.expands[rippleId].dispose(true);
                    delete this.expands[rippleId];
                } else if (this.expands[rippleId].playbackRate() === EXPAND_DOWN_PLAYBACK_RATE) {
                    this.expands[rippleId].playbackRate(EXPAND_OUT_PLAYBACK_RATE);
                }
            }
            for (rippleId in this.fades) {
                if (parseInt(rippleId, 10) + 4000 < now) {
                    this.fades[rippleId].dispose(true);
                    delete this.fades[rippleId];
                } else if (!this.fades[rippleId].isPlaying) {
                    this.fades[rippleId].isPlaying = true;
                    this.fades[rippleId].play();
                }
            }
        }
    }, {
        key: 'clearState',
        value: function clearState() {
            this.deactivate();
            this.next();
        }
    }]);

    return RippleActivator;
})(_activator.Activator);

exports.RippleActivator = RippleActivator;

var TOUCH_DOWN_ACCEL = 512;
var EXPAND_DOWN_PLAYBACK_RATE = 0.35;
var EXPAND_OUT_PLAYBACK_RATE = 3;
var FADE_OUT_DURATION = 700;