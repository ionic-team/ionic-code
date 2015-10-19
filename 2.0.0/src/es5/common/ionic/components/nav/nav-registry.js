/**
 * @private
 * Map of possible pages that can be navigated to using an Ionic NavController
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavRegistry = (function () {
    function NavRegistry() {
        var pages = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, NavRegistry);

        this._pages = new Map(pages.map(function (page) {
            return [page.name, page];
        }));
    }

    _createClass(NavRegistry, [{
        key: "get",
        value: function get(pageName) {
            return this._pages.get(pageName);
        }
    }, {
        key: "set",
        value: function set(page) {
            this._pages.set(page.name, page);
        }
    }]);

    return NavRegistry;
})();

exports.NavRegistry = NavRegistry;