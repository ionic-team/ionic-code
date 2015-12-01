System.register('ionic/components/menu/menu-gestures', ['../../gestures/slide-edge-gesture', 'ionic/util'], function (_export) {
    'use strict';

    var SlideEdgeGesture, util, MenuContentGesture, TargetGesture, LeftMenuGesture, RightMenuGesture;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_gesturesSlideEdgeGesture) {
            SlideEdgeGesture = _gesturesSlideEdgeGesture.SlideEdgeGesture;
        }, function (_ionicUtil) {
            util = _ionicUtil;
        }],
        execute: function () {
            MenuContentGesture = (function (_SlideEdgeGesture) {
                _inherits(MenuContentGesture, _SlideEdgeGesture);

                function MenuContentGesture(menu, targetEl) {
                    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                    _classCallCheck(this, MenuContentGesture);

                    _get(Object.getPrototypeOf(MenuContentGesture.prototype), 'constructor', this).call(this, targetEl, util.extend({
                        direction: menu.side === 'left' || menu.side === 'right' ? 'x' : 'y',
                        edge: menu.side,
                        threshold: 75
                    }, options));
                    this.menu = menu;
                    this.listen();
                }

                /**
                 * Support dragging the target menu as well as the content.
                 */

                _createClass(MenuContentGesture, [{
                    key: 'canStart',
                    value: function canStart(ev) {
                        return this.menu.isOpen && this.menu.isEnabled ? true : _get(Object.getPrototypeOf(MenuContentGesture.prototype), 'canStart', this).call(this, ev);
                    }

                    // Set CSS, then wait one frame for it to apply before sliding starts
                }, {
                    key: 'onSlideBeforeStart',
                    value: function onSlideBeforeStart(slide, ev) {
                        this.menu.setProgressStart();
                    }
                }, {
                    key: 'onSlide',
                    value: function onSlide(slide, ev) {
                        this.menu.setProgess(slide.distance / slide.max);
                    }
                }, {
                    key: 'onSlideEnd',
                    value: function onSlideEnd(slide, ev) {
                        var shouldComplete = Math.abs(ev.velocityX) > 0.2 || Math.abs(slide.delta) > Math.abs(slide.max) * 0.5;
                        this.menu.setProgressEnd(shouldComplete);
                    }
                }, {
                    key: 'getElementStartPos',
                    value: function getElementStartPos(slide, ev) {
                        return this.menu.isOpen ? slide.max : slide.min;
                    }
                }, {
                    key: 'getSlideBoundaries',
                    value: function getSlideBoundaries() {
                        return {
                            min: 0,
                            max: this.menu.width()
                        };
                    }
                }]);

                return MenuContentGesture;
            })(SlideEdgeGesture);

            TargetGesture = (function (_MenuContentGesture) {
                _inherits(TargetGesture, _MenuContentGesture);

                function TargetGesture(menu) {
                    _classCallCheck(this, TargetGesture);

                    _get(Object.getPrototypeOf(TargetGesture.prototype), 'constructor', this).call(this, menu, menu.getNativeElement(), {
                        threshold: 0
                    });
                }

                return TargetGesture;
            })(MenuContentGesture);

            _export('TargetGesture', TargetGesture);

            LeftMenuGesture = (function (_MenuContentGesture2) {
                _inherits(LeftMenuGesture, _MenuContentGesture2);

                function LeftMenuGesture(menu) {
                    _classCallCheck(this, LeftMenuGesture);

                    _get(Object.getPrototypeOf(LeftMenuGesture.prototype), 'constructor', this).call(this, menu, menu.getContentElement());
                }

                return LeftMenuGesture;
            })(MenuContentGesture);

            _export('LeftMenuGesture', LeftMenuGesture);

            RightMenuGesture = (function (_MenuContentGesture3) {
                _inherits(RightMenuGesture, _MenuContentGesture3);

                function RightMenuGesture(menu) {
                    _classCallCheck(this, RightMenuGesture);

                    _get(Object.getPrototypeOf(RightMenuGesture.prototype), 'constructor', this).call(this, menu, menu.getContentElement());
                }

                _createClass(RightMenuGesture, [{
                    key: 'onSlide',
                    value: function onSlide(slide, ev) {
                        this.menu.setProgess(slide.distance / slide.min);
                    }
                }, {
                    key: 'getElementStartPos',
                    value: function getElementStartPos(slide, ev) {
                        return this.menu.isOpen ? slide.min : slide.max;
                    }
                }, {
                    key: 'getSlideBoundaries',
                    value: function getSlideBoundaries() {
                        return {
                            min: -this.menu.width(),
                            max: 0
                        };
                    }
                }]);

                return RightMenuGesture;
            })(MenuContentGesture);

            _export('RightMenuGesture', RightMenuGesture);
        }
    };
});