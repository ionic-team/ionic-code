'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _transition = require('./transition');

var _animationsAnimation = require('../animations/animation');

var DURATION = 550;
var EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
var OPACITY = 'opacity';
var TRANSLATEX = 'translateX';
var OFF_RIGHT = '99.5%';
var OFF_LEFT = '-33%';
var CENTER = '0%';
var OFF_OPACITY = 0.8;
var SHOW_NAVBAR_CSS = 'show-navbar';
var SHOW_VIEW_CSS = 'show-view';
var SHOW_BACK_BTN_CSS = 'show-back-button';

var IOSTransition = (function (_Animation) {
    _inherits(IOSTransition, _Animation);

    function IOSTransition(navCtrl, opts) {
        _classCallCheck(this, IOSTransition);

        _get(Object.getPrototypeOf(IOSTransition.prototype), 'constructor', this).call(this, null, opts);
        this.duration(DURATION);
        this.easing(EASING);
        // what direction is the transition going
        var backDirection = opts.direction === 'back';
        // get entering/leaving views
        var enteringView = navCtrl.getStagedEnteringView();
        var leavingView = navCtrl.getStagedLeavingView();
        // do they have navbars?
        var enteringHasNavbar = enteringView.hasNavbar();
        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
        // entering content
        var enteringContent = new _animationsAnimation.Animation(enteringView.contentRef());
        enteringContent.before.addClass(SHOW_VIEW_CSS).before.setStyles({ zIndex: enteringView.index });
        this.add(enteringContent);
        if (backDirection) {
            // back direction
            enteringContent.fromTo(TRANSLATEX, OFF_LEFT, CENTER).fromTo(OPACITY, OFF_OPACITY, 1);
        } else {
            // forward direction
            enteringContent.fromTo(TRANSLATEX, OFF_RIGHT, CENTER).fromTo(OPACITY, 1, 1);
        }
        // entering navbar
        if (enteringHasNavbar) {
            var enteringNavBar = new _animationsAnimation.Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass(SHOW_NAVBAR_CSS);
            this.add(enteringNavBar);
            var enteringTitle = new _animationsAnimation.Animation(enteringView.titleRef());
            var enteringNavbarItems = new _animationsAnimation.Animation(enteringView.navbarItemRefs());
            var enteringNavbarBg = new _animationsAnimation.Animation(enteringView.navbarBgRef());
            var enteringBackButton = new _animationsAnimation.Animation(enteringView.backBtnRef());
            enteringNavBar.add(enteringTitle).add(enteringNavbarItems).add(enteringNavbarBg).add(enteringBackButton);
            enteringTitle.fadeIn();
            enteringNavbarItems.fadeIn();
            // set properties depending on direction
            if (backDirection) {
                // back direction
                enteringTitle.fromTo(TRANSLATEX, OFF_LEFT, CENTER);
                if (enteringView.enableBack()) {
                    enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS);
                    enteringBackButton.fadeIn();
                }
            } else {
                // forward direction
                enteringTitle.fromTo(TRANSLATEX, OFF_RIGHT, CENTER);
                if (enteringView.enableBack()) {
                    enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS);
                    enteringBackButton.fadeIn();
                    var enteringBackBtnText = new _animationsAnimation.Animation(enteringView.backBtnTextRef());
                    enteringBackBtnText.fromTo(TRANSLATEX, '150px', '0px');
                    enteringNavBar.add(enteringBackBtnText);
                }
                if (leavingHasNavbar) {
                    // if there is a leaving navbar, then just fade this one in
                    enteringNavbarBg.fromTo(TRANSLATEX, CENTER, CENTER).fadeIn();
                } else {
                    enteringNavbarBg.fromTo(TRANSLATEX, OFF_RIGHT, CENTER);
                }
            }
        }
        // setup leaving view
        if (leavingView) {
            // leaving content
            var leavingContent = new _animationsAnimation.Animation(leavingView.contentRef());
            this.add(leavingContent);
            leavingContent.before.addClass(SHOW_VIEW_CSS).before.setStyles({ zIndex: leavingView.index });
            if (backDirection) {
                leavingContent.fromTo(TRANSLATEX, CENTER, '100%').fromTo(OPACITY, 1, 1);
            } else {
                leavingContent.fromTo(TRANSLATEX, CENTER, OFF_LEFT).fromTo(OPACITY, 1, OFF_OPACITY);
            }
            if (leavingHasNavbar) {
                var leavingNavBar = new _animationsAnimation.Animation(leavingView.navbarRef());
                var leavingBackButton = new _animationsAnimation.Animation(leavingView.backBtnRef());
                var leavingTitle = new _animationsAnimation.Animation(leavingView.titleRef());
                var leavingNavbarItems = new _animationsAnimation.Animation(leavingView.navbarItemRefs());
                var leavingNavbarBg = new _animationsAnimation.Animation(leavingView.navbarBgRef());
                leavingNavBar.add(leavingBackButton).add(leavingTitle).add(leavingNavbarItems).add(leavingNavbarBg);
                this.add(leavingNavBar);
                leavingBackButton.after.removeClass(SHOW_BACK_BTN_CSS).fadeOut();
                leavingTitle.fadeOut();
                leavingNavbarItems.fadeOut();
                // set properties depending on direction
                if (backDirection) {
                    // back direction
                    leavingTitle.fromTo(TRANSLATEX, CENTER, '100%');
                    if (enteringHasNavbar) {
                        // this is an entering navbar, just fade this out
                        leavingNavbarBg.fromTo(TRANSLATEX, CENTER, CENTER).fadeOut();
                    } else {
                        leavingNavbarBg.fromTo(TRANSLATEX, CENTER, '100%');
                    }
                    var leavingBackBtnText = new _animationsAnimation.Animation(leavingView.backBtnTextRef());
                    leavingBackBtnText.fromTo(TRANSLATEX, CENTER, 300 + 'px');
                    leavingNavBar.add(leavingBackBtnText);
                } else {
                    // forward direction
                    leavingTitle.fromTo(TRANSLATEX, CENTER, OFF_LEFT);
                }
            }
        }
    }

    return IOSTransition;
})(_animationsAnimation.Animation);

_transition.Transition.register('ios', IOSTransition);