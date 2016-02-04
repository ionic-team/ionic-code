var util_1 = require('../util');
var hammer_1 = require('./hammer');
/**
 * A gesture recognizer class.
 *
 * TODO(mlynch): Re-enable the DOM event simulation that was causing issues (or verify hammer does this already, it might);
 */
var Gesture = (function () {
    function Gesture(element, opts) {
        if (opts === void 0) { opts = {}; }
        this._callbacks = {};
        util_1.defaults(opts, {
            domEvents: true
        });
        this.element = element;
        // Map 'x' or 'y' string to hammerjs opts
        this.direction = opts.direction || 'x';
        opts.direction = this.direction === 'x' ?
            hammer_1.DIRECTION_HORIZONTAL :
            hammer_1.DIRECTION_VERTICAL;
        this._options = opts;
    }
    Gesture.prototype.options = function (opts) {
        if (opts === void 0) { opts = {}; }
        util_1.assign(this._options, opts);
    };
    Gesture.prototype.on = function (type, cb) {
        if (type == 'pinch' || type == 'rotate') {
            this._hammer.get('pinch').set({ enable: true });
        }
        this._hammer.on(type, cb);
        (this._callbacks[type] || (this._callbacks[type] = [])).push(cb);
    };
    Gesture.prototype.off = function (type, cb) {
        this._hammer.off(type, this._callbacks[type] ? cb : null);
    };
    Gesture.prototype.listen = function () {
        this._hammer = hammer_1.Hammer(this.element, this._options);
    };
    Gesture.prototype.unlisten = function () {
        if (this._hammer) {
            for (var type in this._callbacks) {
                for (var i = 0; i < this._callbacks[type].length; i++) {
                    this._hammer.off(type, this._callbacks[type]);
                }
            }
            this._hammer.destroy();
            this._hammer = null;
            this._callbacks = {};
        }
    };
    Gesture.prototype.destroy = function () {
        this.unlisten();
    };
    return Gesture;
})();
exports.Gesture = Gesture;
