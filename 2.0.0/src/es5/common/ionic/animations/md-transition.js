'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _animation = require('./animation');

var TRANSLATEY = 'translateY';
var OFF_BOTTOM = '40px';
var CENTER = '0px';
var SHOW_BACK_BTN_CSS = 'show-back-button';

var MDTransition = (function (_Animation) {
    _inherits(MDTransition, _Animation);

    function MDTransition(enteringView, leavingView, opts) {
        _classCallCheck(this, MDTransition);

        _get(Object.getPrototypeOf(MDTransition.prototype), 'constructor', this).call(this, null, opts);
        // what direction is the transition going
        var backDirection = opts.direction === 'back';
        // do they have navbars?
        var enteringHasNavbar = enteringView.hasNavbar();
        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
        // entering content item moves in bottom to center
        var enteringPage = new _animation.Animation(enteringView.pageRef());
        enteringPage.before.addClass('show-page');
        this.add(enteringPage);
        if (backDirection) {
            this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)');
            enteringPage.fromTo(TRANSLATEY, CENTER, CENTER);
        } else {
            this.duration(280).easing('cubic-bezier(0.36,0.66,0.04,1)');
            enteringPage.fromTo(TRANSLATEY, OFF_BOTTOM, CENTER).fadeIn();
        }
        if (enteringHasNavbar) {
            var enteringNavBar = new _animation.Animation(enteringView.navbarRef());
            this.add(enteringNavBar);
            enteringNavBar.before.addClass('show-navbar');
            var enteringBackButton = new _animation.Animation(enteringView.backBtnRef());
            this.add(enteringBackButton);
            if (enteringView.enableBack()) {
                enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS);
            } else {
                enteringBackButton.before.removeClass(SHOW_BACK_BTN_CSS);
            }
        }
        // setup leaving view
        if (leavingView && backDirection) {
            // leaving content
            this.duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)');
            var leavingPage = new _animation.Animation(leavingView.pageRef());
            this.add(leavingPage.fromTo(TRANSLATEY, CENTER, OFF_BOTTOM).fadeOut());
        }
    }

    return MDTransition;
})(_animation.Animation);

_animation.Animation.register('md-transition', MDTransition);