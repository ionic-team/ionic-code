"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

var _navNavController = require('../nav/nav-controller');

var _configConfig = require('../../config/config');

var _utilForm = require('../../util/form');

var _appApp = require('../app/app');

var _contentContent = require('../content/content');

var _utilDom = require('../../util/dom');

var dom = _interopRequireWildcard(_utilDom);

var _platformPlatform = require('../../platform/platform');

/**
 * TODO
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
var __param = undefined && undefined.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
var _TextInput = (function () {
    function TextInput(form, elementRef, config, renderer, app, platform, scrollView, navCtrl) {
        _classCallCheck(this, TextInput);

        this.renderer = renderer;
        this.form = form;
        form.register(this);
        this.type = 'text';
        this.lastTouch = 0;
        this.app = app;
        this.elementRef = elementRef;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.scrollView = scrollView;
        this.scrollAssist = config.get('scrollAssist');
        this.keyboardHeight = config.get('keyboardHeight');
    }

    /**
     * @private
     */

    _createClass(TextInput, [{
        key: "registerInput",
        value: function registerInput(textInputElement) {
            this.input = textInputElement;
            this.type = textInputElement.type || 'text';
        }

        /**
         * @private
         */
    }, {
        key: "registerLabel",
        value: function registerLabel(label) {
            this.label = label;
        }

        /**
         * @private
         */
    }, {
        key: "onInit",
        value: function onInit() {
            var _this = this;

            if (this.input && this.label) {
                // if there is an input and an label
                // then give the label an ID
                // and tell the input the ID of who it's labelled by
                this.input.labelledBy(this.label.id);
            }
            var self = this;
            self.scrollMove = function (ev) {
                if (!(_this.navCtrl && _this.navCtrl.isTransitioning())) {
                    self.deregMove();
                    if (self.hasFocus) {
                        self.input.hideFocus(true);
                        _this.scrollView.onScrollEnd(function () {
                            self.input.hideFocus(false);
                            if (self.hasFocus) {
                                self.regMove();
                            }
                        });
                    }
                }
            };
        }

        /**
         * @private
         */
    }, {
        key: "pointerStart",
        value: function pointerStart(ev) {
            if (this.scrollAssist && this.app.isEnabled()) {
                // remember where the touchstart/mousedown started
                this.startCoord = dom.pointerCoord(ev);
            }
        }

        /**
         * @private
         */
    }, {
        key: "pointerEnd",
        value: function pointerEnd(ev) {
            if (!this.app.isEnabled()) {
                ev.preventDefault();
                ev.stopPropagation();
            } else if (this.scrollAssist && ev.type === 'touchend') {
                // get where the touchend/mouseup ended
                var endCoord = dom.pointerCoord(ev);
                // focus this input if the pointer hasn't moved XX pixels
                // and the input doesn't already have focus
                if (!dom.hasPointerMoved(8, this.startCoord, endCoord) && !this.hasFocus) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this.initFocus();
                    // temporarily prevent mouseup's from focusing
                    this.lastTouch = Date.now();
                }
            } else if (this.lastTouch + 999 < Date.now()) {
                ev.preventDefault();
                ev.stopPropagation();
                this.setFocus();
                this.regMove();
            }
        }

        /**
         * @private
         */
    }, {
        key: "initFocus",
        value: function initFocus() {
            var _this2 = this;

            // begin the process of setting focus to the inner input element
            var scrollView = this.scrollView;
            if (scrollView && this.scrollAssist) {
                // this input is inside of a scroll view
                // find out if text input should be manually scrolled into view
                var ele = this.elementRef.nativeElement;
                var scrollData = _TextInput.getScrollData(ele.offsetTop, ele.offsetHeight, scrollView.getDimensions(), this.keyboardHeight, this.platform.height());
                if (scrollData.scrollAmount > -3 && scrollData.scrollAmount < 3) {
                    // the text input is in a safe position that doesn't require
                    // it to be scrolled into view, just set focus now
                    this.setFocus();
                    this.regMove();
                    return;
                }
                // add padding to the bottom of the scroll view (if needed)
                scrollView.addScrollPadding(scrollData.scrollPadding);
                // manually scroll the text input to the top
                // do not allow any clicks while it's scrolling
                var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
                this.app.setEnabled(false, scrollDuration);
                this.navCtrl && this.navCtrl.setTransitioning(true, scrollDuration);
                // temporarily move the focus to the focus holder so the browser
                // doesn't freak out while it's trying to get the input in place
                // at this point the native text input still does not have focus
                this.input.relocate(true, scrollData.inputSafeY);
                // scroll the input into place
                scrollView.scrollTo(0, scrollData.scrollTo, scrollDuration).then(function () {
                    // the scroll view is in the correct position now
                    // give the native text input focus
                    _this2.input.relocate(false);
                    // all good, allow clicks again
                    _this2.app.setEnabled(true);
                    _this2.navCtrl && _this2.navCtrl.setTransitioning(false);
                    _this2.regMove();
                });
            } else {
                // not inside of a scroll view, just focus it
                this.setFocus();
                this.regMove();
            }
        }

        /**
         * @private
         * @param {TODO} inputOffsetTop  TODO
         * @param {TODO} inputOffsetHeight  TODO
         * @param {TODO} scrollViewDimensions  TODO
         * @param {TODO} keyboardHeight  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: "focusChange",

        /**
         * @private
         */
        value: function focusChange(hasFocus) {
            this.renderer.setElementClass(this.elementRef, 'has-focus', hasFocus);
            if (!hasFocus) {
                this.deregMove();
                this.input.hideFocus(false);
            }
        }

        /**
         * @private
         */
    }, {
        key: "hasValue",
        value: function hasValue(inputValue) {
            this.renderer.setElementClass(this.elementRef, 'has-value', inputValue && inputValue !== '');
        }

        /**
         * @private
         */
    }, {
        key: "setFocus",
        value: function setFocus() {
            if (this.input) {
                this.form.setAsFocused(this);
                // set focus on the actual input element
                this.input.setFocus();
                // ensure the body hasn't scrolled down
                document.body.scrollTop = 0;
            }
        }

        /**
         * @private
         */
    }, {
        key: "regMove",
        value: function regMove() {
            var _this3 = this;

            if (this.scrollAssist && this.scrollView) {
                setTimeout(function () {
                    _this3.deregMove();
                    _this3.deregScroll = _this3.scrollView.addScrollEventListener(_this3.scrollMove);
                }, 80);
            }
        }

        /**
         * @private
         */
    }, {
        key: "deregMove",
        value: function deregMove() {
            this.deregScroll && this.deregScroll();
        }

        /**
         * @private
         */
    }, {
        key: "onDestroy",

        /**
         * @private
         */
        value: function onDestroy() {
            this.deregMove();
            this.form.deregister(this);
        }
    }, {
        key: "hasFocus",
        get: function get() {
            return !!this.input && this.input.hasFocus;
        }
    }], [{
        key: "getScrollData",
        value: function getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
            // compute input's Y values relative to the body
            var inputTop = inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop;
            var inputBottom = inputTop + inputOffsetHeight;
            // compute the safe area which is the viewable content area when the soft keyboard is up
            var safeAreaTop = scrollViewDimensions.contentTop;
            var safeAreaHeight = plaformHeight - keyboardHeight - safeAreaTop;
            safeAreaHeight /= 2;
            var safeAreaBottom = safeAreaTop + safeAreaHeight;
            var inputTopWithinSafeArea = inputTop >= safeAreaTop && inputTop <= safeAreaBottom;
            var inputTopAboveSafeArea = inputTop < safeAreaTop;
            var inputTopBelowSafeArea = inputTop > safeAreaBottom;
            var inputBottomWithinSafeArea = inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom;
            var inputBottomBelowSafeArea = inputBottom > safeAreaBottom;
            /*
            Text Input Scroll To Scenarios
            ---------------------------------------
            1) Input top within safe area, bottom within safe area
            2) Input top within safe area, bottom below safe area, room to scroll
            3) Input top above safe area, bottom within safe area, room to scroll
            4) Input top below safe area, no room to scroll, input smaller than safe area
            5) Input top within safe area, bottom below safe area, no room to scroll, input smaller than safe area
            6) Input top within safe area, bottom below safe area, no room to scroll, input larger than safe area
            7) Input top below safe area, no room to scroll, input larger than safe area
            */
            var scrollData = {
                scrollAmount: 0,
                scrollTo: 0,
                scrollPadding: 0,
                inputSafeY: 0
            };
            if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
                // Input top within safe area, bottom within safe area
                // no need to scroll to a position, it's good as-is
                return scrollData;
            }
            // looks like we'll have to do some auto-scrolling
            if (inputTopBelowSafeArea || inputBottomBelowSafeArea) {
                // Input top and bottom below safe area
                // auto scroll the input up so at least the top of it shows
                if (safeAreaHeight > inputOffsetHeight) {
                    // safe area height is taller than the input height, so we
                    // can bring it up the input just enough to show the input bottom
                    scrollData.scrollAmount = Math.round(safeAreaBottom - inputBottom);
                } else {
                    // safe area height is smaller than the input height, so we can
                    // only scroll it up so the input top is at the top of the safe area
                    // however the input bottom will be below the safe area
                    scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
                }
                scrollData.inputSafeY = -(inputTop - safeAreaTop) + 4;
            } else if (inputTopAboveSafeArea) {
                // Input top above safe area
                // auto scroll the input down so at least the top of it shows
                scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
                scrollData.inputSafeY = safeAreaTop - inputTop + 4;
            }
            // figure out where it should scroll to for the best position to the input
            scrollData.scrollTo = scrollViewDimensions.scrollTop - scrollData.scrollAmount;
            if (scrollData.scrollAmount < 0) {
                // when auto-scrolling up, there also needs to be enough
                // content padding at the bottom of the scroll view
                // manually add it if there isn't enough scrollable area
                // figure out how many scrollable area is left to scroll up
                var availablePadding = scrollViewDimensions.scrollHeight - scrollViewDimensions.scrollTop - scrollViewDimensions.contentHeight;
                var paddingSpace = availablePadding + scrollData.scrollAmount;
                if (paddingSpace < 0) {
                    // there's not enough scrollable area at the bottom, so manually add more
                    scrollData.scrollPadding = scrollViewDimensions.contentHeight - safeAreaHeight;
                }
            }
            // if (!window.safeAreaEle) {
            //   window.safeAreaEle = document.createElement('div');
            //   window.safeAreaEle.style.position = 'absolute';
            //   window.safeAreaEle.style.background = 'rgba(0, 128, 0, 0.7)';
            //   window.safeAreaEle.style.padding = '2px 5px';
            //   window.safeAreaEle.style.textShadow = '1px 1px white';
            //   window.safeAreaEle.style.left = '0px';
            //   window.safeAreaEle.style.right = '0px';
            //   window.safeAreaEle.style.fontWeight = 'bold';
            //   window.safeAreaEle.style.pointerEvents = 'none';
            //   document.body.appendChild(window.safeAreaEle);
            // }
            // window.safeAreaEle.style.top = safeAreaTop + 'px';
            // window.safeAreaEle.style.height = safeAreaHeight + 'px';
            // window.safeAreaEle.innerHTML = `
            //   <div>scrollTo: ${scrollData.scrollTo}</div>
            //   <div>scrollAmount: ${scrollData.scrollAmount}</div>
            //   <div>scrollPadding: ${scrollData.scrollPadding}</div>
            //   <div>inputSafeY: ${scrollData.inputSafeY}</div>
            //   <div>scrollHeight: ${scrollViewDimensions.scrollHeight}</div>
            //   <div>scrollTop: ${scrollViewDimensions.scrollTop}</div>
            //   <div>contentHeight: ${scrollViewDimensions.contentHeight}</div>
            // `;
            return scrollData;
        }
    }]);

    return TextInput;
})();
exports.TextInput = _TextInput;
_TextInput = __decorate([(0, _angular2Angular2.Component)({
    selector: 'ion-input',
    host: {
        '(touchstart)': 'pointerStart($event)',
        '(touchend)': 'pointerEnd($event)',
        '(mouseup)': 'pointerEnd($event)',
        'class': 'item'
    },
    template: '<div class="item-inner">' + '<ng-content></ng-content>' + '<input [type]="type" aria-hidden="true" scroll-assist *ng-if="scrollAssist">' + '</div>',
    directives: [_angular2Angular2.NgIf, (0, _angular2Angular2.forwardRef)(function () {
        return InputScrollAssist;
    })]
}), __param(6, (0, _angular2Angular2.Optional)()), __param(6, (0, _angular2Angular2.Host)()), __param(7, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [typeof (_a = typeof _utilForm.Form !== 'undefined' && _utilForm.Form) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object, typeof (_c = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _c || Object, typeof (_d = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _d || Object, typeof (_e = typeof _appApp.IonicApp !== 'undefined' && _appApp.IonicApp) === 'function' && _e || Object, typeof (_f = typeof _platformPlatform.Platform !== 'undefined' && _platformPlatform.Platform) === 'function' && _f || Object, typeof (_g = typeof _contentContent.Content !== 'undefined' && _contentContent.Content) === 'function' && _g || Object, typeof (_h = typeof _navNavController.NavController !== 'undefined' && _navNavController.NavController) === 'function' && _h || Object])], _TextInput);
/**
 * @private
 */
var TextInputElement = (function () {
    function TextInputElement(type, elementRef, renderer, wrapper) {
        _classCallCheck(this, TextInputElement);

        this.type = type;
        this.elementRef = elementRef;
        this.wrapper = wrapper;
        this.renderer = renderer;
        renderer.setElementAttribute(this.elementRef, 'text-input', '');
        if (wrapper) {
            // it's within ionic's ion-input, let ion-input handle what's up
            wrapper.registerInput(this);
        }
    }

    _createClass(TextInputElement, [{
        key: "onInit",
        value: function onInit() {
            this.wrapper && this.wrapper.hasValue(this.value);
        }
    }, {
        key: "focusChange",
        value: function focusChange(changed) {
            this.wrapper && this.wrapper.focusChange(changed);
        }
    }, {
        key: "onKeyup",
        value: function onKeyup(ev) {
            this.wrapper && this.wrapper.hasValue(ev.target.value);
        }
    }, {
        key: "labelledBy",
        value: function labelledBy(val) {
            this.renderer.setElementAttribute(this.elementRef, 'aria-labelledby', val);
        }
    }, {
        key: "setFocus",
        value: function setFocus() {
            this.getNativeElement().focus();
        }
    }, {
        key: "relocate",
        value: function relocate(shouldRelocate, inputRelativeY) {
            if (this._relocated !== shouldRelocate) {
                var focusedInputEle = this.getNativeElement();
                if (shouldRelocate) {
                    var clonedInputEle = cloneInput(focusedInputEle, 'cloned-input');
                    focusedInputEle.classList.add('hide-focused-input');
                    focusedInputEle.style[dom.CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
                    focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
                    this.wrapper.setFocus();
                } else {
                    focusedInputEle.classList.remove('hide-focused-input');
                    focusedInputEle.style[dom.CSS.transform] = '';
                    var clonedInputEle = focusedInputEle.parentNode.querySelector('.cloned-input');
                    if (clonedInputEle) {
                        clonedInputEle.parentNode.removeChild(clonedInputEle);
                    }
                }
                this._relocated = shouldRelocate;
            }
        }
    }, {
        key: "hideFocus",
        value: function hideFocus(shouldHideFocus) {
            var focusedInputEle = this.getNativeElement();
            if (shouldHideFocus) {
                var clonedInputEle = cloneInput(focusedInputEle, 'cloned-hidden');
                focusedInputEle.classList.add('hide-focused-input');
                focusedInputEle.style[dom.CSS.transform] = 'translate3d(-9999px,0,0)';
                focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
            } else {
                focusedInputEle.classList.remove('hide-focused-input');
                focusedInputEle.style[dom.CSS.transform] = '';
                var clonedInputEle = focusedInputEle.parentNode.querySelector('.cloned-hidden');
                if (clonedInputEle) {
                    clonedInputEle.parentNode.removeChild(clonedInputEle);
                }
            }
        }
    }, {
        key: "getNativeElement",
        value: function getNativeElement() {
            return this.elementRef.nativeElement;
        }
    }, {
        key: "hasFocus",
        get: function get() {
            return dom.hasFocus(this.getNativeElement());
        }
    }]);

    return TextInputElement;
})();
exports.TextInputElement = TextInputElement;
exports.TextInputElement = TextInputElement = __decorate([(0, _angular2Angular2.Directive)({
    selector: 'textarea,input[type=text],input[type=password],input[type=number],input[type=search],input[type=email],input[type=url],input[type=tel]',
    inputs: ['value'],
    host: {
        '(focus)': 'focusChange(true)',
        '(blur)': 'focusChange(false)',
        '(keyup)': 'onKeyup($event)'
    }
}), __param(0, (0, _angular2Angular2.Attribute)('type')), __param(3, (0, _angular2Angular2.Optional)()), __metadata('design:paramtypes', [String, typeof (_j = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _j || Object, typeof (_k = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _k || Object, _TextInput])], TextInputElement);
var InputScrollAssist = (function () {
    function InputScrollAssist(form, textInput) {
        _classCallCheck(this, InputScrollAssist);

        this.form = form;
        this.textInput = textInput;
    }

    _createClass(InputScrollAssist, [{
        key: "receivedFocus",
        value: function receivedFocus(ev) {
            this.form.focusNext(this.textInput);
        }
    }]);

    return InputScrollAssist;
})();
InputScrollAssist = __decorate([(0, _angular2Angular2.Directive)({
    selector: '[scroll-assist]',
    host: {
        '(focus)': 'receivedFocus($event)'
    }
}), __metadata('design:paramtypes', [typeof (_l = typeof _utilForm.Form !== 'undefined' && _utilForm.Form) === 'function' && _l || Object, _TextInput])], InputScrollAssist);
function cloneInput(srcInput, addCssClass) {
    var clonedInputEle = srcInput.cloneNode(true);
    clonedInputEle.classList.add(addCssClass);
    clonedInputEle.classList.remove('hide-focused-input');
    clonedInputEle.setAttribute('aria-hidden', true);
    clonedInputEle.removeAttribute('aria-labelledby');
    clonedInputEle.tabIndex = -1;
    return clonedInputEle;
}
var SCROLL_ASSIST_SPEED = 0.4;
function getScrollAssistDuration(distanceToScroll) {
    //return 3000;
    distanceToScroll = Math.abs(distanceToScroll);
    var duration = distanceToScroll / SCROLL_ASSIST_SPEED;
    return Math.min(400, Math.max(100, duration));
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;