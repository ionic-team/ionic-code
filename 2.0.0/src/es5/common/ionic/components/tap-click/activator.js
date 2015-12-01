'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilDom = require('../../util/dom');

var Activator = (function () {
    function Activator(app, config, zone) {
        _classCallCheck(this, Activator);

        this.app = app;
        this.zone = zone;
        this.queue = [];
        this.active = [];
        this.clearStateDefers = 5;
        this.clearAttempt = 0;
        this.activatedClass = config.get('activatedClass') || 'activated';
        this.x = 0;
        this.y = 0;
    }

    _createClass(Activator, [{
        key: 'downAction',
        value: function downAction(ev, activatableEle, pointerX, pointerY, callback) {
            // the user just pressed down
            var self = this;
            if (self.disableActivated(ev)) return false;
            // remember where they pressed
            self.x = pointerX;
            self.y = pointerY;
            // queue to have this element activated
            self.queue.push(activatableEle);
            function activateCss() {
                var activatableEle = undefined;
                for (var i = 0; i < self.queue.length; i++) {
                    activatableEle = self.queue[i];
                    if (activatableEle && activatableEle.parentNode) {
                        self.active.push(activatableEle);
                        activatableEle.classList.add(self.activatedClass);
                    }
                }
                self.queue = [];
            }
            this.zone.runOutsideAngular(function () {
                (0, _utilDom.rafFrames)(2, activateCss);
            });
            return true;
        }
    }, {
        key: 'upAction',
        value: function upAction() {
            // the user was pressing down, then just let up
            var self = this;
            function activateUp() {
                self.clearState();
            }
            this.zone.runOutsideAngular(function () {
                (0, _utilDom.rafFrames)(self.clearStateDefers, activateUp);
            });
        }
    }, {
        key: 'clearState',
        value: function clearState() {
            var _this = this;

            // all states should return to normal
            if (!this.app.isEnabled()) {
                // the app is actively disabled, so don't bother deactivating anything.
                // this makes it easier on the GPU so it doesn't have to redraw any
                // buttons during a transition. This will retry in XX milliseconds.
                setTimeout(function () {
                    _this.clearState();
                }, 600);
            } else {
                // not actively transitioning, good to deactivate any elements
                this.deactivate();
            }
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            // remove the active class from all active elements
            var self = this;
            self.queue = [];
            function deactivate() {
                for (var i = 0; i < self.active.length; i++) {
                    self.active[i].classList.remove(self.activatedClass);
                }
                self.active = [];
            }
            (0, _utilDom.rafFrames)(2, deactivate);
        }
    }, {
        key: 'disableActivated',
        value: function disableActivated(ev) {
            if (ev.defaultPrevented) return true;
            var targetEle = ev.target;
            for (var x = 0; x < 4; x++) {
                if (!targetEle) break;
                if (targetEle.hasAttribute('disable-activated')) return true;
                targetEle = targetEle.parentElement;
            }
            return false;
        }
    }]);

    return Activator;
})();

exports.Activator = Activator;