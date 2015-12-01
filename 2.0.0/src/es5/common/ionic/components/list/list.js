"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _angular2Angular2 = require('angular2/angular2');

var _ion = require('../ion');

var _configConfig = require('../../config/config');

var _virtual = require('./virtual');

var _itemItemSlidingGesture = require('../item/item-sliding-gesture');

var _ionicUtil = require('ionic/util');

var util = _interopRequireWildcard(_ionicUtil);

/**
 * The List is a widely used interface element in almost any mobile app, and can include
 * content ranging from basic text all the way to buttons, toggles, icons, and thumbnails.
 *
 * Both the list, which contains items, and the list items themselves can be any HTML
 * element.
 *
 * Using the List and Item components make it easy to support various
 * interaction modes such as swipe to edit, drag to reorder, and removing items.
 *
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
var List = (function (_Ion) {
    _inherits(List, _Ion);

    function List(elementRef, config, zone) {
        _classCallCheck(this, List);

        _get(Object.getPrototypeOf(List.prototype), "constructor", this).call(this, elementRef, config);
        this.zone = zone;
        this.ele = elementRef.nativeElement;
        this._enableSliding = false;
    }

    /**
     * @private
     */

    _createClass(List, [{
        key: "onInit",
        value: function onInit() {
            _get(Object.getPrototypeOf(List.prototype), "onInit", this).call(this);
            if (util.isDefined(this.virtual)) {
                console.log('Content', this.content);
                console.log('Virtual?', this.virtual);
                console.log('Items?', this.items.length, 'of \'em');
                this._initVirtualScrolling();
            }
        }

        /**
         * @private
         */
    }, {
        key: "onDestroy",
        value: function onDestroy() {
            this.ele = null;
            this.slidingGesture && this.slidingGesture.unlisten();
        }

        /**
         * @private
         */
    }, {
        key: "_initVirtualScrolling",
        value: function _initVirtualScrolling() {
            if (!this.content) {
                return;
            }
            this._virtualScrollingManager = new _virtual.ListVirtualScroll(this);
        }

        /**
         * @private
         */
    }, {
        key: "setItemTemplate",
        value: function setItemTemplate(item) {
            this.itemTemplate = item;
        }
    }, {
        key: "enableSlidingItems",
        value: function enableSlidingItems(shouldEnable) {
            var _this = this;

            if (this._init) {
                if (this._enableSliding !== shouldEnable) {
                    this._enableSliding = shouldEnable;
                    if (shouldEnable) {
                        console.debug('enableSlidingItems');
                        this.zone.runOutsideAngular(function () {
                            setTimeout(function () {
                                _this.slidingGesture = new _itemItemSlidingGesture.ItemSlidingGesture(_this, _this.ele);
                            });
                        });
                    } else {
                        this.slidingGesture && this.slidingGesture.unlisten();
                    }
                }
            }
        }
    }, {
        key: "closeSlidingItems",
        value: function closeSlidingItems() {
            this.slidingGesture && this.slidingGesture.closeOpened();
        }

        /**
         * @private
         */
    }, {
        key: "afterViewInit",
        value: function afterViewInit() {
            this._init = true;
            if (this._enableSliding) {
                this.enableSlidingItems(true);
            }
        }
    }]);

    return List;
})(_ion.Ion);
exports.List = List;
exports.List = List = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'ion-list',
    inputs: ['items', 'virtual', 'content']
}), __metadata('design:paramtypes', [typeof (_a = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _a || Object, typeof (_b = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _b || Object, typeof (_c = typeof _angular2Angular2.NgZone !== 'undefined' && _angular2Angular2.NgZone) === 'function' && _c || Object])], List);
var ListHeader = function ListHeader() {
    _classCallCheck(this, ListHeader);
};
exports.ListHeader = ListHeader;
exports.ListHeader = ListHeader = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'ion-list-header',
    inputs: ['id'],
    host: {
        '[attr.id]': 'id'
    }
}), __metadata('design:paramtypes', [])], ListHeader);
var _a, _b, _c;