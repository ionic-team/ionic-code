'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.ionicProviders = ionicProviders;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _angular2Angular2 = require('angular2/angular2');

var _angular2Router = require('angular2/router');

var _angular2Http = require('angular2/http');

var _componentsAppApp = require('../components/app/app');

var _config = require('./config');

var _platformPlatform = require('../platform/platform');

var _componentsOverlayOverlayController = require('../components/overlay/overlay-controller');

var _utilForm = require('../util/form');

var _utilKeyboard = require('../util/keyboard');

var _componentsActionSheetActionSheet = require('../components/action-sheet/action-sheet');

var _componentsModalModal = require('../components/modal/modal');

var _componentsPopupPopup = require('../components/popup/popup');

var _utilEvents = require('../util/events');

var _componentsNavNavRegistry = require('../components/nav/nav-registry');

var _translationTranslate = require('../translation/translate');

var _utilFeatureDetect = require('../util/feature-detect');

var _componentsTapClickTapClick = require('../components/tap-click/tap-click');

var _utilDom = require('../util/dom');

var dom = _interopRequireWildcard(_utilDom);

function ionicProviders(config) {
    var app = new _componentsAppApp.IonicApp();
    var platform = new _platformPlatform.Platform();
    if (!(config instanceof _config.Config)) {
        config = new _config.Config(config);
    }
    platform.url(window.location.href);
    platform.userAgent(window.navigator.userAgent);
    platform.navigatorPlatform(window.navigator.platform);
    platform.load();
    config.setPlatform(platform);
    var events = new _utilEvents.Events();
    var tapClick = new _componentsTapClickTapClick.TapClick(app, config, window, document);
    var featureDetect = new _utilFeatureDetect.FeatureDetect();
    setupDom(window, document, config, platform, featureDetect);
    bindEvents(window, document, platform, events);
    // prepare the ready promise to fire....when ready
    platform.prepareReady(config);
    return [(0, _angular2Angular2.provide)(_componentsAppApp.IonicApp, { useValue: app }), (0, _angular2Angular2.provide)(_config.Config, { useValue: config }), (0, _angular2Angular2.provide)(_platformPlatform.Platform, { useValue: platform }), (0, _angular2Angular2.provide)(_componentsTapClickTapClick.TapClick, { useValue: tapClick }), (0, _angular2Angular2.provide)(_utilFeatureDetect.FeatureDetect, { useValue: featureDetect }), (0, _angular2Angular2.provide)(_utilEvents.Events, { useValue: events }), _utilForm.Form, _utilKeyboard.Keyboard, _componentsOverlayOverlayController.OverlayController, _componentsActionSheetActionSheet.ActionSheet, _componentsModalModal.Modal, _componentsPopupPopup.Popup, _translationTranslate.Translate, _componentsNavNavRegistry.NavRegistry, _angular2Router.ROUTER_PROVIDERS, (0, _angular2Angular2.provide)(_angular2Router.LocationStrategy, { useClass: _angular2Router.HashLocationStrategy }), _angular2Http.HTTP_PROVIDERS];
}

function setupDom(window, document, config, platform, featureDetect) {
    var bodyEle = document.body;
    if (!bodyEle) {
        return dom.ready(function () {
            applyBodyCss(document, config, platform);
        });
    }
    var versions = platform.versions();
    platform.platforms().forEach(function (platformName) {
        // platform-ios
        var platformClass = 'platform-' + platformName;
        bodyEle.classList.add(platformClass);
        var platformVersion = versions[platformName];
        if (platformVersion) {
            // platform-ios9
            platformClass += platformVersion.major;
            bodyEle.classList.add(platformClass);
            // platform-ios9_3
            bodyEle.classList.add(platformClass + '_' + platformVersion.minor);
        }
    });
    // set the mode class name
    // ios/md
    bodyEle.classList.add(config.get('mode'));
    // touch devices should not use :hover CSS pseudo
    // enable :hover CSS when the "hoverCSS" setting is not false
    if (config.get('hoverCSS') !== false) {
        bodyEle.classList.add('enable-hover');
    }
    // run feature detection tests
    featureDetect.run(window, document);
}
/**
 * Bind some global events and publish on the 'app' channel
 */
function bindEvents(window, document, platform, events) {
    window.addEventListener('online', function (ev) {
        events.publish('app:online', ev);
    }, false);
    window.addEventListener('offline', function (ev) {
        events.publish('app:offline', ev);
    }, false);
    window.addEventListener('orientationchange', function (ev) {
        events.publish('app:rotated', ev);
    });
    // When that status taps, we respond
    window.addEventListener('statusTap', function (ev) {
        // TODO: Make this more better
        var el = document.elementFromPoint(platform.width() / 2, platform.height() / 2);
        if (!el) {
            return;
        }
        var content = dom.closest(el, 'scroll-content');
        if (content) {
            var scrollTo = new ScrollTo(content);
            scrollTo.start(0, 0, 300, 0);
        }
    });
    // start listening for resizes XXms after the app starts
    setTimeout(function () {
        window.addEventListener('resize', function () {
            platform.windowResize();
        });
    }, 2000);
}