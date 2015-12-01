"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _platformPlatform = require('../../platform/platform');

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
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};

var DisplayWhen = (function () {
    function DisplayWhen(conditions, platform, ngZone) {
        var _this = this;

        _classCallCheck(this, DisplayWhen);

        this.isMatch = false;
        this.platform = platform;
        if (!conditions) return;
        this.conditions = conditions.split(',');
        // check if its one of the matching platforms first
        // a platform does not change during the life of an app
        for (var i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] && platform.is(this.conditions[i])) {
                this.isMatch = true;
                return;
            }
        }
        if (this.orientation()) {
            // add window resize listener
            platform.onResize(function () {
                ngZone.run(function () {
                    _this.orientation();
                });
            });
            return;
        }
    }

    /**
     * TODO
     */

    _createClass(DisplayWhen, [{
        key: "orientation",
        value: function orientation() {
            for (var i = 0; i < this.conditions.length; i++) {
                if (this.conditions[i] == 'portrait') {
                    this.isMatch = this.platform.isPortrait();
                    return true;
                }
                if (this.conditions[i] == 'landscape') {
                    this.isMatch = this.platform.isLandscape();
                    return true;
                }
            }
        }
    }]);

    return DisplayWhen;
})();

var ShowWhen = (function (_DisplayWhen) {
    _inherits(ShowWhen, _DisplayWhen);

    function ShowWhen(showWhen, platform, ngZone) {
        _classCallCheck(this, ShowWhen);

        _get(Object.getPrototypeOf(ShowWhen.prototype), "constructor", this).call(this, showWhen, platform, ngZone);
    }

    /**
     * @private
     */

    _createClass(ShowWhen, [{
        key: "hidden",
        get: function get() {
            return !this.isMatch;
        }
    }]);

    return ShowWhen;
})(DisplayWhen);
exports.ShowWhen = ShowWhen;
exports.ShowWhen = ShowWhen = __decorate([(0, _angular2Angular2.Directive)({
    selector: '[show-when]',
    host: {
        '[hidden]': 'hidden'
    }
}), __param(0, (0, _angular2Angular2.Attribute)('show-when')), __metadata('design:paramtypes', [String, typeof (_a = typeof _platformPlatform.Platform !== 'undefined' && _platformPlatform.Platform) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.NgZone !== 'undefined' && _angular2Angular2.NgZone) === 'function' && _b || Object])], ShowWhen);
/**
 * TODO
 */
var HideWhen = (function (_DisplayWhen2) {
    _inherits(HideWhen, _DisplayWhen2);

    function HideWhen(hideWhen, platform, ngZone) {
        _classCallCheck(this, HideWhen);

        _get(Object.getPrototypeOf(HideWhen.prototype), "constructor", this).call(this, hideWhen, platform, ngZone);
    }

    /**
     * @private
     */

    _createClass(HideWhen, [{
        key: "hidden",
        get: function get() {
            return this.isMatch;
        }
    }]);

    return HideWhen;
})(DisplayWhen);
exports.HideWhen = HideWhen;
exports.HideWhen = HideWhen = __decorate([(0, _angular2Angular2.Directive)({
    selector: '[hide-when]',
    host: {
        '[hidden]': 'hidden'
    }
}), __param(0, (0, _angular2Angular2.Attribute)('hide-when')), __metadata('design:paramtypes', [String, typeof (_c = typeof _platformPlatform.Platform !== 'undefined' && _platformPlatform.Platform) === 'function' && _c || Object, typeof (_d = typeof _angular2Angular2.NgZone !== 'undefined' && _angular2Angular2.NgZone) === 'function' && _d || Object])], HideWhen);
var _a, _b, _c, _d;