'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _animation = require('./animation');

var DURATION = 550;
var EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
var OPACITY = 'opacity';
var TRANSLATEX = 'translateX';
var OFF_RIGHT = '99.5%';
var OFF_LEFT = '-33%';
var CENTER = '0%';
var OFF_OPACITY = 0.8;
var SHOW_BACK_BTN_CSS = 'show-back-button';

var IOSTransition = (function (_Animation) {
    _inherits(IOSTransition, _Animation);

    function IOSTransition(enteringView, leavingView, opts) {
        _classCallCheck(this, IOSTransition);

        _get(Object.getPrototypeOf(IOSTransition.prototype), 'constructor', this).call(this, null, opts);
        this.duration(DURATION);
        this.easing(EASING);
        // what direction is the transition going
        var backDirection = opts.direction === 'back';
        // do they have navbars?
        var enteringHasNavbar = enteringView.hasNavbar();
        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
        var enteringPage = new _animation.Animation(enteringView.pageRef());
        enteringPage.before.addClass('show-page');
        this.add(enteringPage);
        // entering content
        var enteringContent = new _animation.Animation(enteringView.contentRef());
        this.add(enteringContent);
        if (backDirection) {
            // entering content, back direction
            enteringContent.fromTo(TRANSLATEX, OFF_LEFT, CENTER).fromTo(OPACITY, OFF_OPACITY, 1);
        } else {
            // entering content, forward direction
            enteringContent.fromTo(TRANSLATEX, OFF_RIGHT, CENTER).fromTo(OPACITY, 1, 1);
        }
        if (enteringHasNavbar) {
            // entering page has a navbar
            var enteringNavBar = new _animation.Animation(enteringView.navbarRef());
            this.add(enteringNavBar);
            var enteringTitle = new _animation.Animation(enteringView.titleRef());
            var enteringNavbarItems = new _animation.Animation(enteringView.navbarItemRefs());
            var enteringNavbarBg = new _animation.Animation(enteringView.navbarBgRef());
            var enteringBackButton = new _animation.Animation(enteringView.backBtnRef());
            enteringNavBar.add(enteringTitle).add(enteringNavbarItems).add(enteringNavbarBg).add(enteringBackButton);
            enteringNavBar.before.addClass('show-navbar');
            enteringTitle.fadeIn();
            enteringNavbarItems.fadeIn();
            // set properties depending on direction
            if (backDirection) {
                // entering navbar, back direction
                enteringTitle.fromTo(TRANSLATEX, OFF_LEFT, CENTER);
                if (enteringView.enableBack()) {
                    // back direction, entering page has a back button
                    enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS).fadeIn();
                }
            } else {
                // entering navbar, forward direction
                enteringTitle.fromTo(TRANSLATEX, OFF_RIGHT, CENTER);
                if (leavingHasNavbar) {
                    // entering navbar, forward direction, and there's a leaving navbar
                    // should just fade in, no sliding
                    enteringNavbarBg.fromTo(TRANSLATEX, CENTER, CENTER).fadeIn();
                } else {
                    // entering navbar, forward direction, and there's no leaving navbar
                    // should just slide in, no fading in
                    enteringNavbarBg.fromTo(TRANSLATEX, OFF_RIGHT, CENTER).fromTo(OPACITY, 1, 1);
                }
                if (enteringView.enableBack()) {
                    // forward direction, entering page has a back button
                    enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS).fadeIn();
                    var enteringBackBtnText = new _animation.Animation(enteringView.backBtnTextRef());
                    enteringBackBtnText.fromTo(TRANSLATEX, '100px', '0px');
                    enteringNavBar.add(enteringBackBtnText);
                } else {
                    enteringBackButton.before.removeClass(SHOW_BACK_BTN_CSS);
                }
            }
        }
        // setup leaving view
        if (leavingView) {
            // leaving content
            var leavingContent = new _animation.Animation(leavingView.contentRef());
            this.add(leavingContent);
            if (backDirection) {
                // leaving content, back direction
                leavingContent.fromTo(TRANSLATEX, CENTER, '100%').fromTo(OPACITY, 1, 1);
            } else {
                // leaving content, forward direction
                leavingContent.fromTo(TRANSLATEX, CENTER, OFF_LEFT).fromTo(OPACITY, 1, OFF_OPACITY);
            }
            if (leavingHasNavbar) {
                // leaving page has a navbar
                var leavingNavBar = new _animation.Animation(leavingView.navbarRef());
                var leavingBackButton = new _animation.Animation(leavingView.backBtnRef());
                var leavingTitle = new _animation.Animation(leavingView.titleRef());
                var leavingNavbarItems = new _animation.Animation(leavingView.navbarItemRefs());
                var leavingNavbarBg = new _animation.Animation(leavingView.navbarBgRef());
                leavingNavBar.add(leavingBackButton).add(leavingTitle).add(leavingNavbarItems).add(leavingNavbarBg);
                this.add(leavingNavBar);
                // fade out leaving navbar items
                leavingBackButton.fadeOut();
                leavingTitle.fadeOut();
                leavingNavbarItems.fadeOut();
                if (backDirection) {
                    // leaving navbar, back direction
                    leavingTitle.fromTo(TRANSLATEX, CENTER, '100%');
                    if (enteringHasNavbar) {
                        // leaving navbar, back direction, and there's an entering navbar
                        // should just fade out, no sliding
                        leavingNavbarBg.fromTo(TRANSLATEX, CENTER, CENTER).fadeOut();
                    } else {
                        // leaving navbar, back direction, and there's no entering navbar
                        // should just slide out, no fading out
                        leavingNavbarBg.fromTo(TRANSLATEX, CENTER, '100%').fromTo(OPACITY, 1, 1);
                    }
                    var leavingBackBtnText = new _animation.Animation(leavingView.backBtnTextRef());
                    leavingBackBtnText.fromTo(TRANSLATEX, CENTER, 300 + 'px');
                    leavingNavBar.add(leavingBackBtnText);
                } else {
                    // leaving navbar, forward direction
                    leavingTitle.fromTo(TRANSLATEX, CENTER, OFF_LEFT);
                }
            }
        }
    }

    return IOSTransition;
})(_animation.Animation);

_animation.Animation.register('ios-transition', IOSTransition);