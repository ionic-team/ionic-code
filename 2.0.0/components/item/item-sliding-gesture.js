var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var drag_gesture_1 = require('../../gestures/drag-gesture');
var dom_1 = require('../../util/dom');
var ItemSlidingGesture = (function (_super) {
    __extends(ItemSlidingGesture, _super);
    function ItemSlidingGesture(list, listEle) {
        var _this = this;
        _super.call(this, listEle, {
            direction: 'x',
            threshold: DRAG_THRESHOLD
        });
        this.list = list;
        this.listEle = listEle;
        this.canDrag = true;
        this.data = {};
        this.openItems = 0;
        this.preventDrag = false;
        this.dragEnded = true;
        this.listen();
        this.onTap = function (ev) {
            if (!isFromOptionButtons(ev.target)) {
                var didClose = _this.closeOpened();
                if (didClose) {
                    void 0;
                    preventDefault(ev);
                }
            }
        };
        this.onMouseOut = function (ev) {
            if (ev.target.tagName === 'ION-ITEM-SLIDING') {
                void 0;
                _this.onDragEnd(ev);
            }
        };
    }
    ItemSlidingGesture.prototype.onDragStart = function (ev) {
        var itemContainerEle = getItemConatiner(ev.target);
        if (!itemContainerEle) {
            void 0;
            return false;
        }
        this.closeOpened(itemContainerEle);
        var openAmout = this.getOpenAmount(itemContainerEle);
        var itemData = this.get(itemContainerEle);
        this.preventDrag = (openAmout > 0);
        if (this.preventDrag) {
            this.closeOpened();
            void 0;
            preventDefault(ev);
            return;
        }
        itemContainerEle.classList.add('active-slide');
        this.set(itemContainerEle, 'offsetX', openAmout);
        this.set(itemContainerEle, 'startX', ev.center[this.direction]);
        this.dragEnded = false;
        return true;
    };
    ItemSlidingGesture.prototype.onDrag = function (ev) {
        var _this = this;
        if (this.dragEnded || this.preventDrag || Math.abs(ev.deltaY) > 30) {
            void 0;
            this.preventDrag = true;
            return;
        }
        var itemContainerEle = getItemConatiner(ev.target);
        if (!itemContainerEle || !isActive(itemContainerEle)) {
            void 0;
            return;
        }
        var itemData = this.get(itemContainerEle);
        if (!itemData.optsWidth) {
            itemData.optsWidth = getOptionsWidth(itemContainerEle);
            if (!itemData.optsWidth) {
                void 0;
                return;
            }
        }
        var x = ev.center[this.direction];
        var delta = x - itemData.startX;
        var newX = Math.max(0, itemData.offsetX - delta);
        if (newX > itemData.optsWidth) {
            // Calculate the new X position, capped at the top of the buttons
            newX = -Math.min(-itemData.optsWidth, -itemData.optsWidth + (((delta + itemData.optsWidth) * 0.4)));
        }
        if (newX > 5 && ev.srcEvent.type.indexOf('mouse') > -1 && !itemData.hasMouseOut) {
            itemContainerEle.addEventListener('mouseout', this.onMouseOut);
            itemData.hasMouseOut = true;
        }
        dom_1.raf(function () {
            if (!_this.dragEnded && !_this.preventDrag) {
                isItemActive(itemContainerEle, true);
                _this.open(itemContainerEle, newX, false);
            }
        });
    };
    ItemSlidingGesture.prototype.onDragEnd = function (ev) {
        var _this = this;
        this.preventDrag = false;
        this.dragEnded = true;
        var itemContainerEle = getItemConatiner(ev.target);
        if (!itemContainerEle || !isActive(itemContainerEle)) {
            void 0;
            return;
        }
        // If we are currently dragging, we want to snap back into place
        // The final resting point X will be the width of the exposed buttons
        var itemData = this.get(itemContainerEle);
        var restingPoint = itemData.optsWidth;
        // Check if the drag didn't clear the buttons mid-point
        // and we aren't moving fast enough to swipe open
        if (this.getOpenAmount(itemContainerEle) < (restingPoint / 2)) {
            // If we are going left but too slow, or going right, go back to resting
            if (ev.direction & Hammer.DIRECTION_RIGHT || Math.abs(ev.velocityX) < 0.3) {
                restingPoint = 0;
            }
        }
        itemContainerEle.removeEventListener('mouseout', this.onMouseOut);
        itemData.hasMouseOut = false;
        dom_1.raf(function () {
            _this.open(itemContainerEle, restingPoint, true);
        });
    };
    ItemSlidingGesture.prototype.closeOpened = function (doNotCloseEle) {
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
    };
    ItemSlidingGesture.prototype.open = function (itemContainerEle, openAmount, isFinal) {
        var _this = this;
        var slidingEle = itemContainerEle.querySelector('ion-item,[ion-item]');
        if (!slidingEle) {
            void 0;
            return;
        }
        this.set(itemContainerEle, 'openAmount', openAmount);
        clearTimeout(this.get(itemContainerEle).timerId);
        if (openAmount) {
            this.openItems++;
        }
        else {
            var timerId = setTimeout(function () {
                if (slidingEle.style[dom_1.CSS.transform] === '') {
                    isItemActive(itemContainerEle, false);
                    _this.openItems--;
                }
            }, 400);
            this.set(itemContainerEle, 'timerId', timerId);
        }
        slidingEle.style[dom_1.CSS.transition] = (isFinal ? '' : 'none');
        slidingEle.style[dom_1.CSS.transform] = (openAmount ? 'translate3d(' + -openAmount + 'px,0,0)' : '');
        if (isFinal) {
            if (openAmount) {
                isItemActive(itemContainerEle, true);
                this.on('tap', this.onTap);
            }
            else {
                this.off('tap', this.onTap);
            }
        }
    };
    ItemSlidingGesture.prototype.getOpenAmount = function (itemContainerEle) {
        return this.get(itemContainerEle).openAmount || 0;
    };
    ItemSlidingGesture.prototype.get = function (itemContainerEle) {
        return this.data[itemContainerEle && itemContainerEle.$ionSlide] || {};
    };
    ItemSlidingGesture.prototype.set = function (itemContainerEle, key, value) {
        if (!this.data[itemContainerEle.$ionSlide]) {
            this.data[itemContainerEle.$ionSlide] = {};
        }
        this.data[itemContainerEle.$ionSlide][key] = value;
    };
    ItemSlidingGesture.prototype.unlisten = function () {
        _super.prototype.unlisten.call(this);
        this.listEle = null;
    };
    return ItemSlidingGesture;
})(drag_gesture_1.DragGesture);
exports.ItemSlidingGesture = ItemSlidingGesture;
function isItemActive(ele, isActive) {
    ele.classList[isActive ? 'add' : 'remove']('active-slide');
    ele.classList[isActive ? 'add' : 'remove']('active-options');
}
function preventDefault(ev) {
    void 0;
    ev.preventDefault();
}
function getItemConatiner(ele) {
    return dom_1.closest(ele, 'ion-item-sliding', true);
}
function isFromOptionButtons(ele) {
    return !!dom_1.closest(ele, 'ion-item-options', true);
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
var DRAG_THRESHOLD = 20;
