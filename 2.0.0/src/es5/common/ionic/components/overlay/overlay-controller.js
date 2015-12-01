'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ionicUtil = require('ionic/util');

/**
 * @private
 */

var OverlayController = (function () {
    function OverlayController() {
        _classCallCheck(this, OverlayController);
    }

    _createClass(OverlayController, [{
        key: 'open',
        value: function open(componentType) {
            var _this = this;

            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            if (!this.nav) {
                console.error('<ion-overlay></ion-overlay> required in root template (app.html) to use: ' + overlayType);
                return Promise.reject();
            }
            var resolve = undefined,
                reject = undefined;
            var promise = new Promise(function (res, rej) {
                resolve = res;reject = rej;
            });
            opts.animation = opts.enterAnimation;
            opts.animateFirst = true;
            this.nav.push(componentType, params, opts).then(function (viewCtrl) {
                if (viewCtrl && viewCtrl.instance) {
                    (function () {
                        var escape = function escape(ev) {
                            if (ev.keyCode == 27 && self.nav.last() === viewCtrl) {
                                viewCtrl.instance.close();
                            }
                        };

                        var self = _this;

                        viewCtrl.instance.close = function (data) {
                            var closeOpts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                            (0, _ionicUtil.extend)(opts, closeOpts);
                            opts.animation = opts.leaveAnimation;
                            viewCtrl.instance.onClose && viewCtrl.instance.onClose(data);
                            _this.nav.pop(opts);
                            document.removeEventListener('keyup', escape, true);
                        };
                        document.addEventListener('keyup', escape, true);
                        resolve(viewCtrl.instance);
                    })();
                } else {
                    reject();
                }
            });
            return promise;
        }
    }, {
        key: 'getByType',
        value: function getByType(overlayType) {
            var overlay = this.nav.getByType(overlayType);
            return overlay && overlay.instance;
        }
    }, {
        key: 'getByHandle',
        value: function getByHandle(handle, overlayType) {
            var overlay = this.nav.getByHandle(handle);
            return overlay && overlay.instance;
        }
    }]);

    return OverlayController;
})();

exports.OverlayController = OverlayController;