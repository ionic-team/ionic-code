'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _transition = require('./transition');

var _animationsAnimation = require('../animations/animation');

var TRANSLATEY = 'translateY';
var OFF_BOTTOM = '40px';
var CENTER = '0px';
var SHOW_NAVBAR_CSS = 'show-navbar';
var SHOW_VIEW_CSS = 'show-view';
var SHOW_BACK_BTN_CSS = 'show-back-button';
var TABBAR_HEIGHT = '69px';

var MDTransition = (function (_Animation) {
    _inherits(MDTransition, _Animation);

    function MDTransition(navCtrl, opts) {
        _classCallCheck(this, MDTransition);

        opts.renderDelay = 160;
        _get(Object.getPrototypeOf(MDTransition.prototype), 'constructor', this).call(this, null, opts);
        // what direction is the transition going
        var backDirection = opts.direction === 'back';
        // get entering/leaving views
        var enteringView = navCtrl.getStagedEnteringView();
        var leavingView = navCtrl.getStagedLeavingView();
        // do they have navbars?
        var enteringHasNavbar = enteringView.hasNavbar();
        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
        // entering content item moves in bottom to center
        var enteringContent = new _animationsAnimation.Animation(enteringView.contentRef());
        enteringContent.before.addClass(SHOW_VIEW_CSS).before.setStyles({ zIndex: enteringView.index });
        this.add(enteringContent);
        if (backDirection) {
            this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)');
            enteringContent.fromTo(TRANSLATEY, CENTER, CENTER);
        } else {
            this.duration(280).easing('cubic-bezier(0.36,0.66,0.04,1)');
            enteringContent.fromTo(TRANSLATEY, OFF_BOTTOM, CENTER).fadeIn();
        }
        // entering navbar
        if (enteringHasNavbar) {
            var enteringNavBar = new _animationsAnimation.Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass(SHOW_NAVBAR_CSS).before.setStyles({ zIndex: enteringView.index + 10 });
            this.add(enteringNavBar);
            if (backDirection) {
                enteringNavBar.fromTo(TRANSLATEY, CENTER, CENTER);
            } else {
                enteringNavBar.fromTo(TRANSLATEY, OFF_BOTTOM, CENTER).fadeIn();
            }
            if (enteringView.enableBack()) {
                var enteringBackButton = new _animationsAnimation.Animation(enteringView.backBtnRef());
                enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS);
                enteringNavBar.add(enteringBackButton);
            }
        }
        // setup leaving view
        if (leavingView) {
            // leaving content
            var leavingContent = new _animationsAnimation.Animation(leavingView.contentRef());
            this.add(leavingContent);
            leavingContent.before.addClass(SHOW_VIEW_CSS).before.setStyles({ zIndex: leavingView.index });
            if (backDirection) {
                this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)');
                leavingContent.fromTo(TRANSLATEY, CENTER, OFF_BOTTOM).fadeOut();
            }
            if (leavingHasNavbar) {
                if (backDirection) {
                    var leavingNavBar = new _animationsAnimation.Animation(leavingView.navbarRef());
                    this.add(leavingNavBar);
                    leavingNavBar.before.setStyles({ zIndex: leavingView.index + 10 }).fadeOut();
                }
            }
        }
        var viewLength = navCtrl.length();
        if ((viewLength === 1 || viewLength === 2) && navCtrl.tabs) {
            var tabBarEle = navCtrl.tabs.elementRef.nativeElement.querySelector('ion-tab-bar-section');
            var tabBar = new _animationsAnimation.Animation(tabBarEle);
            if (viewLength === 1 && backDirection) {
                tabBar.fromTo('height', '0px', TABBAR_HEIGHT).fadeIn();
            } else if (viewLength === 2 && !backDirection) {
                tabBar.fromTo('height', TABBAR_HEIGHT, '0px').fadeOut();
            }
            this.add(tabBar);
        }
    }

    return MDTransition;
})(_animationsAnimation.Animation);

_transition.Transition.register('md', MDTransition);