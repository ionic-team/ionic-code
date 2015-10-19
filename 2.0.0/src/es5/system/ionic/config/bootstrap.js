System.register('ionic/config/bootstrap', ['angular2/angular2', 'angular2/router', 'angular2/http', '../components/app/app', './config', '../platform/platform', '../components/overlay/overlay-controller', '../util/form', '../util/keyboard', '../components/action-sheet/action-sheet', '../components/modal/modal', '../components/popup/popup', '../util/events', '../components/nav/nav-registry', '../translation/translate', '../util/feature-detect', '../components/tap-click/tap-click', '../util/dom'], function (_export) {
    'use strict';

    var provide, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, HTTP_PROVIDERS, IonicApp, Config, Platform, OverlayController, Form, Keyboard, ActionSheet, Modal, Popup, Events, NavRegistry, Translate, FeatureDetect, TapClick, dom;

    _export('ionicProviders', ionicProviders);

    function ionicProviders(config) {
        var app = new IonicApp();
        var platform = new Platform();
        if (!(config instanceof Config)) {
            config = new Config(config);
        }
        platform.url(window.location.href);
        platform.userAgent(window.navigator.userAgent);
        platform.navigatorPlatform(window.navigator.platform);
        platform.load();
        config.setPlatform(platform);
        var events = new Events();
        var tapClick = new TapClick(app, config, window, document);
        var featureDetect = new FeatureDetect();
        setupDom(window, document, config, platform, featureDetect);
        bindEvents(window, document, platform, events);
        // prepare the ready promise to fire....when ready
        platform.prepareReady(config);
        return [provide(IonicApp, { useValue: app }), provide(Config, { useValue: config }), provide(Platform, { useValue: platform }), provide(TapClick, { useValue: tapClick }), provide(FeatureDetect, { useValue: featureDetect }), provide(Events, { useValue: events }), Form, Keyboard, OverlayController, ActionSheet, Modal, Popup, Translate, NavRegistry, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy }), HTTP_PROVIDERS];
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
    return {
        setters: [function (_angular2Angular2) {
            provide = _angular2Angular2.provide;
        }, function (_angular2Router) {
            ROUTER_PROVIDERS = _angular2Router.ROUTER_PROVIDERS;
            LocationStrategy = _angular2Router.LocationStrategy;
            HashLocationStrategy = _angular2Router.HashLocationStrategy;
        }, function (_angular2Http) {
            HTTP_PROVIDERS = _angular2Http.HTTP_PROVIDERS;
        }, function (_componentsAppApp) {
            IonicApp = _componentsAppApp.IonicApp;
        }, function (_config) {
            Config = _config.Config;
        }, function (_platformPlatform) {
            Platform = _platformPlatform.Platform;
        }, function (_componentsOverlayOverlayController) {
            OverlayController = _componentsOverlayOverlayController.OverlayController;
        }, function (_utilForm) {
            Form = _utilForm.Form;
        }, function (_utilKeyboard) {
            Keyboard = _utilKeyboard.Keyboard;
        }, function (_componentsActionSheetActionSheet) {
            ActionSheet = _componentsActionSheetActionSheet.ActionSheet;
        }, function (_componentsModalModal) {
            Modal = _componentsModalModal.Modal;
        }, function (_componentsPopupPopup) {
            Popup = _componentsPopupPopup.Popup;
        }, function (_utilEvents) {
            Events = _utilEvents.Events;
        }, function (_componentsNavNavRegistry) {
            NavRegistry = _componentsNavNavRegistry.NavRegistry;
        }, function (_translationTranslate) {
            Translate = _translationTranslate.Translate;
        }, function (_utilFeatureDetect) {
            FeatureDetect = _utilFeatureDetect.FeatureDetect;
        }, function (_componentsTapClickTapClick) {
            TapClick = _componentsTapClickTapClick.TapClick;
        }, function (_utilDom) {
            dom = _utilDom;
        }],
        execute: function () {}
    };
});