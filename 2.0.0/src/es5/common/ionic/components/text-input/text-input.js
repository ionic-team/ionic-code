"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _angular2Angular2 = require('angular2/angular2');

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
    function TextInput(form, elementRef, config, renderer, app, zone, platform, scrollView) {
        _classCallCheck(this, TextInput);

        renderer.setElementClass(elementRef, 'item', true);
        this.renderer = renderer;
        this.form = form;
        form.register(this);
        this.type = 'text';
        this.lastTouch = 0;
        this.app = app;
        this.elementRef = elementRef;
        this.zone = zone;
        this.platform = platform;
        this.scrollView = scrollView;
        this.scrollAssist = config.get('scrollAssist');
        this.keyboardHeight = config.get('keyboardHeight');
    }

    _createClass(TextInput, [{
        key: "registerInput",
        value: function registerInput(textInputElement) {
            this.input = textInputElement;
            this.type = textInputElement.type || 'text';
        }
    }, {
        key: "registerLabel",
        value: function registerLabel(label) {
            this.label = label;
        }
    }, {
        key: "onInit",
        value: function onInit() {
            if (this.input && this.label) {
                // if there is an input and an label
                // then give the label an ID
                // and tell the input the ID of who it's labelled by
                this.input.labelledBy(this.label.id);
            }
            var self = this;
            self.scrollMove = function (ev) {
                console.debug('content scrollMove');
                self.deregListeners();
                if (self.hasFocus) {
                    self.tempFocusMove();
                }
            };
        }
    }, {
        key: "pointerStart",
        value: function pointerStart(ev) {
            if (this.scrollAssist && this.app.isEnabled()) {
                // remember where the touchstart/mousedown started
                this.startCoord = dom.pointerCoord(ev);
            }
        }
    }, {
        key: "pointerEnd",
        value: function pointerEnd(ev) {
            var _this = this;

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
                    this.zone.runOutsideAngular(function () {
                        _this.initFocus();
                        // temporarily prevent mouseup's from focusing
                        _this.lastTouch = Date.now();
                    });
                }
            } else if (this.lastTouch + 500 < Date.now()) {
                ev.preventDefault();
                ev.stopPropagation();
                this.setFocus();
            }
        }
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
                var scrollData = _TextInput.getScollData(ele.offsetTop, ele.offsetHeight, scrollView.getDimensions(), this.keyboardHeight, this.platform.height());
                if (scrollData.noScroll) {
                    // the text input is in a safe position that doesn't require
                    // it to be scrolled into view, just set focus now
                    return this.setFocus();
                }
                // add padding to the bottom of the scroll view (if needed)
                scrollView.addScrollPadding(scrollData.scrollPadding);
                // manually scroll the text input to the top
                // do not allow any clicks while it's scrolling
                this.app.setEnabled(false, SCROLL_INTO_VIEW_DURATION);
                this.app.setTransitioning(true, SCROLL_INTO_VIEW_DURATION);
                // temporarily move the focus to the focus holder so the browser
                // doesn't freak out while it's trying to get the input in place
                // at this point the native text input still does not have focus
                this.tempFocusMove();
                // scroll the input into place
                scrollView.scrollTo(0, scrollData.scrollTo, SCROLL_INTO_VIEW_DURATION, 6).then(function () {
                    // the scroll view is in the correct position now
                    // give the native text input focus
                    _this2.setFocus();
                    // all good, allow clicks again
                    _this2.app.setEnabled(true);
                    _this2.app.setTransitioning(false);
                });
            } else {
                // not inside of a scroll view, just focus it
                this.setFocus();
            }
        }

        /**
         * TODO
         * @param {TODO} inputOffsetTop  TODO
         * @param {TODO} inputOffsetHeight  TODO
         * @param {TODO} scrollViewDimensions  TODO
         * @param {TODO} keyboardHeight  TODO
         * @returns {TODO} TODO
         */
    }, {
        key: "focusChange",
        value: function focusChange(hasFocus) {
            this.renderer.setElementClass(this.elementRef, 'has-focus', hasFocus);
        }
    }, {
        key: "hasValue",
        value: function hasValue(inputValue) {
            this.renderer.setElementClass(this.elementRef, 'has-value', inputValue && inputValue !== '');
        }
    }, {
        key: "setFocus",
        value: function setFocus() {
            var _this3 = this;

            if (this.input) {
                this.zone.run(function () {
                    _this3.form.setAsFocused(_this3);
                    // set focus on the actual input element
                    _this3.input.setFocus();
                    // ensure the body hasn't scrolled down
                    document.body.scrollTop = 0;
                });
            }
            if (this.scrollAssist && this.scrollView) {
                this.zone.runOutsideAngular(function () {
                    _this3.deregListeners();
                    _this3.deregScroll = _this3.scrollView.addScrollEventListener(_this3.scrollMove);
                });
            }
        }
    }, {
        key: "deregListeners",
        value: function deregListeners() {
            this.deregScroll && this.deregScroll();
        }
    }, {
        key: "tempFocusMove",
        value: function tempFocusMove() {
            this.form.setFocusHolder(this.type);
        }
    }, {
        key: "onDestroy",
        value: function onDestroy() {
            this.deregListeners();
            this.form.deregister(this);
        }
    }, {
        key: "hasFocus",
        get: function get() {
            return !!this.input && this.input.hasFocus;
        }
    }], [{
        key: "getScollData",
        value: function getScollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
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
            if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
                // Input top within safe area, bottom within safe area
                // no need to scroll to a position, it's good as-is
                return { noScroll: true };
            }
            // looks like we'll have to do some auto-scrolling
            var scrollData = {
                scrollAmount: 0,
                scrollTo: 0,
                scrollPadding: 0
            };
            if (inputTopBelowSafeArea || inputBottomBelowSafeArea) {
                // Input top and bottom below safe area
                // auto scroll the input up so at least the top of it shows
                if (safeAreaHeight > inputOffsetHeight) {
                    // safe area height is taller than the input height, so we
                    // can bring it up the input just enough to show the input bottom
                    scrollData.scrollAmount = safeAreaBottom - inputBottom;
                } else {
                    // safe area height is smaller than the input height, so we can
                    // only scroll it up so the input top is at the top of the safe area
                    // however the input bottom will be below the safe area
                    scrollData.scrollAmount = safeAreaTop - inputTop;
                }
            } else if (inputTopAboveSafeArea) {
                // Input top above safe area
                // auto scroll the input down so at least the top of it shows
                scrollData.scrollAmount = safeAreaTop - inputTop;
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
            //   window.safeAreaEle.style.background = 'rgba(0, 128, 0, 0.3)';
            //   window.safeAreaEle.style.padding = '10px';
            //   window.safeAreaEle.style.textShadow = '2px 2px white';
            //   window.safeAreaEle.style.left = '0px';
            //   window.safeAreaEle.style.right = '0px';
            //   window.safeAreaEle.style.pointerEvents = 'none';
            //   document.body.appendChild(window.safeAreaEle);
            // }
            // window.safeAreaEle.style.top = safeAreaTop + 'px';
            // window.safeAreaEle.style.height = safeAreaHeight + 'px';
            // window.safeAreaEle.innerHTML = `
            //   <div>scrollTo: ${scrollData.scrollTo}</div>
            //   <div>scrollAmount: ${scrollData.scrollAmount}</div>
            //   <div>scrollPadding: ${scrollData.scrollPadding}</div>
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
        '(mouseup)': 'pointerEnd($event)'
    },
    template: '<ng-content></ng-content>' + '<input [type]="type" aria-hidden="true" scroll-assist *ng-if="scrollAssist">',
    directives: [_angular2Angular2.NgIf, (0, _angular2Angular2.forwardRef)(function () {
        return InputScrollAssist;
    })]
}), __param(7, (0, _angular2Angular2.Optional)()), __param(7, (0, _angular2Angular2.Host)()), __metadata('design:paramtypes', [typeof (_a = typeof _utilForm.Form !== 'undefined' && _utilForm.Form) === 'function' && _a || Object, typeof (_b = typeof _angular2Angular2.ElementRef !== 'undefined' && _angular2Angular2.ElementRef) === 'function' && _b || Object, typeof (_c = typeof _configConfig.Config !== 'undefined' && _configConfig.Config) === 'function' && _c || Object, typeof (_d = typeof _angular2Angular2.Renderer !== 'undefined' && _angular2Angular2.Renderer) === 'function' && _d || Object, typeof (_e = typeof _appApp.IonicApp !== 'undefined' && _appApp.IonicApp) === 'function' && _e || Object, typeof (_f = typeof _angular2Angular2.NgZone !== 'undefined' && _angular2Angular2.NgZone) === 'function' && _f || Object, typeof (_g = typeof _platformPlatform.Platform !== 'undefined' && _platformPlatform.Platform) === 'function' && _g || Object, typeof (_h = typeof _contentContent.Content !== 'undefined' && _contentContent.Content) === 'function' && _h || Object])], _TextInput);
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
        key: "onKeyup",
        value: function onKeyup(ev) {
            this.wrapper.hasValue(ev.target.value);
        }
    }, {
        key: "onInit",
        value: function onInit() {
            this.wrapper.hasValue(this.value);
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
        '(focus)': 'wrapper.focusChange(true)',
        '(blur)': 'wrapper.focusChange(false)',
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
var SCROLL_INTO_VIEW_DURATION = 400;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;