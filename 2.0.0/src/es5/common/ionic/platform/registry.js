'use strict';

var _platform = require('./platform');

var _utilDom = require('../util/dom');

_platform.Platform.register({
    name: 'core',
    settings: {
        mode: 'ios',
        keyboardHeight: 290
    }
});
_platform.Platform.setDefault('core');
_platform.Platform.register({
    name: 'mobile'
});
_platform.Platform.register({
    name: 'phablet',
    isMatch: function isMatch(p) {
        var smallest = Math.min(p.width(), p.height());
        var largest = Math.max(p.width(), p.height());
        return smallest > 390 && smallest < 520 && (largest > 620 && largest < 800);
    }
});
_platform.Platform.register({
    name: 'tablet',
    isMatch: function isMatch(p) {
        var smallest = Math.min(p.width(), p.height());
        var largest = Math.max(p.width(), p.height());
        return smallest > 460 && smallest < 820 && (largest > 780 && largest < 1400);
    }
});
_platform.Platform.register({
    name: 'android',
    superset: 'mobile',
    subsets: ['phablet', 'tablet'],
    settings: {
        activator: function activator(p) {
            return p.version().major < 5 && p.navigatorPlatform().indexOf('linux') > -1 ? 'none' : 'ripple';
        },
        hoverCSS: false,
        keyboardHeight: 300,
        mode: 'md',
        scrollAssist: true
    },
    isMatch: function isMatch(p) {
        return p.isPlatform('android', 'android|silk');
    },
    versionParser: function versionParser(p) {
        return p.matchUserAgentVersion(/Android (\d+).(\d+)?/);
    }
});
_platform.Platform.register({
    name: 'ios',
    superset: 'mobile',
    subsets: ['ipad', 'iphone'],
    settings: {
        clickBlock: true,
        hoverCSS: false,
        keyboardHeight: 300,
        mode: 'ios',
        scrollAssist: isIOSDevice,
        swipeBackEnabled: isIOSDevice,
        swipeBackThreshold: 40,
        tapPolyfill: isIOSDevice
    },
    isMatch: function isMatch(p) {
        return p.isPlatform('ios', 'iphone|ipad|ipod');
    },
    versionParser: function versionParser(p) {
        return p.matchUserAgentVersion(/OS (\d+)_(\d+)?/);
    }
});
_platform.Platform.register({
    name: 'ipad',
    superset: 'tablet',
    settings: {
        keyboardHeight: 500
    },
    isMatch: function isMatch(p) {
        return p.isPlatform('ipad');
    }
});
_platform.Platform.register({
    name: 'iphone',
    subsets: ['phablet'],
    isMatch: function isMatch(p) {
        return p.isPlatform('iphone');
    }
});
_platform.Platform.register({
    name: 'windowsphone',
    superset: 'mobile',
    subsets: ['phablet', 'tablet'],
    settings: {
        mode: 'md'
    },
    isMatch: function isMatch(p) {
        return p.isPlatform('windowsphone', 'windows phone');
    },
    versionParser: function versionParser(p) {
        return p.matchUserAgentVersion(/Windows Phone (\d+).(\d+)?/);
    }
});
_platform.Platform.register({
    name: 'cordova',
    isEngine: true,
    methods: {
        ready: function ready(resolve) {
            function isReady() {
                document.removeEventListener('deviceready', isReady);
                resolve();
            }
            (0, _utilDom.windowLoad)(function () {
                document.addEventListener('deviceready', isReady);
            });
        }
    },
    isMatch: function isMatch() {
        return !!(window.cordova || window.PhoneGap || window.phonegap);
    }
});
function isIOSDevice(p) {
    // shortcut function to be reused internally
    // checks navigator.platform to see if it's an actual iOS device
    // this does not use the user-agent string because it is often spoofed
    // an actual iPad will return true, a chrome dev tools iPad will return false
    return (/iphone|ipad|ipod/i.test(p.navigatorPlatform())
    );
}