System.register('ionic/components/item/item-sliding-gesture', ['ionic/gestures/hammer', 'ionic/gestures/drag-gesture', 'ionic/util/dom'], function (_export) {
    'use strict';

    var Hammer, DragGesture, CSS, raf, closest, ItemSlidingGesture, DRAG_THRESHOLD;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function isItemActive(ele, isActive) {
        ele.classList[isActive ? 'add' : 'remove']('active-slide');
        ele.classList[isActive ? 'add' : 'remove']('active-options');
    }
    function preventDefault(ev) {
        ev.preventDefault();
    }
    function getItemConatiner(ele) {
        return closest(ele, 'ion-item-sliding', true);
    }
    function isFromOptionButtons(ele) {
        return !!closest(ele, 'ion-item-options', true);
    }
    function getOptionsWidth(itemContainerEle) {
        var optsEle = itemContainerEle.querySelector('ion-item-options');
        if (optsEle) {
            return optsEle.offsetWidth;
        }
    }
    function isActive(itemContainerEle) {
        return itemContainerEle.classList.contains('active-slide');
    }
    return {
        setters: [function (_ionicGesturesHammer) {
            Hammer = _ionicGesturesHammer.Hammer;
        }, function (_ionicGesturesDragGesture) {
            DragGesture = _ionicGesturesDragGesture.DragGesture;
        }, function (_ionicUtilDom) {
            CSS = _ionicUtilDom.CSS;
            raf = _ionicUtilDom.raf;
            closest = _ionicUtilDom.closest;
        }],
        execute: function () {
            ItemSlidingGesture = (function (_DragGesture) {
                _inherits(ItemSlidingGesture, _DragGesture);

                function ItemSlidingGesture(list, listEle) {
                    var _this = this;

                    _classCallCheck(this, ItemSlidingGesture);

                    _get(Object.getPrototypeOf(ItemSlidingGesture.prototype), 'constructor', this).call(this, listEle, {
                        direction: 'x',
                        threshold: DRAG_THRESHOLD
                    });
                    this.data = {};
                    this.openItems = 0;
                    this.list = list;
                    this.listEle = listEle;
                    this.canDrag = true;
                    this.listen();
                    this.tap = function (ev) {
                        if (!isFromOptionButtons(ev.target)) {
                            var didClose = _this.closeOpened();
                            if (didClose) {
                                preventDefault(ev);
                            }
                        }
                    };
                    this.mouseOut = function (ev) {
                        _this.onDragEnd(ev);
                    };
                }

                _createClass(ItemSlidingGesture, [{
                    key: 'onDragStart',
                    value: function onDragStart(ev) {
                        var itemContainerEle = getItemConatiner(ev.target);
                        if (!itemContainerEle) return;
                        this.closeOpened(itemContainerEle);
                        var openAmout = this.getOpenAmount(itemContainerEle);
                        var itemData = this.get(itemContainerEle);
                        this.preventDrag = openAmout > 0;
                        if (this.preventDrag) {
                            this.closeOpened();
                            return preventDefault(ev);
                        }
                        itemContainerEle.classList.add('active-slide');
                        this.set(itemContainerEle, 'offsetX', openAmout);
                        this.set(itemContainerEle, 'startX', ev.center[this.direction]);
                        if (ev.srcEvent.type.indexOf('mouse') > -1) {
                            ev.target.addEventListener('mouseout', this.mouseOut);
                        }
                        this.dragEnded = false;
                    }
                }, {
                    key: 'onDrag',
                    value: function onDrag(ev) {
                        var _this2 = this;

                        if (this.dragEnded || this.preventDrag || Math.abs(ev.deltaY) > 30) {
                            this.preventDrag = true;
                            return;
                        }
                        var itemContainerEle = getItemConatiner(ev.target);
                        if (!itemContainerEle || !isActive(itemContainerEle)) return;
                        var itemData = this.get(itemContainerEle);
                        if (!itemData.optsWidth) {
                            itemData.optsWidth = getOptionsWidth(itemContainerEle);
                            if (!itemData.optsWidth) return;
                        }
                        var x = ev.center[this.direction];
                        var delta = x - itemData.startX;
                        var newX = Math.max(0, itemData.offsetX - delta);
                        if (newX > itemData.optsWidth) {
                            // Calculate the new X position, capped at the top of the buttons
                            newX = -Math.min(-itemData.optsWidth, -itemData.optsWidth + (delta + itemData.optsWidth) * 0.4);
                        }
                        raf(function () {
                            if (!_this2.dragEnded && !_this2.preventDrag) {
                                isItemActive(itemContainerEle, true);
                                _this2.open(itemContainerEle, newX, false);
                            }
                        });
                    }
                }, {
                    key: 'onDragEnd',
                    value: function onDragEnd(ev) {
                        var _this3 = this;

                        this.preventDrag = false;
                        this.dragEnded = true;
                        var itemContainerEle = getItemConatiner(ev.target);
                        if (!itemContainerEle || !isActive(itemContainerEle)) return;
                        // If we are currently dragging, we want to snap back into place
                        // The final resting point X will be the width of the exposed buttons
                        var itemData = this.get(itemContainerEle);
                        var restingPoint = itemData.optsWidth;
                        // Check if the drag didn't clear the buttons mid-point
                        // and we aren't moving fast enough to swipe open
                        if (this.getOpenAmount(itemContainerEle) < restingPoint / 2) {
                            // If we are going left but too slow, or going right, go back to resting
                            if (ev.direction & Hammer.DIRECTION_RIGHT || Math.abs(ev.velocityX) < 0.3) {
                                restingPoint = 0;
                            }
                        }
                        ev.target.removeEventListener('mouseout', this.mouseOut);
                        raf(function () {
                            _this3.open(itemContainerEle, restingPoint, true);
                        });
                    }
                }, {
                    key: 'closeOpened',
                    value: function closeOpened(doNotCloseEle) {
                        var didClose = false;
                        if (this.openItems) {
                            var openItemElements = this.listEle.querySelectorAll('.active-slide');
                            for (var i = 0; i < openItemElements.length; i++) {
                                if (openItemElements[i] !== doNotCloseEle) {
                                    this.open(openItemElements[i], 0, true);
                                    didClose = true;
                                }
                            }
                        }
                        return didClose;
                    }
                }, {
                    key: 'open',
                    value: function open(itemContainerEle, openAmount, isFinal) {
                        var _this4 = this;

                        var slidingEle = itemContainerEle.querySelector('ion-item,[ion-item]');
                        if (!slidingEle) return;
                        this.set(itemContainerEle, 'openAmount', openAmount);
                        clearTimeout(this.get(itemContainerEle).timerId);
                        if (openAmount) {
                            this.openItems++;
                        } else {
                            var timerId = setTimeout(function () {
                                if (slidingEle.style[CSS.transform] === '') {
                                    isItemActive(itemContainerEle, false);
                                    _this4.openItems--;
                                }
                            }, 400);
                            this.set(itemContainerEle, 'timerId', timerId);
                        }
                        slidingEle.style[CSS.transition] = isFinal ? '' : 'none';
                        slidingEle.style[CSS.transform] = openAmount ? 'translate3d(' + -openAmount + 'px,0,0)' : '';
                        if (isFinal) {
                            if (openAmount) {
                                isItemActive(itemContainerEle, true);
                                this.on('tap', this.tap);
                            } else {
                                this.off('tap', this.tap);
                            }
                            this.enableScroll(!openAmount);
                        }
                    }
                }, {
                    key: 'getOpenAmount',
                    value: function getOpenAmount(itemContainerEle) {
                        return this.get(itemContainerEle).openAmount || 0;
                    }
                }, {
                    key: 'get',
                    value: function get(itemContainerEle) {
                        return this.data[itemContainerEle && itemContainerEle.$ionSlide] || {};
                    }
                }, {
                    key: 'set',
                    value: function set(itemContainerEle, key, value) {
                        if (!this.data[itemContainerEle.$ionSlide]) {
                            this.data[itemContainerEle.$ionSlide] = {};
                        }
                        this.data[itemContainerEle.$ionSlide][key] = value;
                    }
                }, {
                    key: 'enableScroll',
                    value: function enableScroll(shouldEnable) {
                        var scrollContentEle = closest(this.listEle, 'scroll-content');
                        if (scrollContentEle) {
                            scrollContentEle[shouldEnable ? 'removeEventListener' : 'addEventListener']('touchstart', preventDefault);
                        }
                    }
                }, {
                    key: 'unlisten',
                    value: function unlisten() {
                        _get(Object.getPrototypeOf(ItemSlidingGesture.prototype), 'unlisten', this).call(this);
                        this.listEle = null;
                    }
                }]);

                return ItemSlidingGesture;
            })(DragGesture);

            _export('ItemSlidingGesture', ItemSlidingGesture);

            DRAG_THRESHOLD = 20;
        }
    };
});